import { Link } from "react-router-dom";
import './index.css'

const NavbarTopFirst = () => {
    return (
        <>
            <nav fixed="top" className='navbar-fixed-top' id="navber">
                <div class="navbar  navbar-expand-lg navbar-light bg-light" fixed="top" id="top_nav">
                    <div className='item-list'>

                        <div className="nav-title title-top">
                            <Link to="/"> WheelsHub</Link>
                        </div>
                        <div style={{ display: "flex" }} className='contact'>
                            <div className="icon-phone mx-3">
                                {/* <img src="myImage/call-logo.png" alt="" className="img-phone" /> */}
                                <span class="material-symbols-outlined">
                                    call
                                </span>
                            </div>
                            <div className='mx-2'>
                                <h6>contact-us</h6>
                                0261-251 425 854
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}
export default NavbarTopFirst;