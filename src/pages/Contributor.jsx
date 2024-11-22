import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { get } from "../services/authService";

import './Contributor.css'

import Photo from "../components/Photo";
import User from "../components/User";

const Contributor = () => {
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState({});

  const params = useParams();

  const getPhotos = () => {
    get(`/photos/${params.id}/contributor`)
      .then((results) => {
        setPhotos(results.data.foundPhotos);
        setUser(results.data.foundUser);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      <h2>{user.username}'s Profile</h2>

      <User user={user} />

      <div className="columnated">
        {[...photos].reverse().map((photo) => {
          return (
            <div className="direction" key={photo._id}>
              <Photo photo={photo} className={"image-group"} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Contributor;
