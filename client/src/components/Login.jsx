// LoginPage.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Implement your authentication logic here
    // Example: Check username and password, make API requests, etc.

    // Assuming authentication is successful
    const userId = "unique_user_id"; // Replace with the actual user ID
    onLogin(userId);

    // Redirect to the dashboard or any desired location
    history.push("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
