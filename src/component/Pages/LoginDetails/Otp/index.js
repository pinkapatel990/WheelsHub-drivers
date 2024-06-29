import { Link } from "react-router-dom";
import { useState } from "react";
import './index.css'
import OTPInput from "react-otp-input";


const Otp = () => {
    const [otp, setOtp] = useState('');
    const handleOtpChange = (value) => {
        setOtp(value)
    }
    const renderInput = (inputProps) => (
        <input
            {...inputProps}
            style={{ width: '2rem', height: '2rem', marginRight: '8px', fontSize: '1.5rem', textAlign: 'center' }}
        />
    );
    return (
        <>
            <div className="frame-otp">
                <div className="mid-frame">
                    <Link to="/register-number">
                        <img src="myImage/arrow back.svg" alt="" />
                    </Link>
                    <h3>Enter the OTP sent to 854216452</h3>
                    <OTPInput
                        value={otp}
                        onChange={handleOtpChange}
                        OTPLength={6}
                        renderInput={renderInput}
                        autoFocus
                    />
                    <h5>Resend OTP</h5>
                </div>
            </div>
        </>
    )
}
export default Otp; 