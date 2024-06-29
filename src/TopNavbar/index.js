import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import FetchApi from '../constants/FetchApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TopNavbar() {
  const Navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [isToken, setIsToken] = useState(false)

  const cookieToken = Cookies.get('jwt')
  console.log("token", cookieToken);
  const handlerCheckUserAuth = async () => {
    try {
      if (cookieToken) {
        const myRes = await FetchApi("check-auth-phone", "", {
          method: "GET",

        })
        console.log("my res ==>", myRes);
        if (myRes.status === 200) {
          setIsToken(true)
          setUsername(myRes.username)
        }

      }
    } catch (error) {
      console.log(error);
    }
  }
  const handlerLogout = async () => {
    try {
      if (cookieToken) {
        const myRes = await FetchApi("logout-driver", "", {
          method: "GET"
        })
        console.log(myRes);
        if (myRes.status === 200) {
          setIsToken(false)
          Cookies.remove("jwt")
          Navigate("/home")
        }

      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handlerCheckUserAuth()
  })
  return (
    <>
      <nav fixed="top" className='navbar-fixed-top'>
        {/* <div class="navbar  navbar-expand-lg navbar-light bg-light" fixed="top">
          <div className='item-list'>

            <div className="nav-title title-top">
              WheelsHub
            </div>
            <div style={{ display: "flex" }} className='contact'>
              <div >
                <img src="myImage/call-logo.png" alt="" style={{ width: "30px" }} />
              </div>
              <div className='mx-2'>
                <h6>contact-us</h6>
                0261-251 425 854
              </div>
            </div>
          </div>
          
        </div> */}
        
        <div class="nav" style={{ marginTop: "0%" }}>
          <input type="checkbox" id="nav-check" />
          <div className='nav-title'>
          </div>

          <div class="nav-btn">
            <label for="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div class="nav-links" style={{ display: "flex", fontFamily: "Times New Roman" }}>
            <ul>

            </ul>
            <Link to="/home" >Dashbord</Link>
            <Link to="/About">AboutUs</Link>
            <Link to="/ContectUs" >ContectUs</Link>
            {username && (

              <div class="dropdown">
              <button class="dropbtn">{username}</button><img src="myImage/p2.png" alt="" style={{width:"2rem"}}/>
              <div class="dropdown-content">
                <Link href="#" onClick={handlerLogout}>LogOut</Link>
              
              </div>
            </div>
              )} 


          </div>
        </div>
      </nav>

      {/* <nav class="navbar">
        <div class="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Category</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Testimonial</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <h1 class="logo">Navbar</h1>
        </div>
      </nav> */}
    </>
  );
}

export default TopNavbar;