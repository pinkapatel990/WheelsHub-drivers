
import React from 'react';
import './index.css'

const SuccessPopup = (props) => {
  return (
    <div className={props.className?props.className:"success-popup"}>
      <div className="success-content">
      <img src="myImage/7efs.gif" alt="" className='imgfile'style={{width:"15rem"}}/>
        <h2>Successful!</h2>
        <p style={{width:"100%"}}>{props.message}</p>
     
      </div>
    </div>
  );
};

export default SuccessPopup;