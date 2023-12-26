import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoginUser }) {
  const navigate = useNavigate();

  // Define state to store user login information
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle input changes and update the state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle the login button click
  const handleLoginClick = () => {
    // Send a POST request to the server to log in the user
    axios
      .post("http://localhost/login", user)
      .then((result) => {
        setLoginUser(result.data.user);
        console.log(result);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {/* Input fields for email and password */}
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        value={user.email}
        onChange={handleChange}
      ></input>
      <input
        type="password"
        placeholder="Enter your password"
        name="password"
        value={user.password}
        onChange={handleChange}
      ></input>
      {/* Login button */}
      <div className="button" onClick={handleLoginClick}>
        Login
      </div>
      <div>or</div>
      {/* Registration button */}
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
}
