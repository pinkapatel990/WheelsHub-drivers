import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import FetchApi from '../../../constants/FetchApi'
import './index.css';
import LineChartGraph from '../../../Modules/LineChartGraph'



export default function Income() {

    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [userName, setUserName] = useState("")
    const [peddingCount, setPeddingCount] = useState()
    const [totalBooking, setTotalBooking] = useState("")
    const [acceptBooking, setAcceptBooking] = useState("")
    const [cancelBooking, setCancelBooking] = useState("")
    const [income, setIncome] = useState([])
    const [totalIncome, setTotalIncome] = useState("")

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
                // localStorage.setItem("userName", data.username)
            }

            const res = await FetchApi("driver-req-status", "", {
                method: "GET"
            })

            const statusCounter = res.data;
            console.log(statusCounter);
            if (statusCounter) {
                setTotalBooking(statusCounter.accepted + statusCounter.cancel)
                setAcceptBooking(statusCounter.accepted)
                setCancelBooking(statusCounter.cancel)
            }
            if (statusCounter && statusCounter.pending > 0) {
                setPeddingCount(statusCounter.pending)

            }

        } catch (error) {
            console.log(error);
        }
    }
    const handleIncome = async () => {
        try {
            const data = await FetchApi("get-income", "", {
                method: "GET"
            })

            console.log("object", data.income);
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            const sortedData = data.income.sort((a, b) => a.month - b.month);

            const formatDataLine = sortedData.map(item => ({
                Month: monthNames[item.month - 1],
                income: item.totalIncome

            }))
            setIncome(formatDataLine)
            let totalIncomes = 0;
            formatDataLine.forEach((item) => {
                totalIncomes += item.income;
                setTotalIncome(totalIncomes)
                console.log(`Month: ${item.Month}, Income: ${item.income}`);

            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        handleCheckAuth()
        handleIncome()
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
                    <div className='container-fluid'>
                        <div className='row mt-4 booking_status'>
                            <div className="col booking_car1 mx-2">
                                <h5>Total Income</h5>
                                <p>{totalIncome}</p>
                            </div>
                            <div className="col booking_car1 mx-2">
                                <h5>Total Booking</h5>
                                <p>{totalBooking}</p>
                            </div>
                            <div className="col booking_car1 mx-2">
                                <h5>Accepted</h5>
                                <p>{acceptBooking}</p>
                            </div>
                            <div className="col booking_car1 mx-2">
                                <h5>Cancel</h5>
                                <p>{cancelBooking}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="incomegraph">

                                <LineChartGraph data={income} />

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
