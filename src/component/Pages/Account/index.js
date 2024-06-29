import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import FetchApi from '../../../constants/FetchApi';
import './index.css'
import AppConfig from '../../../constants/AppConfig';
import SuccessPopup from '../../SucessPopup';

export default function Account() {

    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [userName, setUserName] = useState("")
    const [peddingCount, setPeddingCount] = useState()
    const [update, setUpdate] = useState(false)
    const [accountInfo, setAccountInfo] = useState()
    const [sucess ,setSucess] = useState(false)
 
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [aadharNumber, setAadharNumber] = useState("")
    const [licenceNumber, setLicenceNumber] = useState("")
    const [dob, setDob] = useState("")
    const [panNumber, setPanNumber] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [image, setImage] = useState(null)

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

    const handleEdit = async () => {
        try {
            setUpdate(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = async () => {
        try {
            setUpdate(false)
        } catch (error) {
            console.log(error);
        }
    }
    const handlerImage = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        console.log("image file", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(file)
            console.log("file data reader", reader);
        }
    }
    const handleUpdateAccount = async () => {
        try {
            const formData = new FormData()
            formData.append('image', imageFile);
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('city', city);
            formData.append('aadharNumber', aadharNumber);
            formData.append('licenceNumber', licenceNumber);
            formData.append('dob', dob);
            formData.append('panNumber', panNumber);
            console.log("my update data.", formData);

            const data = await FetchApi("driver-account-update", formData, {
                method: "PATCH",
                isForm: true
            })
            if (data.status === 200) {
                setSucess(true)
                setTimeout(() => {
                    setUpdate(false)
                    setSucess(false)
                }, 1500);
            }
            console.log("my update ==>", data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        const handlerDisplayData = async () => {
            try {
                const res = await FetchApi("driver-account", "", {
                    method: "GET"
                })
                if (res.status === 200) {

                    console.log("my display data", res.data);
                    setAccountInfo(res.data)
                    // if (accountInfo) {

                    setFname(res.data.fname)
                    setLname(res.data.lname)
                    setPhone(res.data.phone)
                    setEmail(res.data.email)
                    setAadharNumber(res.data.aadharNumber)
                    setLicenceNumber(res.data.licenceNumber)
                    setDob(res.data.dob)
                    setCity(res.data.city)
                    setPanNumber(res.data.panNumber)
                    console.log("user name ==>", fname);
                    // }
                }
            } catch (error) {
                console.log(error);
            }
        }
        handlerDisplayData()
    }, [])

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
                    <div className='container-fluid'>
                        <div>

                        </div>
                        {sucess && 
                        <div class="alert alert-success" role="alert">
                            Sucessfully Update Account..!😇👍
                        </div>
                        }
                        <h2>Account</h2>
                        {!update ? <>
                            {accountInfo && (


                                <div className='row main-account'>
                                    <div className="col user-profile m-4">
                                        <h4>Profile </h4>
                                        <div className='justify-content-center align-items-center'>
                                            <img src={AppConfig.BASE_URL + `/ProfilePic/` + accountInfo.image} alt="not found" className='img-fluid' />
                                        </div>
                                        <div className='row mt-4  base-info'>
                                            <table border={"1"}>
                                                <tr>
                                                    <th>First Name</th>
                                                    <td>{accountInfo.fname}</td>

                                                </tr>
                                                <tr>
                                                    <th>Last Name</th>
                                                    <td>{accountInfo.lname}</td>

                                                </tr>
                                                <tr>
                                                    <th>Phone</th>
                                                    <td>{accountInfo.phone}</td>

                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{accountInfo.email}</td>

                                                </tr>
                                            </table>

                                        </div>

                                    </div>
                                    <div className="col mx-2 other-info m-4">
                                        <h4>Other Info</h4>
                                        <div className='other-table-info'>
                                            <table border={"1"}>
                                                <tr>
                                                    <th>City</th>
                                                    <td>{accountInfo.city}</td>
                                                </tr>
                                                <tr>
                                                    <th>AadharNumber</th>
                                                    <td>{accountInfo.aadharNumber} </td>
                                                </tr>
                                                <tr>
                                                    <th>licenceNumber</th>
                                                    <td>{accountInfo.licenceNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th>DOB</th>
                                                    <td>{accountInfo.dob}</td>
                                                </tr>
                                                <tr>
                                                    <th>PanNumber</th>
                                                    <td>{accountInfo.panNumber}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='profile-btn'>

                                            <button className='edit-btn mx-2' onClick={handleEdit}> Edit Profile</button>
                                            <button className='delete-btn mx-2'>Delete</button>
                                        </div>
                                    </div>

                                </div>

                            )}
                        </>
                            : <>
                                <div className='row main-account'>
                                    <div className="col user-profile m-4">
                                        <h4>Profile </h4>
                                        <div className='justify-content-center align-items-center'>
                                            {/* <label htmlFor="fileupload" className='fileuploader'> */}
                                            {/* <img src="photos/man1.jpg" alt="not found"  /> */}
                                            {image ?
                                                <div >
                                                    <img src={image} alt="" />
                                                </div>
                                                :
                                                <>
                                                    <label htmlFor="fileupload" className='fileuploader'>
                                                        <div className='lableImage'>

                                                            <img src="myImage/plus.svg" alt="" />
                                                            <p>Upload</p>
                                                        </div>
                                                    </label>
                                                </>
                                            }
                                            {/* </label> */}
                                            <input type="File" style={{ display: "none" }} id='fileupload' onChange={handlerImage} />

                                        </div>
                                        <div className='row mt-4  base-info'>
                                            <table >
                                                <tr>
                                                    <th>First Name :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => setFname(e.target.value)}
                                                        value={fname} /></td>

                                                </tr>
                                                <tr>
                                                    <th>Last Name :- </th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setLname(e.target.value) }}
                                                        value={lname}
                                                    /></td>

                                                </tr>
                                                <tr>
                                                    <th>Phone :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setPhone(e.target.value) }}
                                                        value={phone}
                                                    /></td>

                                                </tr>
                                                <tr>
                                                    <th>Email :-</th>
                                                    <td><input
                                                        type="text"
                                                        onChange={(e) => { setEmail(e.target.value) }}
                                                        value={email}
                                                    /></td>

                                                </tr>
                                            </table>

                                        </div>

                                    </div>
                                    <div className="col mx-2 other-info m-4">
                                        <h4>Other Info</h4>
                                        <div className='other-table-info'>
                                            <table>
                                                <tr>
                                                    <th>City :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setCity(e.target.value) }}
                                                        value={city}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <th>AadharNumber :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setAadharNumber(e.target.aadharNumber) }}
                                                        value={aadharNumber}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <th>licenceNumber :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setLicenceNumber(e.target.licenceNumber) }}
                                                        value={licenceNumber}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <th>DOB :-</th>
                                                    <td><input type="date"
                                                        onChange={(e) => { setDob(e.target.dob) }}
                                                        value={dob}
                                                    /></td>
                                                </tr>
                                                <tr>
                                                    <th>PanNumber :-</th>
                                                    <td><input type="text"
                                                        onChange={(e) => { setPanNumber(e.target.panNumber) }}
                                                        value={panNumber}
                                                    /></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='profile-btn'>

                                            <button className='edit-btn mx-2' onClick={handleUpdateAccount}> Update</button>
                                            <button className='delete-btn mx-2' onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>

                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}
