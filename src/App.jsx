import { useState } from "react";
import "./App.css";
import Page from "./components/page";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess(userData) {
    setUser(userData);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Page userData={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
