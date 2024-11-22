import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { DateTime } from "luxon";

import './User.css'

const User = ({user}) => {




  return (
    <div className="user-landing">

    {
      user &&

      <div className="home-container">
        <h3>{user.username} </h3>
        <div
          className="profile-photo"
          style={{ backgroundImage: `url(${user.imageUrl})` }}
        ></div>
        <h4>{user.name}</h4>
        <h5>Member since {DateTime.fromISO(user.createdAt).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h5>
        <p>{user.location}</p>
        <p>{user.bio}</p>
      </div>

    }
    </div>
  );
};

export default User;
