import './index.css'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Custominput from '../../Element/CustomInput';
import Customlabel from '../../Element/Customlabel';
import FetchApi from '../../../constants/FetchApi';
import AppConfig from '../../../constants/AppConfig';
import SuccessPopup from '../../SucessPopup';
import { useNavigate } from 'react-router-dom';


function ShareCars() {

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("")
  const [peddingCount, setPeddingCount] = useState()

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };



  const handleSidebarToggle = () => {
    setIsSidebarActive(prevState => !prevState);
  };
  const handleCheckAuth = async () => {
    try {
      const data = await FetchApi("check-auth-phone", "", {
        method: "GET"
      })
      if (data.status === 200) {
        setUserName(data.username)
        localStorage.setItem("userName", data.username)
      }

      const res = await FetchApi("driver-req-status", "", {
        method: "GET"
      })
      const statusCounter = res.data;
      console.log(statusCounter);
      if (statusCounter.pending > 0) {
        setPeddingCount(statusCounter.pending)
      }
      console.log("my pedding");

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleCheckAuth()
  }, [])

  const Navigator = useNavigate()
  const BASE_URL = AppConfig.API_BASE_URL
  const [imagePreviews, setImagePreviews] = useState(Array(5).fill(null));
  const [carName, setCarName] = useState("Honda")
  const [exteriorColor, setExteriorColor] = useState("Grey")
  const [interiorColor, setInteriorColor] = useState("Black")
  const [makeYear, setMakeYear] = useState("2023-11-03")
  const [registerYear, setRegisterYear] = useState("2023-11-05")
  const [fuelType, setFuelType] = useState("Petrol ")
  const [trasmission, setTrasmission] = useState("Manually")
  const [city, setCity] = useState("Surat")
  const [admidName, setAdmidName] = useState("")
  const [schedule, setSchedule] = useState("")
  const [vehicalNo, setVehicalNo] = useState("AS48FD2516")
  const [seats, setSeats] = useState("")
  const [phone, setPhone] = useState("8569427513")
  const [images, setImages] = useState([])
  const [isSuceess, setIsSuceess] = useState(false)

  const handleImageChange = (index, event) => {
    const file = event.target.files;
    const reader = new FileReader();
    const selectedImages = Array.from(event.target.files);
    var clonesImages = images.slice();
    clonesImages.push(event.target.files[0]);
    console.log("My clonesImages ==>", clonesImages)
    setImages(clonesImages);
    if (file) {
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      // const newInputValues = [...inputValues];
      // console.log("my image data", inputValues);

      reader.readAsDataURL(file[0]);
      console.log("file name", file.name);
      // newInputValues[index] = file.name;
    }
  };
  const handleUserName = async () => {
    try {
      const data = await FetchApi("check-auth-phone", "", {
        method: "GET"
      })
      // console.log("use res",data)
      if (data.status === 200) {
        setAdmidName(data.username)
        setPhone(data.userData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleUserName()
  }, [])



  const handlerFromSubmit = async (e) => {

    try {
      e.preventDefault()
      console.log("my form");
      const user = localStorage.getItem("userName");
      // setAdmidName(user)
      const carDetails = new FormData();
      carDetails.append("carName", carName);
      carDetails.append("schedule", schedule);
      carDetails.append("exteriorColor", exteriorColor);
      carDetails.append("interiorColor", interiorColor);
      carDetails.append("makeYear", makeYear);
      carDetails.append("registerYear", registerYear);
      carDetails.append("fuelType", fuelType);
      carDetails.append("city", city);
      carDetails.append("trasmission", trasmission)
      carDetails.append("vehicalNo", vehicalNo);
      carDetails.append("phone", phone);
      carDetails.append("seats", seats);
      // carDetails.append("admidName",user)
      images.forEach((image, index) => {
        carDetails.append(`image`, image);
      });
      console.log("My images ===>", carDetails)

      if (carDetails) {
        try {

          const response = await FetchApi("car-list", carDetails, {
            method: "POST",
            isForm: true
          })
          console.log("currrent error", response);
          // const data = await response.json();

          if (response.status === 200) {
            setIsSuceess(true)
            setTimeout(() => {
              setIsSuceess(false)
              Navigator("/your-cars")
            }, 1500);
          }
          // console.log("API Response", data);
        }
        catch (error) {
          console.log("post data error", error);
        }

      }
      console.log("my form data ==>", carDetails);
    } catch (error) {
      console.log("error in from submit", error);
    }
  }

  return (
    <>
      <div class="wrapper">
        <nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
          <div class="sidebar-header">
          <Link to="/" className="driverTitle"><h2>EasyDrive</h2></Link>
            <h6>Hi {userName}</h6>
          </div>

          <ul class="list-unstyled components">
            <li>
              <Link to="/dashboard"><img src="myImage/house-check.svg" alt="" className='mx-2' /> Dashboard  </Link>
            </li>
            <li className={isSidebarActive ? 'active' : ''}>

              <Link to="/inbox">
                <img src="myImage/envelope.svg" alt="" className='mx-2' />
                Inbox
                {peddingCount && (<span className='booking-count'> {peddingCount}</span>)}
              </Link>
            </li>

            <li>
              <Link to="/share-car"><img src="myImage/share-fill.svg" alt="" className='mx-2' />Share Cars</Link>
            </li>
            <li>
              <Link to="/your-cars"><img src="myImage/car-front-fill.svg" alt="" className='mx-2' />Your Vahicals</Link>
            </li>
            <li>
              <Link to="/income"><img src="myImage/coin.svg" alt="" className='mx-2' />income</Link>
            </li>
            <li>

              <Link to="/account-driver"><img src="myImage/person-fill.svg" alt="" className='mx-2' />Account</Link>

            </li>
            <li>
              <Link to="/login"><img src="myImage/box-arrow-in-right.svg" alt="" className='mx-2' />LogOut</Link>
            </li>

          </ul>

        </nav>

        <div id="content">
          <nav className="navbar navbar-expand-lg  bg-light container-fluid"  >
            <div class="">
              <button type="button"
                onClick={handleSidebarToggle}
                id="sidebarCollapse"
                className={`navbar-btn ${isSidebarActive ? 'active' : ''}`}
              >
                <span></span>
                <span></span>
                <span></span>

              </button>
            </div>
            
          </nav>

          <div className="container-fluid">
            <div className='main-car-contact'>
              <h3 className='head'>Share Your Cars With Us</h3>
              <div className=''>
                {isSuceess && (
                  <SuccessPopup message={"Sucessfully Upload!👍😊"} />
                )}
                <form action="">
                  <div className='my-frame-form'>
                    <div class="form-group form-field ">
                      <Customlabel>Car Name</Customlabel>
                      <Custominput
                        placeholder="carname"
                        className="input_design"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                      />

                      <Customlabel>Exterioi Colour</Customlabel>
                      <Custominput
                        placeholder="exterioi colour"
                        className="input_design"
                        value={exteriorColor}
                        onChange={(e) => setExteriorColor(e.target.value)}
                      />

                      <Customlabel>Interior Colour</Customlabel>
                      <Custominput
                        placeholder="interior colour"
                        className="input_design"
                        value={interiorColor}
                        onChange={(e) => setInteriorColor(e.target.value)}
                      />

                      <Customlabel>MakeYear Date</Customlabel>
                      <Custominput
                        type="date"
                        className="input_design"
                        style={{ padding: "3rem" }}
                        value={makeYear}
                        onChange={(e) => setMakeYear(e.target.value)}
                      />

                      <Customlabel>RegisterYear Date</Customlabel>
                      <Custominput
                        type="date"
                        className="input_design"
                        value={registerYear}
                        onChange={(e) => setRegisterYear(e.target.value)}
                      />

                      <Customlabel>Price Par Day</Customlabel>
                      <Custominput
                        placeholder="Price"
                        className="input_design"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                      />
                    </div>

                    <div className='form-field2'>
                      <Customlabel>FuelType</Customlabel>
                      <Custominput
                        placeholder="fuel type"
                        className="input_design"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                      />

                      <Customlabel>Trasmission</Customlabel>
                      <Custominput
                        placeholder="tramission"
                        className="input_design"
                        value={trasmission}
                        onChange={(e) => setTrasmission(e.target.value)}
                      />
                      <Customlabel>Vehical Number</Customlabel>
                      <Custominput
                        placeholder="XY00XY0000"
                        className="input_design"
                        value={vehicalNo}
                        onChange={(e) => setVehicalNo(e.target.value)}
                      />
                      <Customlabel>City</Customlabel>
                      <select name=""
                        id=""
                        className='input-control2'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="">select city</option>
                        <option value="Surat">Surat</option>
                        <option value="mumbei">mumbei</option>
                        <option value="Bardoli">Bardoli</option>
                        <option value="Ahembadab">Ahembadab</option>
                      </select>




                      <Customlabel>Seats</Customlabel>
                      <select
                        name=""
                        id=""
                        className='input-control2'
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                      >
                        <option value="">Select Seats</option>
                        <option value="5 Seats">5</option>
                        <option value="6 Seats">6</option>
                        <option value="7 Seats">7</option>
                      </select>

                    </div>
                  </div>
                  <h5 className='img-title'>Image Upload</h5>
                  <div className='image-upload' >

                    <div className='image-line' >
                      {imagePreviews.map((imagePreview, index) => (
                        <div key={index}>
                          <label className="picture" htmlFor={`picture__input_${index}`} tabIndex="0" >
                            <div className="picture__image">
                              {imagePreview ? (
                                <div>
                                  <img src={imagePreview} alt="Uploaded" className="picture__img" />
                                </div>
                              ) : (
                                <>
                                  <div style={{ margin: "0.3rem" }}>
                                    <div>
                                      <center>
                                        <FontAwesomeIcon icon={faUpload} size="2x" />
                                        <p>car image {index + 1}</p>

                                      </center>
                                    </div>

                                  </div>
                                </>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id={`picture__input_${index}`}
                            style={{ display: 'none' }}
                            accept="image/*"
                            multiple
                            onChange={(event) => handleImageChange(index, event)}
                          />

                        </div>
                      ))}
                    </div>
                  </div>
                  <button className='btn-add' onClick={handlerFromSubmit}>Add Car</button>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}


export default ShareCars;