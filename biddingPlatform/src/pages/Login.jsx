import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import "./Login.css"; 
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
  
  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   if (email === "" || password === "") {
  //     setError("Please enter both email and password");
  //     return;
  //   }

  //   fetch("http://localhost:3001/login",{
  //     method: "POST",
  //     body: JSON.stringify({email,password}),
  //     headers:{"Content-type": "application/json"}
  //     }).then((res)=>{return res.json()})
  //     .then(data => {
  //       if (data === "Success") {
  //         localStorage.setItem("userEmail",email);
  //         navigate("/auctions");
  //         setError("");
  //       } else {
  //         localStorage.removeItem("userEmail");
  //         setError(data);
  //     }})
  //     .catch((err)=>console.log(err));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email === "" || password === "") {
      setError("Please enter both email and password");
      return;
    }
  
    fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" }
    })
      .then((res) => {
        // Handle non-200 responses
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message); // Extract message from backend error
          });
        }
        return res.json();
      })
      .then((data) => {
        // Store the token in localStorage and navigate to auctions
        localStorage.setItem("userEmail",email);
        navigate("/auctions");
        setError("");
      })
      .catch((err) => {
        setError(err.message); // Display the error message from the backend
        localStorage.removeItem("userEmail",email); // Clear the token if any error occurs
      });
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <span style={{ marginBottom: "13px" }}>
        Welcome back Enter your credentials to access your account
      </span>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error=="user not found"&&(<span style={{color:"red"}}>invalid username</span>)}
        </div>
        <div className="form-group">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label>Password</label>
            <label style={{ color: "#1434A4" }}>Forgot Password</label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error=="incorrect password"&&(<span style={{color:"red"}}>incorrect password</span>)}
        </div>
        <div style={{ display: "flex", marginBottom: "13px", gap:"5px" }}>
          <input
            style={{ width: "auto", margin: "0px", padding: "0px" }}
            type="checkbox"
          />
          <span>Keep me signed in</span>
        </div>
        <button
        className="login-button"
        type="submit"
        >
          Continue
        </button>
      </form>
      <div class="container">
        <div class="line"></div>
        <span class="line-text">or sign up with</span>
        <div class="line"></div>
      </div>
      <div style={{display:"flex",justifyContent: "space-between",height: "34px",gap: "3px"}}>
        <button className="login-option-button"> <GoogleIcon sx={{fontSize:"19px"}}/>Google</button>
        <button className="login-option-button"> <AppleIcon sx={{fontSize:"19px"}}/>Apple</button>
        <button className="login-option-button"> <FacebookTwoToneIcon sx={{fontSize:"19px"}}/>Facebook</button>
        
      </div>
      <div style={{display:"flex", justifyContent:"center",marginTop:"20px"}}>
        <span>Don't have an Account? <Link style={{textDecoration:"none"}} to="/signup">Sign up here</Link></span>
      </div>
    </div>
  );
};

export default Login;
