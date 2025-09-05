import { useState } from "react";
import { userService } from "../utils/Api";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleLogin() {
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = await userService.getBalance(username);
      console.log("Login data:", data);
      if (data && data.balance !== undefined) {
        onLoginSuccess({
          username: username,
          balance: data.balance,
        });
      } else {
        setError("Failed to retrieve balance");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to Poker Game</h2>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your username"
            disabled={loading}
            className="username-input"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          onClick={handleLogin}
          disabled={loading || !username.trim()}
          className="login-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
