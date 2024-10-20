import React,{useEffect,useState} from 'react';
import AuctionBox from '../component/AuctionBox';
import { useSelector, useDispatch } from 'react-redux';
import { setAuction} from '../store/auctionsSlice';
import Footer from '../component/Footer';
const Auctions = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        fetch('http://localhost:3001/auctions')
          .then((res) => res.json())
          .then((data) => {
            dispatch(setAuction(data)) 
        })
          .catch((err) => console.error(err));
      }, []);
      
    const auctions= useSelector((state)=>state.auction);
    console.log(auctions);
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
            return <AuctionBox id={val.id} auction={val} type={"auction"} />
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