import React from 'react'
import '../index.css'
import FetchApi from '../../../../constants/FetchApi'
// import React, { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TopBener() {
    const [isToken, setIsToken] = useState(false)

    const checkAuthuser = async () => {
        try {
            const res = await FetchApi("check-auth-phone", "", {
                method: "GET",
            })
            if (res.status === 200) {
                setIsToken(true)
            }
            console.log("my res ==>", res);
        } catch (error) {
            console.log("check auth user", error);
        }
    }
    useEffect(() => {
        checkAuthuser()
    })
    return (
        <>
            <div className="main-banner" >
                <video id="background-video" autoPlay muted loop >
                    <source src="myImage/video1.mp4" type="video/mp4" />
                </video>
                <div className='video-overlay header-text'>
                    <div className='caption'>
                        <h1>Drive When You <br />Want, Make What You Need</h1>
                        <h2>
                            <em>Earn on your own schedule</em>
                        </h2>
                        <div className='main-button'>
                            {isToken ?
                                <button className='get-start-btn'>
                                    <Link to="/dashboard">Get Started</Link>
                                </button>
                                :
                                <button className='get-start-btn'>
                                    <Link to="/sign-up">Get Started</Link>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
