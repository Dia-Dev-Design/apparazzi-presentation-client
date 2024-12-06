import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import Photo from "../components/Photo";
import User from "../components/User";
import styled from "styled-components";

const Profile = () => {
  
  const [photos, setPhotos] = useState([])

  const { user } = useContext(AuthContext);

  let getPhotos = () => {
    get("/users/my-profile")
      .then((results) => {
        console.log("These are the results", results.data);
        setPhotos(results.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <ProfileContainer>
      <h2>Your Profile</h2>
      {user && <User user={user} />}
      <Link to="/edit-profile">Edit Profile</Link>

      {photos.length ? (
        <PhotoGrid>
          {photos.map((photo) => (
            <PhotoWrapper key={photo._id}>
              <Photo photo={photo} />
            </PhotoWrapper>
          ))}
        </PhotoGrid>
      ) : (
        <p>No photos yet.</p>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-top: 20px;
  padding: 10px;
  @media (max-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PhotoWrapper = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;
