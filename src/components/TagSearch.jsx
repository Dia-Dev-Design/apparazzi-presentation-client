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
    <form onSubmit={handleSubmit}>
      <label>Search #</label>
      <input    
        className="searchBarInput"     
        onChange={handleChange}
        type="text"
        name="search"
        value={query}
        placeholder="Who are you looking for?"
      />
      <button type="button" onClick={handleSubmit}>
        Find Tag
      </button>
    </form>
  );
};

export default TagSearch;
