import NavbarTopFirst from "../../../NavbarTopFirst"
import Navbar from "../../../Navbar"
import './index.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import FetchApi from "../../../constants/FetchApi"

const YourCars = () => {
    const [update, setUpdate] = useState(false)
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [userName, setUserName] = useState("")
    const [peddingCount, setPeddingCount] = useState()


    const handlerUpdateCars = () => {
        try {
            setUpdate(true)
        } catch (error) {
            console.log(error);
        }
    }
    const handelrCancel = () => {
        setUpdate(false)
    }
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
                                <Link to="/income"><img src="myImage/coin.svg" alt="" className='mx-2' />Income</Link>
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







                    {/* <NavbarTopFirst /> */}
                    <div className="container-fluid nav-content">

                        <div className=" mt-2">
                            <h2 className="car_title">MY CARS </h2>
                            {!update ? <>
                                <div className="main_content">
                                    <p>Image</p>
                                    <div className="carimg ">
                                        <img src="myImage/p2.jpg" alt="" className="mx-2" />
                                        <img src="myImage/p2.jpg" alt="" className="mx-2" />
                                        <img src="myImage/p2.jpg" alt="" className="mx-2" />
                                        <img src="myImage/p2.jpg" alt="" className="mx-2" />
                                        <img src="myImage/p2.jpg" alt="" className="mx-2" />
                                    </div>

                                    <p>Car Details</p>
                                    <div className="main_info">

                                        <div className="car_info">
                                            <h4>Name</h4>
                                            <span>Honda City</span>
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info">
                                            <h4>Price</h4>
                                            <span>500</span>
                                        </div>
                                        <div className="car_info">
                                            <h4>Exterior Color</h4>
                                            <span>Red</span>
                                        </div>
                                    </div>
                                    <div className="main_info">

                                        <div className="car_info">
                                            <h4>interior Color</h4>
                                            <span>Black</span>
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info">
                                            <h4>Make Year</h4>
                                            <span>12 march</span>
                                        </div>
                                        <div className="car_info">
                                            <h4>Register Year</h4>
                                            <span>15 may</span>
                                        </div>
                                    </div>
                                    <div className="main_info">

                                        <div className="car_info">
                                            <h4>FuelType</h4>
                                            <span>Diesal</span>
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info">
                                            <h4>Trasmission</h4>
                                            <span>Manual</span>
                                        </div>
                                        <div className="car_info">
                                            <h4>City</h4>
                                            <span>Surat</span>
                                        </div>
                                    </div>
                                    <div className="main_info">

                                        <div className="car_info">
                                            <h4>Vehical No</h4>
                                            <span>AS17AR15289</span>
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info">
                                            <h4>seats</h4>
                                            <span>5</span>
                                        </div>
                                        <div className="car_update_btn">
                                            <button onClick={handlerUpdateCars}>Update Car</button>
                                        </div>
                                    </div>

                                </div>

                            </> : <>

                                <div className="main_content my-2">

                                    <div className="carimg ">
                                        <label htmlFor="update_picture" className="picture">
                                            <div className="picture_image">
                                                <div>
                                                    <img src="" alt="" />
                                                </div>
                                                <div>
                                                    <div>
                                                        <center>
                                                            <FontAwesomeIcon icon={faUpload} size="2x" />
                                                            <h5>Car Image</h5>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <input type="file"
                                            id="update_picture"
                                            accept="image/*"
                                            multiple

                                        />
                                    </div>
                                    <p>Car Details</p>
                                    <div className="main_info">

                                        <div className="car_info mx-2">
                                            <h4>Name</h4>

                                            <input type="text" className="input_control" value={"honda"} />
                                        </div>
                                        <div className="car_info mx-2">
                                            <h4>Price</h4>
                                            <input type="text" className="input_control" value={"500"} />
                                        </div>
                                        <div className="car_info">
                                            <h4>Exterior Color</h4>
                                            <input type="text" className="input_control" value={"red"} />
                                        </div>
                                    </div>
                                    <div className="main_info ">

                                        <div className="car_info mx-2" >
                                            <h4>interior Color</h4>
                                            <input type="text" className="input_control" value={"red"} />
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info mx-2">
                                            <h4>Make Year</h4>
                                            <input type="date" className="input_control" value={"red"} />
                                        </div>
                                        <div className="car_info">
                                            <h4>Register Year</h4>
                                            <input type="date" className="input_control" value={"red"} />
                                        </div>
                                    </div>
                                    <div className="main_info">

                                        <div className="car_info">
                                            <h4>FuelType</h4>
                                            <input type="text" className="input_control" value={"diesal"} />
                                            {/* <input type="text" className="input_control" /> */}
                                        </div>
                                        <div className="car_info mx-2">
                                            <h4>Trasmission</h4>
                                            <input type="text" className="input_control" value={"manual"} />
                                        </div>
                                        <div className="car_info">
                                            <h4>City</h4>
                                            <input type="text" className="input_control" value={"surat"} />

                                        </div>
                                    </div>
                                    <div className="main_info">

                                        <div className="car_info mx-2">
                                            <h4>Vehical No</h4>
                                            <input type="text" className="input_control" value={"AS17AR15289"} />
                                        </div>
                                        <div className="car_info">
                                            <h4>seats</h4>
                                            <input type="text" className="input_control" value={"5"} />

                                        </div>

                                    </div>
                                    <div className="main_info">
                                        <div className="car_update_btn">
                                            <button>Chanage</button>
                                        </div>
                                        <div className="car_update_btn">
                                            <button onClick={handelrCancel}>Cancel</button>
                                        </div>
                                    </div>


                                </div>
                            </>}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default YourCars 
