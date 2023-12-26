import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {

  const navigate = useNavigate();

  // Define state to store user information
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterpassword: "",
  });

  // Handle input changes and update the state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle the registration button click
  const handleRegisterClick = (e) => {
    const { name, email, password, reEnterpassword } = user;

    // Check if all required fields are filled and passwords match
    if (name && email && password && password === reEnterpassword) {
      // Send a POST request to the server to register the user
      axios
        .post("http://localhost/register", user)
        .then((result) => console.log(result.data))
        .catch((error) => console.error("AxiosError: ", error));
        navigate('/login')
    }
  };

  return (
    <div className="register">
      <h1>Registration</h1>
      {/* Input fields for name, email, password, and password confirmation */}
      <input
        type="text"
        placeholder="Enter your name"
        name="name"
        value={user.name}
        onChange={handleChange}
      ></input>
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
      <input
        type="password"
        placeholder="Re-enter your password"
        name="reEnterpassword"
        value={user.reEnterpassword}
        onChange={handleChange}
      ></input>

      {/* Registration button */}
      <div className="button" onClick={handleRegisterClick}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={()=>navigate('/login')}>Login</div>
    </div>
  );
}
