import React from 'react'
import '../index.css'

export default function WhyDrive() {
    return (
        <>
            <div>



                <div className='second-contect'>
                    <h1>Why drive with us</h1>
                    <img src="drive.svg" alt="" />
                    <div className='text-content'>

                        <div className='line1 mx-4'>
                            <img src="myImage/calendar.svg" alt="not found" />
                            <h2>Set your own hours</h2>
                            <p>You decide when and how often you drive.</p>
                        </div>

                        <div className='line1 mx-4'>
                            <img src="myImage/money.svg" alt="not found" />
                            <h2>Get paid fast</h2>
                            <p>Weekly payments in your bank account.</p>
                        </div>

                        <div className='line1 mx-4'>
                            <img src="myImage/support.svg" alt="not found" />
                            <h2>Get support at every turn</h2>
                            <p>If there’s anything that you need, you can reach us anytime..</p>
                        </div>

                    </div>

                    <h2 className='join-with-us-heading'>Join With Us</h2>
                    <div className='third-content'>
                        <div className='fleet1'>
                            <img src="myImage/D_Fleet2x.webp" alt="not found" />
                            <h5 className='my-3 texts'>Join a fleet</h5>
                            <p>Find and join a fleet partner and start driving for them using the Uber app.</p>
                        </div>
                        <div className='second-frame'>
                            <img src="myImage/D_Fleet.webp" alt="not found" />
                            <h5 className='my-3 texts'>Become a fleet partner</h5>
                            <p>Start making money. Connect your drivers and upload the required documents to your profile.</p>
                        </div>
                    </div>

                    <div className='main-contants'>
                        <h1>Here's what you need to sign up</h1>
                        <h4 className='todtive'>To drive</h4>
                        <div className='signup-content'>

                            <div className='line1 mx-4'>
                                <img src="myImage/requirement.svg" alt="not found" className='my-3' />
                                <h4>Requirements</h4>
                                <ul>
                                    <li> Be at least 18 year old</li>
                                    <li>Clear a background screening</li>
                                </ul>
                            </div>

                            <div className='line1' style={{ marginLeft: "6rem" }}>
                                <img src="myImage/document.svg" alt="not found" className='my-3' />
                                <h4>Document</h4>
                                <ul>
                                    <li>Valid driver's license</li>
                                    <li>Proof of residency in your city.state or provine </li>
                                    <li>Car documents such as commercial insurance,vehical registration certificate,premit</li>
                                </ul>
                            </div>

                            <div className='line1' style={{ marginRight: "5rem" }}>
                                <img src="myImage/documentCheck.svg" alt="not found" className='my-3' />
                                <h4>Sigup process</h4>
                                <ul>
                                    <li>Submit documents and photo</li>
                                    <li>Provide infomation for a background check</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
