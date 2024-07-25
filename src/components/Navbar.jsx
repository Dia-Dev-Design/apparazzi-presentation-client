import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import AppIcon from "../assets/ApparazziIcon_v2.jpg";
import UserIcon from "../assets/user.png";
import SubmitIcon from "../assets/add_image.png";
import NotificationIcon from "../assets/notification.png";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const { logOutUser } = useContext(AuthContext)

    let token = localStorage.getItem("authToken");

  return (
    <div className="navbar">
    <header className="nav-wrapper">
      <div className="navIconContainer">
        <Link to="/" className="navIconImage">
          <img className="navIcon" src={AppIcon} alt="appIcon" />
        </Link>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
      </div>

      {token ? (
        <nav className={`nav-items ${menuOpen ? "show" : ""}`}>
          <Link to="/" className="icon">
            Home
          </Link>
          {/* <Link to="/leaderboard" className="icon">
            LeaderBoard
          </Link> */}
          {/* <Link to="/about" className="icon">
            About
          </Link> */}
          <Link to="/allPhotos" className="icon">
            All Photos
          </Link>
          <Link to="/tags" className="icon">
            Tags
          </Link>
          <Link to="/submit-photo" className="icon">
            Submit (fiximage)
            <img className="navbarIcon" src={SubmitIcon} alt="SubmitIcon" />
          </Link>
          <Link to="/profile" className="icon">
            Profile (fiximage)
            <img className="navbarIcon1" src={UserIcon} alt="UserIcon"  />
          </Link>
          <Link to="/notifications" className="icon">
            Notifications (fiximage)
            <img
              className="navbarIcon2"
              src={NotificationIcon}
              alt="NotificationIcon"
            />
          </Link>
          <button onClick={logOutUser} className="navButton">
            Logout
          </button>
        </nav>
      ) : (
        <nav className={`nav-items ${menuOpen ? "show" : ""}`}>
          <Link to="/" className="icon">
            Home
          </Link>
          <Link to="/inventory" className="icon">
            Inventory
          </Link>
          <Link to="/about" className="icon">
            About
          </Link>
          <button className="navButton">
            <Link to="/login">Log In</Link>
          </button>
          <button className="navButton">
            <Link to="/signup">Sign Up</Link>
          </button>
        </nav>
      )}
    </header>
  </div>
  )
}

export default Navbar