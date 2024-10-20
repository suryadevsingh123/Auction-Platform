import React,{useEffect} from 'react';
import AuctionBox from '../component/AuctionBox';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../component/Footer';
const Auctions = () => {
    const auctions= useSelector((state)=>state.auction);
    console.log("auction",auctions,localStorage.getItem("userEmail"),"here");
    return(
        <div>
        <div style={{height: "30rem", }}>
            
        </div>
        <div 
        style={{
          display:"flex",
          width:"100%"
        }}
        >
        <div style={{width:"5%"}}></div>
        <div
        style={{
          display:"flex",
          width:"90%",
          gap:"50px",
          flexWrap:"wrap",
          padding:"2px"
        }}
        >
         {auctions.map((val)=>{
            <>{console.log(val.userEmail,"val.userEmail")}</>
            if(val.userEmail===localStorage.getItem("userEmail")){
                return <AuctionBox id={val._id} auction={val} type={"myAuction"} />
                }
         })}
          
        </div>
        <div style={{width:"5%"}}></div>
        </div>
        <div style={{height: "25rem",backgroundColor:"#001833"}}>
        <Footer/>
        </div>

        </div>
        
        
    )
    };

export default Auctions;