import { useEffect, useState } from "react";
import { get } from "../services/authService";

import Photo from "../components/Photo";
import './AllPhotos.css'

const AllPhotos = () => {
  const [photos, setPhotos] = useState([]);

  
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
  return (
    <div>
      <section className="main">
        <div>
          <div className="wrapper">
            <div className="left-col">
              <div className="post">
                {photos.map((photo) => {
                  return (
                    <div className="post-image" key={photo._id}>
                      <Photo photo={photo} className="scroll-image" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllPhotos;
