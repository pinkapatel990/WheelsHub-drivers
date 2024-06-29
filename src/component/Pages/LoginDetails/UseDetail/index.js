import { Link } from 'react-router-dom'
import './index.css'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import AppConfig from "../../../../constants/AppConfig";
import SuccessPopup from '../../../SucessPopup'
import SucessMsg from '../../../../SucessMsg'
import CustomInput from '../../../Element/CustomInput'
import Customlabel from '../../../Element/Customlabel'

const UserDetail = () => {
    const Navigate = useNavigate()
    const BASE_URL = AppConfig.API_BASE_URL
    const [username, setUsername] = useState("")
    const [myImage, setMyImage] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState("")
    const [isSliderClosed, setSliderClosed] = useState(true);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [isAadharClose, setIsAadharClose] = useState(true)
    const [aadharNumber, setAadharNumber] = useState('');
    const [isAadharDisabled, setIsAadharDisabled] = useState(false)

    const [isLicenceClosed, setIsLicenceClosed] = useState(true)
    const [licenceNum, setLicenceNum] = useState("")
    const [dob, setDob] = useState("")
    const [isLicenceDisabled, setIsLicenceDisabled] = useState(false)

    const [panNumber, setPanNumber] = useState("")
    const [isPanClosed, setIsPanClosed] = useState(true)
    const [isPanDisabled, setIsPanDisabled] = useState(false)

    useEffect(() => {
        hanlderUserData()
    }, [])
    const handleButtonClick = () => {
        setSliderClosed(!isSliderClosed);
    };
    const handleAadharClick = () => {
        setIsAadharClose(!isAadharClose)
    }
    const handleLicenceClick = () => {
        setIsLicenceClosed(!isLicenceClosed)
    }
    const handlePanClick = () => {
        setIsPanClosed(!isPanClosed)
    }
    const handleAadharChange = (e) => {
        // Remove non-numeric characters from the input
        const sanitizedInput = e.target.value.replace(/\D/g, '');
        // Format the Aadhar number with spaces
        const formattedAadhar = sanitizedInput.replace(/(\d{4})/g, '$1 ');
        // Update the state with the formatted Aadhar number
        setAadharNumber(formattedAadhar);
    };

    const handalerImage = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(file)
        }

        console.log("upload image===>", file);

    }

    const token = Cookies.get("jwt")
    const handelImageUpload = async (e) => {
        try {
            const formData = new FormData()
            formData.append('image', imageFile)
            formData.append('screenType', 1)

            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            console.log("Api res===>", data);

            if (data.status === 200) {
                // props.onProfile
                setIsSuccess(true)
                setTimeout(() => {
                    setIsSuccess(false)
                    // Navigate("/user-detail")
                    setSliderClosed(!isSliderClosed);
                    setButtonDisabled(true)
                }, 2000);
            } else {
                alert("try again");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const hanlderUserData = async () => {
        try {
            const res = await fetch(BASE_URL + "get-userdetail", {
                method: "GET",
                headers: {
                    token: token
                }
            })
            const resData = await res.json()
            const userImage = resData.data.image;
            const userAadhar = resData.data.aadharNumber
            const userLicence = resData.data.licenceNumber
            const userPan = resData.data.panNumber
            const username = resData.data.username
            console.log("user data get", userAadhar);
            if (username) {
                setUsername(username)
            }
            if (userImage) {
                setButtonDisabled(true)
            }
            if (userAadhar) {
                setIsAadharDisabled(true)
            }
            if (userLicence) {
                setIsLicenceDisabled(true)
            }
            if (userPan) {
                setIsPanDisabled(true)
            }
            if (userImage && userAadhar && userLicence && userPan) {
                Navigate("/share-car")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAadharApi = async () => {
        try {
            console.log("Aadhar", aadharNumber);
            const token = Cookies.get("jwt")
            const formData = new FormData()
            formData.append('aadharNumber', aadharNumber)
            formData.append('screenType', 2)
            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            if (data.status === 200) {
                setIsSuccess(true)
                setTimeout(() => {
                    setIsAadharDisabled(true)
                    setIsAadharClose(!isAadharClose)
                    setIsSuccess(false)
                }, 2000);
            } else {
                alert("try again")
            }
            console.log("suceess adhar", data);
        } catch (error) {
            console.log(error);
        }
    }
    const licenceNumber = (e) => {
        try {
            const numberVal = e.target.value.replace(/(.{4})/g, '$1 ').trim()
            setLicenceNum(numberVal)
        } catch (error) {
            console.log("error", error);
        }
    }

    const handlerLicenceNumber = async () => {
        try {
            const token = Cookies.get("jwt")
            const formData = new FormData()
            formData.append('licenceNumber', licenceNum)
            formData.append('dob', dob)
            formData.append('screenType', 3)
            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            if (data.status === 200) {
                setIsSuccess(true)

                setTimeout(() => {
                    setIsLicenceDisabled(true)
                    setIsLicenceClosed(!isLicenceClosed)
                    setIsSuccess(false)

                }, 2000);
            } else {
                alert("try again")
            }
            console.log("suceess adhar", data);
        } catch (error) {
            console.log(error);
        }
    }
    const handlerPanNumber = async () => {
        try {
            const token = Cookies.get("jwt")
            const formData = new FormData()
            formData.append('panNumber', panNumber)
            formData.append('screenType', 4)
            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            if (data.status === 200) {
                setIsSuccess(true)
                setTimeout(() => {
                    setIsPanDisabled(true)
                    setIsPanClosed(!isPanClosed)
                    setIsSuccess(false)
                }, 2000);
            } else {
                alert("try again")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <nav className='navber nav-width'>
                <Link to="/" className='nav-link'>WheelsHub</Link>
            </nav>
            <div className='container-frame'>
                <h3>Hi Welcome {username}</h3>
                <p>Here's what you need to do set up your account</p>
                <div className='user-del'>
                    {isSuccess && (
                        <SucessMsg message={"Sucessfully! 👍😊"} />
                    )}
                    {/* card 1 */}
                    <div>

                        <button
                            className={isButtonDisabled ? "disabled" : "button"}
                            onClick={handleButtonClick}
                            disabled={isButtonDisabled}
                        >
                            {isSliderClosed ? 'Profile Photo' : 'Profile Photo'}
                        </button>
                        <div className={`slider ${isSliderClosed ? 'closed' : ''}`}>

                            <h2 className='title-head'>Upload Profile Photo</h2>
                            <span className='title-head'>Click Button And Upload Here Your Profile Photo</span>
                            <div className='card1'>
                                {image ?
                                    <div>
                                        <img src={image} alt="not found" className="image-profile" />
                                    </div>
                                    :
                                    <img src="myImage/avtar.png" alt="not found" className="avtar" />
                                }
                                <div>
                                    <label htmlFor="img-upload" className="upload-lable">Upload Photo</label>
                                    <input type="File" id="img-upload" style={{ display: "none" }} onChange={handalerImage} />
                                </div>
                                <button className="next-btn-profile" onClick={handelImageUpload}>Next</button>
                            </div>
                        </div>
                        {/* card 2        */}
                        <div>
                            {/* {isSuccess && (
                                <SucessMsg message={"Sucessfully!"} />
                            )} */}
                            <button
                                className={isAadharDisabled ? "disabled" : "button"}
                                onClick={handleAadharClick}
                                disabled={isAadharDisabled}
                            >
                                {isAadharClose ? 'Aadhar Card' : 'Aadhar Card'}
                            </button>
                            <div className={`slider ${isAadharClose ? 'closed' : ''}`}>
                                <h2>Let's Find your Aadhar Number </h2>
                                <span>Enter your aadhar number and we'll get require infomation. </span>
                                <div className="aadhar-icon">
                                    <img src="myImage/aadhar_card.png" alt="not found" />
                                </div>
                                <div className="aahdar-num">

                                    <span>Aadhar Number</span>
                                    <input
                                        type="text"
                                        id="aadharInput"
                                        value={aadharNumber}
                                        onChange={handleAadharChange}
                                        placeholder="xxxx xxxx xxxx"
                                        className="input-number"
                                        autocomplete="off"
                                    />
                                </div>
                                <button className="next-btn-aadhar" onClick={handleAadharApi}>Next</button>
                            </div>
                        </div>

                        {/* card 3 */}

                        <div>
                            {/* {isSuccess && (
                                <SucessMsg message={"Sucessfully!"} />
                            )} */}
                            <button
                                className={isLicenceDisabled ? "disabled" : "button"}
                                onClick={handleLicenceClick}
                                disabled={isLicenceDisabled}
                            >
                                {isLicenceClosed ? 'Driving License -Front' : 'Driving License -Front'}
                            </button>
                            <div className={`slider ${isLicenceClosed ? 'closed' : ''}`}>

                                <h2>Enter your licence number and date of birth</h2>
                                <div className="img-icon">
                                    <img src="myImage/driver.png" alt="not found" />
                                </div>
                                <div className="input-licence">
                                    <label htmlFor="">Licence Number</label>
                                    <CustomInput
                                        placeholder="DL00 00000000000"
                                        className="licen-num"
                                        onChange={licenceNumber}
                                        value={licenceNum}
                                    >
                                    </CustomInput>

                                    <label htmlFor="">Date Of Birth</label>
                                    <CustomInput
                                        type="date"
                                        className="licen-num"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                    />

                                    <button className="btn-licence" onClick={handlerLicenceNumber}>Submit</button>
                                </div>
                            </div>
                        </div>
                        {/* card 4 */}
                        <div>
                            <button
                                className={isPanDisabled ? "disabled" : "button"}
                                onClick={handlePanClick}
                                disabled={isPanDisabled}
                            >
                                {isPanClosed ? 'Pan Card' : 'Pan Card'}
                            </button>
                            <div className={`slider ${isPanClosed ? 'closed' : ''}`}>
                                <h2>Let's find your PAN card number </h2>
                                <img src="myImage/panCard.png" alt="not Found" className="img-pan" />
                                <div className="input-pan">
                                    <Customlabel>PAN Number</Customlabel>
                                    <CustomInput
                                        placeholder="ABCCD1234Z"
                                        className="input-num"
                                        value={panNumber}
                                        onChange={(e) => setPanNumber(e.target.value)}
                                    ></CustomInput>
                                </div>
                                <button className="pan-btn" onClick={handlerPanNumber}>Submit</button>
                            </div>
                        </div>

                    </div >
                </div>
            </div>
        </>
    )
}

export default UserDetail 