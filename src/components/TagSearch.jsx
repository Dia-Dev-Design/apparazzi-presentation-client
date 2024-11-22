import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './TagSearch.css'

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
    <div className="search-info">
      <div>
      <p className="search-text">Search</p>
      <form className="search-bar-1" onSubmit={handleSubmit}>
        <button className="search-bar-button">🔍</button>
        <input
          className="search-bar-input"
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




