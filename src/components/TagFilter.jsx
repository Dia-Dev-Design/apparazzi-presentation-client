import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../services/authService";
import Photo from "./Photo";
import L from "leaflet";
import { MapContainer, useMap } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import TheseTags from "./TheseTags";

import tagIcon from "../assets/AppStar.png";

const TagFilter = ({ children, allTags, paramsId, setAllTags }) => {
  let myIcon = L.icon({
    iconUrl: tagIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photos, setPhotos] = useState([]);
  const [rawPhotos, setRawPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [points, setPoints] = useState([]);
  const [map, setMap] = useState({
    lat: 25.80051750601982,
    lng: -80.19831072619859,
    zoom: 13,
  });

  const navigate = useNavigate()

  const parseDate = (s) => {
    var b = s.split(/\D/);

    return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]).toLocaleString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
    );
  };

  const fetchPhotos = () => {
    get(`/photos/${paramsId}/tag`)
      .then((res) => {
        const { photos } = res.data;
        photos.sort((a, b) => {
          const regex = /(\d{4}):(\d{2}):(\d{2})/;
          const format = "$1-$2-$3";
          return (
            new Date(a.photographedDate.replace(regex, format)) -
            new Date(b.photographedDate.replace(regex, format))
          );
        });
        setPhotos(photos);
        setRawPhotos(res.data.photos);
      })
      .catch((err) => console.log(err));
  };

  const handleLeftButton = () => {
    if (photoIndex > 0) {
      setPhotoIndex((prev) => prev - 1);
    }
  };

  const handleRightButton = () => {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex((prev) => prev + 1);
    }
  };

  const handleSliderChange = (e) => {
    setPhotoIndex(+e.target.value);
  };

  const getPoints = (photos) => {
    const points = [];
    photos.forEach((spot, index) => {
      points.push([spot.latitude, spot.longitude]);
    });
    setPoints(points);
  };

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
  };

  useEffect(() => {
    console.log("hello")
    fetchPhotos();
    window.scrollTo(0, 0);
  }, [allTags]);
  
  useEffect(() => {
    if (photos.length) {
      console.log("hello")
      getPoints(photos);
    }
  }, [allTags, photos]);

  useEffect(() => {
    window.scrollTo(0, 0);
    navigate(`/${paramsId}/tag`)
    setAllTags((prev) => !prev)
  }, [paramsId])

  return (
    <div>
      {/* <p>This is TagDetails</p> */}
      <div className="slider-container">
        <div className="slider-label-inpt-container">
          <label htmlFor="PhotoLocationTimeSlider" className="slider-label">
            Photo Location Time Slider
          </label>
          <div>
            <button style={{ marginTop: "-5%" }} onClick={handleLeftButton}>
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>&nbsp;&nbsp;</span>
            </button>
            <input
              className="slider-input"
              type="range"
              min="0"
              name="PhotoLocationTimeSlider"
              max={`${photos.length - 1}`}
              value={photoIndex}
              onChange={handleSliderChange}
            />
            <button style={{ marginTop: "-5%" }} onClick={handleRightButton}>
              <span>&nbsp;&nbsp;</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div
          style={{ marginLeft: "5%" }}
          className="slider-filter-label-select-container"
        >
          <label
            htmlFor="PhotoLocationFilterSelector"
            className="slider-filter-label"
          >
            Filter
          </label>
          <select
            name="PhotoLocationFilterSelector"
            className="slider-filter-select"
          >
            <option className="slider-filter-select-option"></option>
            <option className="slider-filter-select-option"></option>
            <option className="slider-filter-select-option"></option>
            <option className="slider-filter-select-option"></option>
          </select>
        </div>
      </div>

      <h2>#{paramsId}</h2>

      {children}

      {photos.length ? (
        <div>
          <p className="description">
            Spotted on {parseDate(rawPhotos[photoIndex].photographedDate)}
          </p>
          {points.length && (
            <p className="description">
              Spotted at: {points[photoIndex][0].toFixed(3)} latitude &{" "}
              {points[photoIndex][1].toFixed(3)} longitude
            </p>
          )}
        </div>
      ) : null}

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

          {points[photoIndex] && photos[photoIndex] && (
            <ChangeView center={points[photoIndex]} zoom={map.zoom} />
          )}

          {points[photoIndex] && photos[photoIndex] && (
            <Marker
              
              icon={myIcon}
              position={points[photoIndex]}
              key={photos[photoIndex]["_id"]}
            >
              <Popup>
                <span>
                  <TheseTags photo={photos[photoIndex]} />
                </span>
                {/* <br /> */}
                <span>
                  <Link to={`/${photos[photoIndex]._id}/details`}>Details</Link>
                </span>
                {/* <br /> */}
                <img
                  src={photos[photoIndex].imageUrl}
                  alt="testimage"
                  className="previewImage"
                />
              </Popup>
            </Marker>
          )}
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

export default TagFilter;
