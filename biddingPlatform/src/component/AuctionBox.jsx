import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAuction, deleteAuction,placeBid } from "../store/auctionsSlice";
const AuctionBox = ({ id, auction, type }) => {
  const data = useSelector((state) => state.auction);
  const [fav, setFav] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const [showEnterAmount,setShowEnterAmount]=useState(false);
  const [currAuction, setCurrAuction] = useState({
    title: auction.title,
    des: auction.des,
    currBid: auction.currBid,
    minBid: auction.minBid,
    validTillDays: auction.validTillDays,
    imageSrc: auction.imageSrc,
    bidHistory: auction.bidHistory,

  });
  const [bidAmount,setBidAmount]=useState();

  const handleAuctionClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/myAuctions/${auction._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setCurrAuction({...currAuction,bidHistory:data});
        console.log("Bid history:", data.bidHistory);
      } else {
        console.error("Error fetching bid history:", data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setShowHistory(true);
  };

  const handleSubmitAmount = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/myAuctions/${auction._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            bidAmount,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCurrAuction({...currAuction,currBid:data.auction.currBid});
        dispatch(placeBid({ id: auction._id, bidAmount: bidAmount, userEmail: userEmail }));
      } else {
        console.error("Error bidding:", data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setShowEnterAmount(false);
  };
  const handleFavAuctionClick = (e) => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    } else {
      setFav(!fav);
    }
  };
  //edit Change
  const handleChange = (e) => {
    if (e.target.name === "imageSrc") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrAuction({ ...currAuction, [e.target.name]: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCurrAuction({ ...currAuction, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/myAuctions/${auction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...currAuction,
            userEmail: localStorage.getItem("userEmail"), // Make sure to send the userEmail
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Auction updated successfully:", data);
      } else {
        console.error("Error updating auction:", data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    dispatch(updateAuction(currAuction));
    setEdit(false);
  };

  const editModalClose = () => {
    setEdit(false);
    setCurrAuction(auction);
  };
  const handleDelete = async () => {
    console.log("delete");
    console.log(localStorage.getItem("userEmail"));
    try {
      const response = await fetch(
        `http://localhost:3001/myAuctions/${auction._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: localStorage.getItem("userEmail"), // Send userEmail to verify permission
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Auction deleted successfully:", data);
      } else {
        console.error("Error deleting auction:", data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    dispatch(deleteAuction(auction));
    console.log("store data", data);
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "305px",
        width: "13rem",
        display: "flex",
        flexDirection: "column",
        padding: "9px",
        border: "1px solid #e4dede",
        boxShadow: "2px 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          height: "40%",
          position: "relative",
          display: "inline-block",
          widows: "100%",
        }}
      >
        <img
          onClick={handleAuctionClick}
          style={{
            width: "13rem",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={currAuction.imageSrc}
        />
        {type == "myAuction" && (
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "3px",
              left: "0px",
              color: "#fff",
              fontSize: "24px",
            }}
          >
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
        )}
        <FavoriteIcon
          className="favorite-icon"
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            color: fav ? "red" : "#fff",
            fontSize: "24px",
          }}
          onClick={handleFavAuctionClick}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "58%",
          gap: "7.3px",
        }}
      >
        <button
          style={{
            backgroundColor: "rgb(33,166,122)",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "10px",
            border: "none",
            padding: "4px 6px 4px 6px",
            whiteSpace: "nowrap",
            width: "5rem",
            marginTop: "9px",
          }}
        >
          Live Auction
        </button>

        <div style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
          {currAuction.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
            Minimum Bid
          </div>
          <div style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            ${currAuction.minBid}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
            Current Bid
          </div>
          <div style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            ${currAuction.currBid}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: "11px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
            }}
          >
            Ends in :
          </div>
          <div
            style={{
              fontSize: "10px",
              whiteSpace: "nowrap",
              margin: "0px 0px 0px 2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            1day 12 hrs 43 minures
          </div>
        </div>

        <button
          style={{
            background:
              "linear-gradient(to right, #cd3836 0%, #cd3836 10%, #6dbbdb 100%",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "10px",
            border: "none",
            padding: "4px 6px 4px 6px",
            whiteSpace: "nowrap",
            width: "13rem",
            height: "2rem",
            marginTop: "5px",
            cursor: "pointer",
          }}
          onClick={()=>{setShowEnterAmount(true)}}
        >
          Bid Now {">"}
        </button>
      </div>
      {edit && (
        <Modal
          open={edit}
          onClose={() => {
            editModalClose();
          }}
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
                  value={currAuction.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>

                <input
                  name="des"
                  type="text"
                  value={currAuction.des}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Starting Bid</label>

                <input
                  name="currBid"
                  type="number"
                  value={currAuction.currBid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Valid till{"(days)"}</label>
                <input
                  name="validTillDays"
                  type="number"
                  value={currAuction.validTillDays}
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
              {currAuction.imageSrc !== "" && (
                <img
                  src={currAuction.imageSrc}
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
      {showHistory && (
        <Modal
          open={showHistory}
          onClose={() => setShowHistory(false)}
          sx={
            {
              position: "absolute",
            top: "120px",
            left: "38%",
            padding: "10px",
            zIndex: 5,
            width: "24vw",
            height: "71vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            border: "1px solid black",
            overflow: "hidden",
            backgroundColor: "white",
            }
          }
        >
          <div style={{}}>
            <h3>Bid History</h3>
            {auction.bidHistory.length > 0 ? (
              <ul>
                {currAuction.bidHistory.bidHistory.map((bid, index) => (
                  <li key={index}>
                    {`${index+1}bid of $${bid.bidAmount} place at`}{" "} {new Date(bid.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bids yet.</p>
            )}
          </div>
        </Modal>
      )}
      {showEnterAmount && (
        <Modal
          open={showEnterAmount}
          onClose={() => setShowEnterAmount(false)}
          sx={
            {
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
            }
          }
        >
        <form onSubmit={handleSubmitAmount}>
          <label for="bidAmount">Enter your bid amount:</label>
          <input type="number" value={bidAmount} onChange={(e)=>{setBidAmount(e.target.value)}}/>
          <button type="submit">Submit</button>
        </form>
        </Modal>
      )}
    </div>
  );
};

export default AuctionBox;
