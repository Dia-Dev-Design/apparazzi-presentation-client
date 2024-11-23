import { useEffect, useState } from "react";
import { get } from "../services/authService";
import Photo from "../components/Photo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AllPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  let navigate = useNavigate();

  let getPhotos = () => {

    get("/photos/all-photos")
      .then((results) => {
        setPhotos(results.data.photos);
      })
    
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let formattedQuery = searchQuery.replace(/\s/g, "").toLowerCase();
    navigate(`/${formattedQuery}/tag`);
  };

  return (
    <div>
      <SearchContainer>
        <FieldContainer>
          <p>Search</p>
          <form onSubmit={handleSearchSubmit}>
            <InputWrapper>
              <SearchIcon>🔍</SearchIcon>
              <InputField
                type="text"
                placeholder="Who are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputWrapper>
          </form>
        </FieldContainer>
        <FieldContainer>
          <p>Location</p>
          <InputWrapper>
            <SearchIcon>🔍</SearchIcon>
            <InputField
              type="text"
              placeholder="City or Zip Code"
              value={location}
              onChange={handleLocationChange}
            />
          </InputWrapper>
        </FieldContainer>
      </SearchContainer>

      <PhotoGrid>
        {photos.map((photo) => (
          <PhotoWrapper key={photo._id}>
            <Photo photo={photo} className="scrollImage" />
          </PhotoWrapper>
        ))}
      </PhotoGrid>
    </div>
  );
};

export default AllPhotos;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  margin-left: 30px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  max-width: 100%;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 6px;
  }
`;

