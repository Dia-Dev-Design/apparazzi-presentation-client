import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { newPhoto } from "../services/fileChange";
import { convertGPS } from "../services/convertGPS";

import { returnMapTime } from "../services/time";

const SubmitPhoto = () => {
  const [photo, setPhoto] = useState({
    description: "",
    tags: "",
    imageUrl: "",
    _id: "",
  });

  const [disabled, setDisabled] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  let navigate = useNavigate();

  const handleTextChange = (e) => {
    setPhoto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    setDisabled(true);

    let thisPhoto;

    newPhoto(e)
      .then((response) => {
        thisPhoto = { ...response.data };
        setPhoto({ ...response.data });

        if (!thisPhoto.photographedDate) {
          let time = returnMapTime();

          setPhoto((prev) => ({ ...prev, ["photographedDate"]: time }));
        }

        if (isNaN(thisPhoto.latitude) || isNaN(thisPhoto.longitude)) {
          setPhoto((prev) => ({
            ...prev,
            ["latitude"]: convertGPS(thisPhoto.latitude),
            ["longitude"]: convertGPS(thisPhoto.longitude),
          }));
        }
        if (!thisPhoto.longitude || !thisPhoto.latitude) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setPhoto((prev) =>({
                  ...prev,
                  ["latitude"]: position.coords.latitude,
                  ["longitude"]: position.coords.longitude,
                }));
              },
              async (error) => {
                console.error('Error getting location:', error);
                setDisabled((prev) => !prev);
                alert("Cannot submit photo without allowing location.")
                setErrorMessage("Cannot submit photo without allowing location.")
                post(`/photos/${thisPhoto._id}/delete`, null)
                  .then(() => {
                    setTimeout(() => {
                      navigate('/profile')
                    }, 2000)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            );
          } 
        }
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
        setDisabled((prev) => !prev);
      })
      .finally(() => {
        setDisabled((prev) => !prev);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is the photo 73 73 73 ===>", photo);
    console.log(
      "These are tags ======>",
      photo.tags.split(" ").join("").toLowerCase().split(",")
    );

    post(`/photos/${photo._id}/add-after`, {
      description: photo.description,
      tags: photo.tags.split(" ").join("").toLowerCase().split(","),
      latitude: photo.latitude,
      longitude: photo.longitude,
      photographedDate: photo.photographedDate,
    })
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form onSubmit={handleSubmit}>
          <label>
            New Photo
            <input onChange={handleFileUpload} type="file" name="imageUrl" />
          </label>

          <br />

          <label>
            Description
            <input
              onChange={handleTextChange}
              type="text"
              name="description"
              value={photo.description}
            />
          </label>

          <br />

          <label>
            Tags
            <input
              onChange={handleTextChange}
              type="text"
              name="tags"
              value={photo.tags}
            />
          </label>

          <p>
            When submitting photo tags, please seperate them by a comma and a
            space. Like so: "John Doe, Rocket Launch". Thank you.
          </p>

          <button disabled={disabled} type="sumbit">
            Submit Photo
          </button>
        </form>
          {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SubmitPhoto;
