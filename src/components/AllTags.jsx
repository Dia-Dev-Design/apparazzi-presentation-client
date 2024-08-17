import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { get } from "../services/authService";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Photo from "./Photo";
import TheseTags from "./TheseTags";

import tagIcon from "../assets/AppStar.png";

const AllTags = ({ children, allTags, paramsId }) => {
  let myIcon = L.icon({
    iconUrl: tagIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photos, setPhotos] = useState([]);

  const [map, setMap] = useState({
    lat: 25.80051750601982,
    lng: -80.19831072619859,
    zoom: 13,
  });

  const popupRef = useRef();

  const closePopup = () => {
    if (popupRef.current) {
      popupRef.current._closeButton.click();
    }
  };

  const fetchPhotos = () => {
    get(`/photos/${paramsId}/tag`)
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPhotos();
    window.scrollTo(0, 0);

    // map.closePopup(popUpRef)
  }, [allTags, paramsId]);

  return (
    <div>
      {/* <p>This is TagDetails</p> */}

      <h2>#{paramsId}</h2>

      {children}

      <div id="mapid">
        <MapContainer
          className="mapContainer"
          id={"tagMap"}
          center={[map.lat, map.lng]}
          zoom={map.zoom}
          style={{ width: "90%", height: "80vh" }}
        >
          <TileLayer
            attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {photos.map((spot) => {
            const point = [spot.latitude, spot.longitude];

            return (
              point[0] && (
                <Marker icon={myIcon} position={point} key={spot["_id"]}>
                  <Popup ref={popupRef}>
                    <span onClick={closePopup}>
                      <TheseTags photo={spot} />
                    </span>

                    <br />
                    <span>
                      <Link to={`/${spot._id}/details`}>Details</Link>
                    </span>
                    <br />
                    <img
                      src={spot.imageUrl}
                      alt="testimage"
                      className="previewImage"
                    />
                  </Popup>
                </Marker>
              )
            );
          })}
        </MapContainer>
      </div>

      <div>
        <div className="columnated">
          {[...photos].reverse().map((photo) => {
            return (
              <div className="direction" key={photo._id}>
                <Photo photo={photo} className={"imageGroup"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllTags;
