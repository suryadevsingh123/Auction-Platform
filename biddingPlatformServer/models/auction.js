const mongoose=require("mongoose");
const auctionSchema=new mongoose.Schema({
    title: String,
    des:String,
    currBid:Number,
    minBid: Number,
    imageSrc: String,
    userEmail: String,
    validTillDays:Number,
    bidHistory: [
    {
      userEmail: String,
      bidAmount: Number,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
const auctionModel=mongoose.model("Auction",auctionSchema);
module.exports=auctionModel;