import { useEffect} from "react";
import { get } from "../services/authService";
// import AppIcon from "../ApparaazziIcon.png";
// <<<<<<< master
// import AppIcon from "../aperature_logo_red.jpg";
// =======
import AppIcon from "../assets/ApparazziIcon_v2.jpg";


const Home = () => {


  return (
    <div className="homeLanding">
      <div className="homeContainer">


        <div className="searchInfo">
          <div>
            <p className="searchText">Search</p>
            <form className="searchBar1">
              <button className="searchBarButton">🔍</button>
              <input className="searchBarInput" placeholder="Who are you looking for?" />
            </form>
          </div>

          {/* <div>
            <p className="searchText">Location</p>
            <form className="searchBar2">
              <button className="searchBarButton">🔍</button>
              <input className="searchBarInput" placeholder="City or zip code" />
            </form>
          </div> */}
        </div>

        <br/>
        
        <h1 className="homeText">Welcome to</h1>
        <img className="homeIcon" src={AppIcon} alt="apparazziIcon" />
        <h2 className="homeText">Where anyone can be a Paparazzi!</h2>

      </div>
    </div>
  );
};

export default Home;