import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TagSearch = () => {
  const [query, setQuery] = useState("");

  let navigate = useNavigate();

  let handleChange = (e) => {
    setQuery(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let thisQuery = query.replace(/\s/g, "").toLowerCase();
    navigate(`/${thisQuery}/tag`);
  };

  return (
    <div className="searchInfo">
      <div>
      <p className="searchText">Search</p>
      <form className="searchBar1" onSubmit={handleSubmit}>
        <button className="searchBarButton">🔍</button>
        <input
          className="searchBarInput"
          onChange={handleChange}
          type="text"
          name="search"
          value={query}
          placeholder="Who are you looking for?"
        />
      </form>
      </div>
    </div>
  );
};

export default TagSearch;

// <div className="searchInfo">
//   <div>
//     <p className="searchText">Search</p>
//     <form className="searchBar1">
//       <button className="searchBarButton">🔍</button>
//       <input
//         className="searchBarInput"
//         placeholder="Who are you looking for?"
//       />
//     </form>
//   </div>

//   {/* <div>
//   <p className="searchText">Location</p>
//   <form className="searchBar2">
//     <button className="searchBarButton">🔍</button>
//     <input className="searchBarInput" placeholder="City or zip code" />
//   </form>
// </div> */}
// </div>;



