import { Link } from "react-router-dom";
import { useState } from "react";
import './index.css'
import AppConfig from "../../../../constants/AppConfig";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import SucessMsg from "../../../../SucessMsg";


const AadharCard = () => {
    const Navigate = useNavigate();
    const BASE_URL = AppConfig.API_BASE_URL
    console.log(BASE_URL);
    const [aadharNumber, setAadharNumber] = useState('');
    const [isSuceess,setIsSuceess] = useState(false)

    const handleAadharChange = (e) => {
        // Remove non-numeric characters from the input
        const sanitizedInput = e.target.value.replace(/\D/g, '');

        // Format the Aadhar number with spaces
        const formattedAadhar = sanitizedInput.replace(/(\d{4})/g, '$1 ');

        // Update the state with the formatted Aadhar number
        setAadharNumber(formattedAadhar);
    };
    const handleAadharApi =async () =>{
        try {
            console.log("Aadhar",aadharNumber);
            const token = Cookies.get("jwt")
            const formData = new FormData()
            formData.append('aadharNumber', aadharNumber)
            const res = await fetch(BASE_URL+"update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            if(data.status ===200){
                setIsSuceess(true)
                localStorage.setItem("isAadharNumber",true)
                setTimeout(() => {
                    setIsSuceess(false)
                    Navigate("/user-detail")
                }, 2000);
            }else{
                alert("try again")
            }
            console.log("suceess adhar",data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <nav className='navber nav-width'>
                <Link to="" className='nav-link'>CarRentZone</Link>
            </nav>
            <div className="aadhar-frame">
                {isSuceess&&(
                //     <div className="popup w3-animate-top">
                //     <span class="popuptext" id="myPopup">Succefully upload 👍!</span>
                // </div>
                <SucessMsg message={"Sucess 👍!"}/>
                )}
                <Link to="/user-detail" className="upload"><img src="myImage/arrow back.svg" alt="" /></Link>

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
        </>
    )
}
export default AadharCard;