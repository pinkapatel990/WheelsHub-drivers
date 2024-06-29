import { Link } from "react-router-dom";
import './index.css'
import Customlabel from "../../../Element/Customlabel";
import Custominput from "../../../Element/CustomInput";
import AppConfig from "../../../../constants/AppConfig";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SucessMsg from "../../../../SucessMsg";

const PanCard = () => {
    const Navigate = useNavigate();
    const BASE_URL = AppConfig.API_BASE_URL;
    const [isSuceess, setIsSuceess] = useState(false);
    const [panNumber, setPanNumber] = useState("")

    const handlerPanNumber = async () => {
        try {
            const token = Cookies.get("jwt")
            const formData = new FormData()
            formData.append('panNumber',panNumber)
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
                localStorage.setItem("isPanNumber", true)
                setTimeout(() => {
                    setIsSuceess(false)
                    Navigate("/user-detail")
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
                <Link to="" className='nav-link'>CarRentZone</Link>
            </nav>
            <div className="main-frame">
                {isSuceess &&(
                    <SucessMsg message={"Done 👍!"}/>
                )}
                <Link to="/user-detail" className="back-page"><img src="myImage/arrow back.svg" alt="" /></Link>
                <h2>Let's find your PAN card number </h2>
                <img src="myImage/panCard.png" alt="not Found" className="img-pan" />
                <div className="input-pan">
                    <Customlabel>PAN Number</Customlabel>
                    <Custominput
                        placeholder="ABCCD1234Z"
                        className="input-num"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                    ></Custominput>
                </div>
                <button className="pan-btn" onClick={handlerPanNumber}>Submit</button>
            </div>
        </>
    )
}
export default PanCard;