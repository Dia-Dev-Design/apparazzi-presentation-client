import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import Photo from "../components/Photo";
import User from "../components/User";

const Profile = () => {
  const [photos, setPhotos] = useState([])

  const { user } = useContext(AuthContext);
  // const [user, setUser] = React.useState({});

  let getPhotos = () => {
    get("/users/my-profile")
      .then((results) => {
        console.log("These are the results", results.data);
        setPhotos(results.data.foundPhotos);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    // console.log("This is the user", photos.length);
    getPhotos();
  }, []);

  return (
    <div className="theProfile">
      <h2>Your Profile</h2>

      {user && <User user={user} />}

      <Link to="/edit-profile">Edit Profile</Link>

      <div className="columnated">
        {
          photos && photos.length ? 
        
          <>
                {[...photos].reverse().map((photo) => {
                return (
                  <div className="direction" key={photo._id}>
                    <Photo photo={photo} className={"imageGroup"} />
                  </div>
                );
              })}

          </>

          : <p>No photos yet.</p>

        
        
        }
      </div>
    </div>
  );
};

export default Profile;
