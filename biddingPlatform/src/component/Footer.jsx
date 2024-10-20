import react from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer=()=>{
return(
    <div style={{ width: "100%", display: "flex", height: "100%", color: "#fff",flexDirection:"column" }}>
        <div style={{ height: "60%", width: "100%", display: "flex", gap: "3rem", alignItems: "center" }}>
          <div style={{ width: "30%", display: "flex", justifyContent: "center", alignItems: "center",fontSize:"2rem",fontWeight:"700",whiteSpace:"nowrap" }}>Genix Auctions</div>
          <div style={{ width: "10%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",marginTop:"38px" }}>
            <div>products</div>
            <div style={{whiteSpace:"nowrap"}}>About us</div>
            <div>contact</div>
          </div>
          <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>Auctions</div>
          <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>Bidding</div>
          <div style={{ width: "35%", display: "flex", justifyContent: "center", alignItems: "center",gap:"5px" }}>
            <div><TwitterIcon/></div>
            <div><FacebookIcon/></div>
            <div><InstagramIcon/></div>
            <div><GitHubIcon/></div>
          </div>
        </div>


        <div  style={{ height: "40%", display: "flex",color:"#fff",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"1rem" }}>

          <div style={{width:"70%",height:"0px",border:"0.1px solid rgb(130 123 123)"}}></div>
          <div style={{display:"flex",whiteSpace:"nowrap"}}><div><CopyrightIcon/></div>Copyright 2024, All Rights Reserved by Genix</div>


        </div>
      </div>
)
}
export default Footer;