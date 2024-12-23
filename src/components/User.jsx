import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { DateTime } from "luxon";
import styled from "styled-components";

const User = ({user}) => {
  return (
    <div className="userLanding">
      {user && (
        <div className="homeContainer">
          <h3>{user.username} </h3>
          <ProfilePhoto style={{ backgroundImage: `url(${user.imageUrl})` }} />
          <h4>{user.name}</h4>
          <h5>
            Member since{" "}
            {DateTime.fromISO(user.createdAt).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
          </h5>
          <p>{user.location}</p>
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default User;

const ProfilePhoto = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  border: 2px solid #ddd;
`;
