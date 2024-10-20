import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Modal } from "@mui/material";
import List from "@mui/material/List";
import {useDispatch } from "react-redux";
import {
  addAuction,
} from "../store/auctionsSlice";
const NavBar = () => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const [modal, setModal] = useState(false);
  const [newAuction, setNewAuction] = useState({
    title: "",
    des: "",
    currBid: 0,
    validTillDays:0,
    imageSrc: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    console.log(localStorage.getItem("userEmail"));
    e.preventDefault();
    console.log(newAuction, localStorage.getItem("userEmail"));
    try {
      const response = await fetch("http://localhost:3001/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAuction,
          userEmail: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(addAuction(data));
      setModal(false);
    } catch (err) {
      console.log("Error creating auction:", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageSrc") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setNewAuction({ ...newAuction, [e.target.name]: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewAuction({ ...newAuction, [e.target.name]: e.target.value });
    }
  };
  const handleAddAuctionClick = () => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    }
    else{setModal(true);}
    
    setExpand(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#F2B8Cb",
        height: "10vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "10%",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Genix Auctions
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          whiteSpace: "nowrap",
          height: "36px",
          right: "12%",
          gap: "5%",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            fontSize: "18px",
            border: "0px solid transparent",
            backgroundColor: "transparent",
          }}
        >
          <ListItemButton
            onClick={() => setExpand(!expand)}
            sx={{ pl: 3, fontSize: "18px" }}
          >
            Auction
            {expand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 3, fontSize: "18px" }}
                onClick={() => {
                  navigate("/auctions");
                  setExpand(false);
                }}
              >
                Auctions
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                onClick={ handleAddAuctionClick}
              >
                Add auction
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                onClick={()=>{navigate("/myAuctions")}}
              >
                My auction
              </ListItemButton>
            </List>
          </Collapse>
        </div>
        <button
          style={{
            cursor: "pointer",
            fontSize: "18px",
            border: "0px solid transparent",
            backgroundColor: "transparent",
          }}
          onClick={() => navigate("/bidding")} // Updated path
        >
          Bidding
        </button>
        <button
          style={{
            cursor: "pointer",
            fontSize: "18px",
            border: "0px solid transparent",
            backgroundColor: "transparent",
          }}
          onClick={() => navigate("/aboutUs")}
        >
          About us
        </button>
        <button
          style={{
            cursor: "pointer",
            fontSize: "18px",
            border: "0px solid transparent",
            backgroundColor: "transparent",
            color: "#1434A4",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          style={{
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "4%",
            border: "0px solid transparent",
            background: "linear-gradient(90deg, #1434A4 , #0096FF )",
            color: "white",
          }}
          onClick={() => navigate("/signUp")}
        >
          Get Started
        </button>
      </div>
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          sx={{
            position: "absolute",
            top: "120px",
            left: "38%",
            padding: "10px",
            zIndex: 5,
            width: "24vw",
            height: "71vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>

                <input
                  name="title"
                  type="text"
                  value={newAuction.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>

                <input
                  name="des"
                  type="text"
                  value={newAuction.des}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Starting Bid</label>

                <input
                  name="currBid"
                  type="number"
                  value={newAuction.currBid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Valid till{"(days)"}</label>
                <input
                  name="validTillDays"
                  type="number"
                  value={newAuction.validTillDays}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Image</label>
                <input
                  name="imageSrc"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              {newAuction.imageSrc !== "" && (
                <img
                  src={newAuction.imageSrc}
                  alt="uploaded image"
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "inherit",
                  }}
                />
              )}
              <button className="login-button" type="submit">
                Continue
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NavBar;
