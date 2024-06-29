import Custominput from '../../../Element/CustomInput'
import Customlabel from '../../../Element/Customlabel'
import './index.css'
import { useState } from 'react'
import FetchApi from '../../../../constants/FetchApi'
import SuccessPopup from '../../../SucessPopup'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const EnterName = () => {
    const navigate = useNavigate();

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)

    const phoneNumber = localStorage.getItem("phone");
     
    //   console.log("phone ==>",phone);

    const handelerFormSubmit = async (e) => {
        try {
            e.preventDefault()
            if (lname.length === 0 || fname.length === 0) {
                setError(true)
            } else {

                const userData = new FormData();
                userData.append("phone", phoneNumber);
                userData.append("fname", fname);
                userData.append("lname", lname)
                console.log("user details==>", userData);
                if (userData) {

                    const res = await fetch("http://localhost:8000/api/v1/driver-register", {
                        method: 'POST',
                        body: userData
                    });
                    const data = await res.json();
                    console.log("data user ===>", data);

                    if (data.status === 200) {

                        Cookies.set('jwt', data.token, { expires: 1 })
                        setSucess(true)
                        setTimeout(() => {
                            setSucess(false)
                            navigate('/user-detail');
                        }, 2000);
                    }
                }else{
                    alert("something  wrong")
                }
            }
            setLname("")
            setFname("")
        } catch (error) {
            console.log("the error", error);
        }
    }
    return (
        <>
            <div className="frame-number">
                .
                <div className='frame-content'>
                    <h2>User Detail</h2>
                    {sucess && (

                        <SuccessPopup message="All right" />
                    )}
                    <div className='input-frame'>
                        <Customlabel >First Name</Customlabel>
                        <Custominput
                            className="input-name"
                            placeholder="Fisrt Name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        <label className='errorMsg'>
                            {error && fname.length === 0 ? (
                                "Enter First Name"
                            ) : ""}
                        </label>


                        <Customlabel >Last Name</Customlabel>
                        <Custominput
                            className="input-name"
                            placeholder="Last Name"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                        <label className='errorMsg'>
                            {error && lname.length === 0 ? (
                                "Enter Last Name"
                            ) : ""}
                        </label>
                        <button className='btn-next' onClick={handelerFormSubmit}>Next</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default EnterName