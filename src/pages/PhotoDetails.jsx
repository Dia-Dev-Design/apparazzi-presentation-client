import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { post, get } from "../services/authService";
import { useNavigate } from "react-router-dom";

import { MapContainer, useMap } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import TheseTags from "../components/TheseTags";
import { Link } from "react-router-dom";
import L from "leaflet";

import Photo from "../components/Photo";

import tagIcon from "../assets/AppStar.png";

const PhotoDetails = () => {
  let myIcon = L.icon({
    iconUrl: tagIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [map, setMap] = useState({
    lat: 0,
    lng: 0,
    zoom: 13,
  });

  const params = useParams()

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const getView = () => {
    return [photo.latitude, photo.longitude]
  }

  const getPhoto = () => {
    get(`/photos/${params.id}/details`)
      .then((res) => {
        console.log("This is the photo", res.data);
          setPhoto(res.data.result);
          console.log("Hitting line 50!!!!!!", res.data.result)
          setMap((prev) => ({...prev, ["lat"]: res.data.result.latitude, ["lng"]: res.data.result.longitude}))
      })
      .catch((err) => console.log(err))
  };

  const deletePhoto = () => {
    post(`/photos/${params.id}/delete`)
      .then((res) => {
        console.log("Delete Response =====>", res.data.message);
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  const update = (newComment) => {
    post(`/comments/${params.id}/add-comment`, newComment)
      .then((results) => {
        getPhoto();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(comment);
    setComment({
      comment: "",
    });
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <div className="detailContainer">
      {photo && (
        <>
          <div className="photoDetailContainer">
            <Photo
              photo={photo}
              className={"detailPhoto"}
              altClassName={"altClassName"}
            />
          </div>

          <div className="detailContent">
            <div className="deleteButton">
              {photo && photo.contributor && user && user._id === photo.contributor._id && (
                <button onClick={deletePhoto}>Delete Photo</button>
              )}
            </div>

            <br />

            <div className="commentsBlock">
              <p>{photo.description}</p>

              <br />

              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="comment"
                    value={comment.comment}
                  />

                  <button type="sumbit">Add Comment</button>
                </form>
              </div>

              <br />

              <h4>Comments: </h4>

              {photo.comments &&
                photo.comments.map((comment) => {
                  return (
                    <p key={comment._id}>
                      <span style={{ fontWeight: "bold" }}>
                        {comment.user.username}
                      </span>
                      : {comment.comment}{" "}
                    </p>
                  );
                })}
            </div>
          </div>

          <div>
            {photo.latitude && (
              <div id="mapid">
                <MapContainer
                  id={"tagMap"}
                  center={getView()}
                  zoom={map.zoom}
                  style={{ width: "90%", height: "80vh" }}
                  className="mapContainer"
                >
                  <TileLayer
                    attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    icon={myIcon}
                    position={getView()}
                    key={photo["_id"]}
                  >
                    <Popup>
                      <span>
                        <TheseTags photo={photo} />
                      </span>
                      <br />
                      <span>
                        <Link to={`/${photo._id}/details`} onClick={() => window.scrollTo(0,0)}>Details</Link>
                      </span>
                      <br />
                      <img
                        src={photo.imageUrl}
                        alt="previewImage"
                        className="previewImage"
                      />
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoDetails;
