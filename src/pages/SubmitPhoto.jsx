import { useState } from "react";
import styled from 'styled-components';
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { newPhoto } from "../services/fileChange";
import { convertGPS } from "../services/convertGPS";
import { returnMapTime } from "../services/time";

const SubmitPhotoContainer = styled.div`
  max-width: 750px;
  margin: 40px auto;
  padding: 15px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
   align-items: center;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const ImagePreviewContainer = styled.div`
  margin-left: auto;
  width: 350px;
  padding: 10px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const SubmitPhoto = () => {
  const [photo, setPhoto] = useState({
    description: "",
    tags: "",
    imageUrl: "",
    _id: "",
  });

  const [disabled, setDisabled] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [imagePreview, setImagePreview] = useState(null);

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

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
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
    })      .then(() => {
      navigate("/profile");
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

return (
  <SubmitPhotoContainer>
    <Form onSubmit={handleSubmit}>
      <Label>
        New Photo
        <Input onChange={handleFileUpload} type="file" name="imageUrl" />
      </Label>

      <br />

      <Label>
        Description
        <Input
          onChange={handleTextChange}
          type="text"
          name="description"
          value={photo.description}
        />
      </Label>

      <br />

      <Label>
        Tags
        <Input
          onChange={handleTextChange}
          type="text"
          name="tags"
          value={photo.tags}
        />
      </Label>

      <p>
        When submitting photo tags, please seperate them by a comma and a
        space. Like so: "John Doe, Rocket Launch". Thank you.
      </p>

      <Button disabled={disabled} type="submit">
        Submit Photo
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
    {imagePreview && (
      <ImagePreviewContainer>
        <ImagePreview src={imagePreview} alt="Image Preview" />
      </ImagePreviewContainer>
    )}
  </SubmitPhotoContainer>
);
};

export default SubmitPhoto;