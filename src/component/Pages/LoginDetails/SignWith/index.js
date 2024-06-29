import './index.css'
import { Link } from 'react-router-dom';


const SignWith = () => {
    return (
        <>
            <div className="maintant-frame">
                <Link to="/" className='backArrow'><img src="myImage/arrow back.svg" alt="" /></Link>
                <div>
                <img src="myImage/p11.jpeg" alt="" className='img-back' />
                <p className='head-title'>Sign up begin your journey with WheelsHub and start  earning</p>

                <Link to="/register-number"><button className='btn-phone'>Continue With phone number</button></Link>
                <div>

                 {/* <button className='btn-google'><img src="myImage/google-logo.svg" alt="" className='mx-3'/><Link to="/">Google</Link></button>    */}
                </div>
                </div>
               

            </div>
        </>
    )
}
export default SignWith;