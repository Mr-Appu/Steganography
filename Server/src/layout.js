import { Outlet,Link} from "react-router-dom";
export default function Layout(){
    return(
        <>
        <div className="navpanel">
            <h1>Steganography</h1>
        </div>        
        <div className="navbar">
           <div class="Text">
                <Link style={{textDecoration: 'none', color:'#414040 '}}to="/">Text</Link>
            </div>
           <div class="Image">
                <Link style={{textDecoration: 'none', color:'#414040 '}}to="/Image">Image</Link>
            </div>
            <div class="Audio">
                <Link style={{textDecoration: 'none', color:'#414040 '}}to="/Audio">Audio</Link>
            </div>
        </div>
        <Outlet/>
        </>
    )
}