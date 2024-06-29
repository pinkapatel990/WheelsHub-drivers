
// import { Route ,Switch} from 'react-router-dom/cjs/react-router-dom.min';
// import { Routes } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './Navbar';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Pages/Home';
import ShareCars from './component/Pages/ShareCars';
import TopNavbar from './TopNavbar'
import SignWith from './component/Pages/LoginDetails/SignWith';
import Phone from './component/Pages/LoginDetails/Phone';
import Otp from './component/Pages/LoginDetails/Otp';
import EnterName from './component/Pages/LoginDetails/EnterName';
import UserDetail from './component/Pages/LoginDetails/UseDetail';
import ProfilePhoto from './component/Pages/LoginDetails/ProfilePhoto';
import AadharCard from './component/Pages/LoginDetails/AadharCard';
import DrivingLicense from './component/Pages/LoginDetails/DrivingLicense';
import PanCard from './component/Pages/LoginDetails/PanCard';
import Inbox from './component/Pages/Inbox';
import YourCars from './component/Pages/YourCars';
import Dashboard from './component/Pages/Dashboard';
import Income from './component/Pages/Income';
import Account from './component/Pages/Account';


function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Router>
        {/* <div style={{ display: "flex" }}> */}
          {/* <div>

<Navbar />
</div> */}
          <div>
            <Routes>
              <Route path="/sign-up" element={<SignWith />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/share-car" element={<ShareCars />} />
              <Route path="/register-number" element={<Phone />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/User-name" element={<EnterName />} />
              <Route path="/user-detail" element={<UserDetail />} />
              <Route path='/profile-photo' element={<ProfilePhoto />} />
              <Route path='/aadhar-card' element={<AadharCard />} />
              <Route path="/driving-license" element={<DrivingLicense />} />
              <Route path="/pan-card" element={<PanCard />} />
              <Route path="/inbox" element={<Inbox/>}/>
              <Route path="/your-cars" element={<YourCars/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path='/income' element={<Income/>}/>
              <Route path='/account-driver' element={<Account/>}/>
              
            </Routes>
          </div>
        {/* </div> */}

        {/* </BrowserRouter> */}
      </Router>
    </>
  );
}

export default App;
