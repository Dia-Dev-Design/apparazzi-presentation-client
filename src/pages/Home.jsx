import AppIcon from "../assets/ApparazziIcon_v2.jpg";

import TagSearch from "../components/TagSearch";

const Home = () => {
  return (
    <div className="homeLanding">
      <div className="homeContainer">
      
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

        <h1 className="homeText">Welcome to</h1>
        <img className="homeIcon" src={AppIcon} alt="apparazziIcon" />
        <h2 className="homeText">Where anyone can be a Paparazzi!</h2>
      </div>
    </div>
  );
};

export default Home;
