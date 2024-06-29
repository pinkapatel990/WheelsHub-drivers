import './index.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2';
import { auth } from '../../../../firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import AppConfig from '../../../../constants/AppConfig';
import Cookies from 'js-cookie';

const Phone = () => {
    const BASE_URL = AppConfig.API_BASE_URL
    const Navigate = useNavigate()
    const [OTP, setOTP] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [ph, setPh] = useState("")
    const [loading, setLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [user, setUser] = useState("")
    const [error, setError] = useState(false)

    const onCaptchverify = () => {

        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSignup()
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        });
    }
    function onSignup(e) {
        e.preventDefault()
        try {
            let value = e.target.value;
            // console.log(value);
            if (!ph) {
                setError(true)
            } else {
                setError(false)
                setLoading(true)
                onCaptchverify()
                const appVerifier = window.recaptchaVerifier
                const formatph = '+' + ph
                signInWithPhoneNumber(auth, formatph, appVerifier)
                .then((confirmationResult) => {
                    
                    window.confirmationResult = confirmationResult;
                    setShowOTP(true)
                    toast.success('OTP sended success')
                }).catch((error) => {
                    console.log(error);
                    setLoading(false)
                });
                

            }
        } catch (error) {
            console.log(error);
        }

    }


    const onOTPVerify = async (e) => {

        setVerifyLoading(true);
        hanlderApi();

        window.confirmationResult.confirm(OTP).then(async (result) => {
            console.log("y result ===>", result)
            const user = result.user;

            setUser(result.user);
            console.log("event");

        }).catch((error) => {
            console.log(error);
            setVerifyLoading(false)
        });


    }
    const hanlderApi = async (e) => {
        try {
            const phoneNumber = ph.slice(2)
            console.log("my phone ", phoneNumber);
            if (phoneNumber) {

                localStorage.setItem("phone", phoneNumber)
                const res = await fetch(BASE_URL + "login-user", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ phone: phoneNumber })
                });
                const data = await res.json()
                console.log("My response", data);
                if (data.status === 200) {
                    console.log("Sucess");
                    Cookies.set("jwt", data.token, { expires: 7 })
                    setTimeout(() => {
                        
                        Navigate("/user-detail")
                    }, 3000);
                } else {
                    Navigate("/user-name")
                }
            }
        } catch (error) {
            console.error("API call error:", error);
        }
    }
    // hanlderApi()
    return (
        <>
            <div className="frame-number" id='frame-main'>
                <div className='frame-content'>
                    <Link to="/sign-up"><img src="myImage/arrow back.svg" alt="" /></Link>
                    {user && (
                        <div className="alert alert-success" role="alert">
                            Succefully Verify Number.
                        </div>
                    )}
                    {user ? (
                        <div className="alert alert-success" role="alert">
                            Succefully Verify Number.
                        </div>
                    ) : (
                        <div>
                            {!showOTP ?
                                <div>
                                    <h3>Enter your phone number</h3>
                                    <p className='subtitle'>This number will be used to contact you and
                                        comminucate all ride related details.</p>
                                    <div style={{ display: "flex" }} className='fleg-dial'>


                                        <Toaster toastOptions={{ duration: 4000 }} />
                                        <div id="recaptcha-container"></div>
                                    </div>


                                    <PhoneInput
                                        country={"in"}
                                        value={ph}
                                        onChange={setPh}
                                        inputStyle={{
                                            width: '500px',
                                            height: '40px',
                                            fontSize: '14px',

                                        }}
                                        className="btn-phone-input"
                                    ></PhoneInput>
                                    <span style={{ height: "4px" }}>

                                        {error && (
                                            <label className='error'>Enter phone number</label>
                                        )}
                                    </span>
                                    <button className='next-btn' 
                                    // onClick={onSignup}
                                    onClick={hanlderApi}
                                    >
                                        {loading ? (

                                            <div className="spinner-border spinner-border-sm mx-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (

                                            <span className='mx-2'>Send OTP</span>
                                        )}
                                    </button>

                                </div> :
                                <div className='otp-input'>
                                    <label htmlFor="" className='text-style'>
                                        Enter your OTP
                                    </label>
                                    <OTPInput value={OTP}
                                        onChange={setOTP}
                                        autoFocus OTPLength={6}
                                        otpType="number"
                                        disabled={false} />


                                    <button
                                        className='btn-verify'
                                        onClick={onOTPVerify}

                                    >
                                        {verifyLoading ? (
                                            <>

                                                <div className="spinner-border spinner-border-sm mx-2" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </>
                                        ) :

                                            <span>Verify OTP</span>
                                        }
                                    </button>
                                </div>
                            }


                        </div>
                    )}



                </div>

            </div>

        </>
    )
}
export default Phone;