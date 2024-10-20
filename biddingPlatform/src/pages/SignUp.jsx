import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please enter both email and password");
      return;
    }
    fetch("http://localhost:3001/signUp",{
      method: "POST",
      body: JSON.stringify({firstName:firstName,
        lastName:lastName,
        email:email,
        password:password}),
      headers:{"Content-type": "application/json"}
      }).then((res)=>{
        if(res.ok){
          navigate("/login");
          console.log(res.json())}
        else{throw new Error("response not ok")}
      }).catch((err)=>console.log(err));
      
  };
  return (
    <div className="signUp-container">
      <h2>Sign up</h2>
      <span style={{ marginBottom: "13px" }}>
        New bidders as soon as you have submitted your information you will be eligible to bid in the auction.
      </span>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", marginBottom: "13px", gap:"5px"}}>
          <input
            style={{ width: "auto", margin: "0px", padding: "0px" }}
            type="checkbox"
          />
          <span>Receive outbid emails</span>
        </div>
        <button
        className="login-button"
        type="submit"
        >
          Submit
        </button>
      </form>
      <div className="container">
        <div className="line"></div>
        <span className="line-text">or sign up with</span>
        <div className="line"></div>
      </div>
      <div style={{display:"flex",justifyContent: "space-between",height: "34px",gap: "3px"}}>
        <button className="login-option-button"> <GoogleIcon sx={{fontSize:"19px"}}/>Google</button>
        <button className="login-option-button"> <AppleIcon sx={{fontSize:"19px"}}/>Apple</button>
        <button className="login-option-button"> <FacebookTwoToneIcon sx={{fontSize:"19px"}}/>Facebook</button>
        
      </div>
      <div style={{display:"flex", justifyContent:"center",marginTop:"20px"}}>
        <span>Want to know more? <Link style={{textDecoration:"none"}} to="/signup">Auction rules</Link></span>
      </div>
    </div>
  );
};

export default SignUp;
