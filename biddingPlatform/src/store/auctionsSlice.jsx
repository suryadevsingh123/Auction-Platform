import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    title: "",
    des: "",
    currBid: 0,
    minBid: 0,
    validTillDays: 0,
    imageSrc: "",
    userEmail: "",
    bidHistory: [],
  },
];

export const auctionsSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    setAuction: (state, action) => {
      return action.payload; 
    },

    addAuction: (state, action) => {
      state.push(action.payload);
    },

    updateAuction: (state, action) => {
      const {
        id,
        title,
        des,
        currBid,
        minBid,
        validTillDays,
        imageSrc,
        userEmail,
      } = action.payload;
      const auction = state.find((a) => a._id === id);
      if (auction) {
        auction.title = title;
        auction.des = des;
        auction.currBid = currBid;
        auction.minBid = minBid;
        auction.validTillDays = validTillDays;
        auction.imageSrc = imageSrc;
        auction.userEmail = userEmail;
      }
    },

    deleteAuction: (state, action) => {
      const id = action.payload;
      return state.filter((auction) => auction._id !== id); // Remove object with matching id
    },

    placeBid: (state, action) => {
      const { id, bidAmount, userEmail } = action.payload;
      const auction = state.find((a) => a._id === id);
        auction.currBid = bidAmount;
        auction.bidHistory.push({ userEmail, bidAmount, timestamp: new Date() }); 
    },
  },
});

export const { setAuction, addAuction, updateAuction, deleteAuction,placeBid } =
  auctionsSlice.actions;

export default auctionsSlice.reducer;
