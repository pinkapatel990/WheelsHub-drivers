import { Link } from "react-router-dom";
import CustomInput from '../../../Element/CustomInput'
import './index.css'
import { useState } from "react";
import AppConfig from "../../../../constants/AppConfig";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import SucessMsg from "../../../../SucessMsg";


const DrivingLicense = () => {
    const [licenceNum, setLicenceNum] = useState("")
    const [isSuceess, setIsSuceess] = useState(false)
    const [dob, setDob] = useState("")
    const Navigate = useNavigate();
    const BASE_URL = AppConfig.API_BASE_URL

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
            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            if (data.status === 200) {
                setIsSuceess(true)
                localStorage.setItem("isLicence", true)
                setTimeout(() => {
                    setIsSuceess(false)
                    Navigate("/user-detail")
                }, 2000);
            } else {
                alert("try again")
            }
            console.log("suceess adhar", data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <nav className='navber nav-width'>
                <Link to="" className='nav-link'>CarRentZone</Link>
            </nav>
            <div className="license-frame">

                {isSuceess && (
                    // <div className="popup w3-animate-top">
                    //     <span class="popuptext" id="myPopup">Done 👍!</span>
                    // </div>
                    <SucessMsg  message={"Done 👍!"}/>
                )}
                <Link to="/user-detail" className="upload"><img src="myImage/arrow back.svg" alt="" /></Link>
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
        </>
    )
}
export default DrivingLicense; 