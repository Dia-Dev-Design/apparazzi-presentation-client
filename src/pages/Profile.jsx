import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import Photo from "../components/Photo";
import User from "../components/User";

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
    <div className="theProfile">
      <h2>Your Profile</h2>

      {user && <User user={user} />}

      <Link to="/edit-profile">Edit Profile</Link>


        {
           photos.length ? 
        

      <div className="columnated">
                {photos.map((photo) => {
                return (
                  <div className="direction" key={photo._id}>
                    <Photo photo={photo} className={"imageGroup"} />
                  </div>
                );
              })}
      </div>



          : <p>No photos yet.</p>

        }
    </div>
  );
};

export default Profile;
