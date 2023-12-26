import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user && user._id ? <Home name = {user.name}/> : <Login setLoginUser ={setLoginUser}/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoginUser ={setLoginUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
