
import './index.css'
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import FetchApi from '../constants/FetchApi';
import NavbarTopFirst from '../NavbarTopFirst';
function Navbar({ statusCount }) {
    const location = useState()
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [userName, setUserName] = useState("")
    const [peddingCount, setPeddingCount] = useState()

    const handleToggle = () => {
        setCollapsed(!isCollapsed);
    };
    const handleSidebarToggle = () => {
        setIsSidebarActive(prevState => !prevState);
    };
    const handleCheckAuth = async () => {
        try {
            const data = await FetchApi("check-auth-phone", "", {
                method: "GET"
            })
            if (data.status === 200) {
                setUserName(data.username)
                localStorage.setItem("userName", data.username)
            }

            const res = await FetchApi("driver-req-status", "", {
                method: "GET"
            })
            const statusCounter = res.data;
            console.log(statusCounter);
            if (statusCounter.pending > 0) {
                setPeddingCount(statusCounter.pending)
            }
            console.log("my pedding");

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleCheckAuth()
    }, [])
    return (
        <>
            {/* <NavbarTopFirst /> */}
            <div class="wrapper">
                <nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
                    <div class="sidebar-header">
                    <Link to="/" className="driverTitle"><h2>EasyDrive</h2></Link>
                        <h6>Hi {userName}</h6>
                    </div>
                    <ul class="list-unstyled components">
                        <li class="active" className={isSidebarActive ? 'active' : ''}>
                            <li>
                                <Link to="/dashboard"><img src="myImage/house-check.svg" alt="" className='mx-2' /> Dashboard  </Link>
                            </li>
                            <li>
                                <Link to="/inbox">
                                    <img src="myImage/envelope.svg" alt="" className='mx-2' />
                                    Inbox
                                    {peddingCount && (<span className='booking-count'> {peddingCount}</span>)}
                                </Link>
                            </li>
                            <li>
                                <Link to="/share-car"><img src="myImage/share-fill.svg" alt="" className='mx-2' />Share Cars</Link>
                            </li>
                            <li>
                                <Link to="/your-cars"><img src="myImage/car-front-fill.svg" alt="" className='mx-2' />Your Vahicals</Link>
                            </li>
                            <li>
                                <Link to="/income"><img src="myImage/car-front-fill.svg" alt="" className='mx-2' />Income</Link>
                            </li>
                        </li>
                        <li>
                            <li>
                                <Link to="/account-driver"><img src="myImage/person-fill.svg" alt="" className='mx-2' />Account</Link>
                            </li>
                        </li>
                        <li>
                            <Link to="/login"><img src="myImage/box-arrow-in-right.svg" alt="" className='mx-2' />LogOut</Link>
                        </li>

                    </ul>
                </nav>
                <div id="content">
                    <nav className="navbar navbar-expand-lg  bg-light container-fluid"  >
                        <div class="">
                            <button type="button"
                                onClick={handleSidebarToggle}
                                id="sidebarCollapse"
                                className={`navbar-btn ${isSidebarActive ? 'active' : ''}`}
                            >
                                <span></span>
                                <span></span>
                                <span></span>

                            </button>
                        </div>
                    </nav>
                    <div className='search_group'>
                        <div class="header__search">
                            <input type="search" placeholder="Search" class="header__input" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;