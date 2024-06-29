import { createContext, useEffect, useState } from "react";
import React from "react";
import Navbar from "../../../Navbar";
import "./index.css"
import FetchApi from "../../../constants/FetchApi";
import AppConfig from "../../../constants/AppConfig";
import { Link } from "react-router-dom";
import Notification from "../../../Modules/Notification";

// import Toast from "../../Toast";


const UserContext = createContext()
const Inbox = () => {
    const API_BASE_URL = AppConfig.API_BASE_URL
    const [reqData, setReqData] = useState()
    const [statusPadding, setStatusPadding] = useState()
    const [user, setUser] = useState("rinu")
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




    let statusType = []
    const handlerBookingReq = async () => {
        try {
            const res = await FetchApi("car-booking-request", "", {
                method: "GET"
            })
            console.log("my resposs ==>", res);
            if (res.status === 200) {
                const responseData = res.data;
                setReqData(responseData);
                console.log("res data", responseData);

                for (let index = 0; index < responseData.length; index++) {
                    const element = responseData[index];
                    console.log("my res data ====>", element.status);
                    statusType.push(element.status)
                }
                console.log(statusType);

                const countPadding = () => {
                    let pendingCount = 0;
                    statusType.forEach(status => {
                        if (status === 'pending') {
                            console.log("show count", pendingCount);
                            pendingCount++;
                        }
                    })
                    return pendingCount;
                }
                const pendingCount = countPadding();
                setStatusPadding(pendingCount)
                // window.alert("You have Booking Request")
            }

        } catch (error) {
            console.log(error);
        }
    }


    const handlerBookingStatus = async (id, status) => {
        try {

            const updateStatus = { status: status }
            const result = await FetchApi('car-booking-status?bookId=' + id, updateStatus, {
                method: 'PATCH'

            })
            console.log(updateStatus);
            console.log("my booking id ==>", result);

        } catch (error) {
            console.log(error);
        }
    }

    const getBookingCategory = (bookingDate) => {
        const now = new Date();
        const bookingDateTime = new Date(bookingDate);

        if (
            bookingDateTime.getDate() === now.getDate() &&
            bookingDateTime.getMonth() === now.getMonth() &&
            bookingDateTime.getFullYear() === now.getFullYear()
        ) {
            return 'Today';
        }

        // Check if the booking date is yesterday
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (
            bookingDateTime.getDate() === yesterday.getDate() &&
            bookingDateTime.getMonth() === yesterday.getMonth() &&
            bookingDateTime.getFullYear() === yesterday.getFullYear()
        ) {
            return 'Yesterday';
        }

        return bookingDateTime;
    };
    function formatDate(date) {
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2);

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        handlerBookingReq()
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
                                <Link to="/income"><img src="myImage/coin.svg" alt="" className='mx-2' />income</Link>
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

                    <div className="container-fluid contect-body">
                        {/* <NavbarTopFirst /> */}
                        <div className="nav-content">
                            <div>
                            </div>
                            <div className="sub-content">
                                <h1>Inbox</h1>
                                
                                <Notification />
                                <div className="msg-box my-2 mx-2">
                                    <table className="table" >
                                        <thead class="theame">
                                            <tr className="">
                                                <th scope="col" >From</th>
                                                <th scope="col" >PickupDate</th>
                                                <th scope="col" >pickupTime</th>
                                                <th scope="col" >DropDate  </th>
                                                <th scope="col" >DropTime</th>
                                                <th scope="col" >Price</th>
                                                <th scope="col" >TotalPrice</th>
                                                <th scope="col" >Customer Phone</th>
                                                <th scope="col" >Vehical</th>
                                                <th scope="col" colSpan={2}>Request</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(reqData) && reqData.length > 0 && reqData.sort((a, b) => {
                                                return b.pickupDate.localeCompare(a.pickupDate) || b.pickupTime.localeCompare(a.pickupTime)
                                            })
                                                .map((element, index) => {
                                                    const bookingCategory = getBookingCategory(element.pickupDate);
                                                    return (
                                                        <React.Fragment key={`booking_${index}`}>
                                                            <>
                                                                {index === 0 || bookingCategory !== getBookingCategory(reqData[index - 1].pickupDate) ? (
                                                                    <tr key={`heading_${index}`}>
                                                                        <td colSpan="11" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                                            {bookingCategory === 'Today' || bookingCategory === 'Yesterday'
                                                                                ? bookingCategory
                                                                                : formatDate(new Date(bookingCategory))} Booking
                                                                        </td>
                                                                    </tr>
                                                                ) : null}


                                                                <tr className="my-2" key={element._id}>
                                                                    <td scope="row">{element.from}</td>
                                                                    <td>{new Date(element.pickupDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                                                                    <td>{element.pickupTime}</td>
                                                                    <td>{new Date(element.DropDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                                                                    <td>{element.dropTime}</td>
                                                                    <td>{element.price}</td>
                                                                    <td>{element.totalPrice}</td>
                                                                    <td style={{ padding: "4px" }}>{element.phoneNo}</td>
                                                                    <td style={{ padding: "10px" }}> {element.vehicalNo}</td>
                                                                    {element && element.status === 'Accepted' ?
                                                                        (<button type="" className="btn btn-success" >Booked</button>)
                                                                        : element && element.status === 'Cancel' ?
                                                                            (<button type="" className="btn btn-danger" >Cancel</button>) :
                                                                            <>
                                                                                <td style={{ padding: "4px" }}><button type="" className="btn btn-success" onClick={(e) => { handlerBookingStatus(element._id, 'Accepted') }}>Accepted</button></td>
                                                                                <td style={{ padding: "4px" }}><button type="" class="btn btn-danger" onClick={(e) => { handlerBookingStatus(element._id, 'Cancel') }}>Cancel</button></td>
                                                                            </>
                                                                    }



                                                                </tr>

                                                            </>
                                                        </React.Fragment>
                                                    )
                                                })}
                                        </tbody>
                                    </table >
                                </div >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Inbox;
