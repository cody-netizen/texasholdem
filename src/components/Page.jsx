import { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import reactLogo from "../assets/react.svg";
import { userService } from "../utils/Api";

function Page({ userData, onLogout }) {
  const [balance, setBalance] = useState(userData.balance);
  const [amount, setAmount] = useState("");
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    setBalance(userData.balance);
  }, [userData.balance]);

  async function loadBalance() {
    setIsLoadingBalance(true);
    try {
      const data = await userService.getBalance(userData.username);
      console.log("Balance data:", data);

      if (data && typeof data.balance !== "undefined") {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error("Error loading balance:", error);
    } finally {
      setIsLoadingBalance(false);
    }
  }

  async function handleDeposit() {
    try {
      const numAmount = Number(amount);
      console.log("Deposit amount:", numAmount);

      if (isNaN(numAmount) || numAmount <= 0) {
        console.error("Invalid amount");
        return;
      }
      console.log(
        "Attempting deposit with amount:",
        numAmount,
        userData.username
      );
      await userService.deposit(userData.username, numAmount);

      loadBalance();
      setAmount("");
    } catch (error) {
      console.error("Error during deposit:", error);
    }
  }

  async function handleWithdraw() {
    try {
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        console.error("Invalid amount");
        return;
      }
      await userService.withdraw(userData.username, numAmount);
      loadBalance();
      setAmount("");
    } catch (error) {
      console.error("Error during withdraw:", error);
    }
  }

  async function handlePlayGame() {
    try {
      const res = await userService.startGame(userData.username);
      console.log("Game start response:", res.data.url);

      let gameUrl = null;
      if (res && res.data && res.data.url) {
        gameUrl = res.data.url;
      } else if (res && res.url) {
        gameUrl = res.url;
      }

      if (gameUrl) {
        window.open(gameUrl, "_blank", "noopener,noreferrer");
      } else {
        console.error("No game URL found in response");
      }
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }

  //   async function handlePlayGame() {
  //     try {
  //       const res = await userService.startGame(userData.username);
  //       console.log("Game start response:", res?.data?.url || res?.url);

  //       let gameUrl = res?.data?.url || res?.url;

  //       if (gameUrl) {
  //         // Chuyển sang localhost:7456
  //         try {
  //           const urlObj = new URL(gameUrl);
  //           urlObj.protocol = "http:";
  //           urlObj.hostname = "localhost";
  //           urlObj.port = "7456";

  //           gameUrl = urlObj.toString();
  //         } catch (e) {
  //           console.error("Invalid URL:", gameUrl, e);
  //         }

  //         window.open(gameUrl, "_blank", "noopener,noreferrer");
  //       } else {
  //         console.error("No game URL found in response");
  //       }
  //     } catch (error) {
  //       console.error("Error starting game:", error);
  //     }
  //   }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="user-info">
          <h2>Welcome, {userData.username}</h2>
          <p>
            Balance: ${balance}{" "}
            <span>
              <IoReloadOutline
                onClick={loadBalance}
                className={`reload-icon ${isLoadingBalance ? "loading" : ""}`}
              />
            </span>
          </p>
        </div>
        <div className="header-actions">
          <div className="actions">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="page-content">
        <div className="game-section" onClick={handlePlayGame}>
          <img src={reactLogo} alt="Poker Game" className="game-logo" />
          <h3>Click to Play Poker</h3>
        </div>
      </main>
    </div>
  );
}

export default Page;
