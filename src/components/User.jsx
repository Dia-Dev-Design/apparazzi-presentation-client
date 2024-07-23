import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { DateTime } from "luxon";

const User = ({user}) => {




  return (
    <div className="userLanding">

    {
      user &&

      <div className="homeContainer">
        <h3>{user.username} </h3>
        <div
          className="profilePhoto"
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
