import { Link } from "react-router-dom";
import './index.css'
import { useState, useRef } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import AppConfig from "../../../../constants/AppConfig";

const ProfilePhoto = (props) => {
    const Navigate = useNavigate();
    const BASE_URL = AppConfig.API_BASE_URL
    const [image, setImage] = useState(null);
    const [cropData, setCropData] = useState(null);
    const cropperRef = useRef(null);
    const [imageFile, setImageFile] = useState("")
    const [sucess, setSucess] = useState(false)

    const handalerImage = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(file)
        }

        console.log("upload image===>", file);

    }
    const handleCrop = () => {
        if (cropperRef.current) {
            setCropData(cropperRef.current.getCroppedCanvas().toDataURL());
        }
    };
    const token = Cookies.get("jwt")
    const handelImageUpload = async (e) => {
        try {
            const formData = new FormData()
            formData.append('image', imageFile)
            const res = await fetch(BASE_URL + "update-user", {
                method: 'PATCH',
                body: formData,
                headers: {
                    token: token
                }
            })
            const data = await res.json();
            console.log("Api res===>", data);

            if (data.status === 200) {
                // props.onProfileSuccess();
                localStorage.setItem("isProfilePhoto", true)
                setSucess(true)
                setTimeout(() => {
                    setSucess(false)
                    Navigate("/user-detail")
                }, 2000);
            } else {
                alert("try again");
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
            <div className="profile-photo">
                {sucess && (

                    <div className="popup w3-animate-top">
                        <span class="popuptext" id="myPopup">Succefully upload 👍!</span>
                    </div>

                )}

                <Link to="/user-detail" className="upload"><img src="myImage/arrow back.svg" alt="" /></Link>
                <h2>Upload Profile Photo</h2>
                <span>Click Button And Upload Here Your Profile Photo</span>
                <div>
                    {image ?
                        <div>
                            <img src={image} alt="not found" className="image-profile" />
                        </div>
                        :
                        <img src="myImage/avtar.png" alt="not found" className="avtar" />
                    }
                    <div>
                        <label htmlFor="img-upload" className="upload-lable">Upload Photo</label>
                        <input type="File" id="img-upload" style={{ display: "none" }} onChange={handalerImage} />
                    </div>
                    <button className="next-btn-profile" onClick={handelImageUpload}>Next</button>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
export default ProfilePhoto; 