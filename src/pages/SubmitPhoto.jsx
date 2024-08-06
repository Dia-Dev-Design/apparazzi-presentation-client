import { useState } from "react";
import { uploadNewPhoto } from "../services/uploadFileService";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { newPhoto } from "../services/fileChange";

const SubmitPhoto = () => {
  const [photo, setPhoto] = useState({
    description: "",
    tags: "",
    imageUrl: "",
    _id: "",
  });

  const [disabled, setDisabled] = useState(false);

  let navigate = useNavigate();

  const handleTextChange = (e) => {
    setPhoto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    setDisabled(true);

    newPhoto(e)
      .then((response) => {
        setPhoto({...response.data});
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setDisabled(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is the photo ===>", photo)
    console.log("These are tags ======>", photo.tags.split(" ").join("").toLowerCase().split(","))
    post(`/photos/${photo._id}/add-after`, {
      description: photo.description,
      tags: photo.tags.split(" ").join("").toLowerCase().split(","),
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

          <br/>

          <label>
            Description
            <input
              onChange={handleTextChange}
              type="text"
              name="description"
              value={photo.description}
            />
          </label>

          <br/>

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
            When submitting photo tags, please seperate them by a comma and a space. Like so: "John Doe, Rocket Launch". Thank you.
          </p>

          <button disabled={disabled} type="sumbit">
            Submit Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitPhoto;
