import AppIcon from "../assets/ApparazziIcon_v2.jpg";

import TagSearch from "../components/TagSearch";

import './Home.css'

const Home = () => {
  return (
    <div className="home-landing">
      <div className="home-container">
      
        <TagSearch />

        {/* <div>
            <p className="searchText">Location</p>
            <form className="searchBar2">
              <button className="searchBarButton">🔍</button>
              <input className="searchBarInput" placeholder="City or zip code" />
            </form>
          </div>
        </div> */}

        <br />

        <h1 className="home-text">Welcome to</h1>
        <img className="home-icon" src={AppIcon} alt="apparazziIcon" />
        <h2 className="home-text">Where anyone can be a Paparazzi!</h2>
      </div>
    </div>
  );
};

export default Home;