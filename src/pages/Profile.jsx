import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import Photo from "../components/Photo";
import styled from "styled-components";

const Profile = () => {
  const [photos, setPhotos] = useState([])
  const { user, logOutUser } = useContext(AuthContext);

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
      {user && (
        <>
          <Username>@{user.username}</Username>

          <ProfileHeader>
            <ProfilePhoto
              style={{ backgroundImage: `url(${user.imageUrl})` }}
            />
            <UserInfo>
              <p>{user.bio}</p>
            </UserInfo>
            <EditProfileLink to="/edit-profile">Edit</EditProfileLink>
            <LogoutButton onClick={() => logOutUser()}>Logout</LogoutButton>
          </ProfileHeader>
        </>
      )}

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
  padding: 20px;
  position: relative;
`;

const Username = styled.h3`
  position: absolute;
  top: 85px;
  left: 150px;
  font-size: 1.1em;
  font-weight: bold;
  margin: 0;
  color: black;
@media (max-width: 769px) {
    margin-left: 12px;
  }
`;
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: left;
`;

const ProfilePhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid #ddd;
  flex-shrink: 0;
  position: absolute;
  top: 25px;
  left: 25px;
   @media (max-width: 769px) {
    margin-left: 15px;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  margin-left: 32%;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  min-width: 35%;
  max-width: 35%;
  p {
    margin: 5px 0 0;
    font-size: 0.9em;
    display: flex;
    margin-top: 100px;
    color: black;
  }
    @media (max-width: 769px) {
    min-width: 95%;
    max-width: 95%;
    margin-left: 10px;
    margin-top: 40px;
  }
`;

const EditProfileLink = styled(Link)`
  margin-left: auto;
  margin-top: 5%;
  background-color: black;
  border-radius: 6px;
  padding: 5px 23px;
  color: white;
  font-size: 0.9em;

  &:hover {
    text-decoration: underline;
  }
     @media (max-width: 769px) {
    margin-left: -120px;
  }
    @media (max-width: 375px) {
    margin-left: -95px;
    top: -45px;
  }
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
     @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
    @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PhotoWrapper = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const LogoutButton = styled.button`
  z-index: 10;
  position: relative;
  margin-top: 5%;
  margin-right: 1%;
  background-color: white;
  color: black;
  font-size: 0.9em;
  padding: 5px 12px;
  border: none;
  border-radius: 6px;
  border: 1px solid black;
  cursor: pointer;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
    @media (max-width: 769px) {
    right: 90px;
    top: -45px;
  }
    @media (max-width: 400px) {
    right: 90px;
    top: -45px;
  }
`;
