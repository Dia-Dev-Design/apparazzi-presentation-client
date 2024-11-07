import { useState } from "react";
import styled from 'styled-components';
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { newPhoto } from "../services/fileChange";
import { convertGPS } from "../services/convertGPS";
import { returnMapTime } from "../services/time";

const SubmitPhotoContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    margin-top: 15%;
  }
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1rem;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
`;

const Button = styled.button`
  width: 140px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 8px;
  font-size: 0.9rem;
`;

const ImagePreviewContainer = styled.div`
  margin-left: 15px;
  width: 330px;
  padding: 12px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
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
        space.
      </p>
      <p> Like so: "John Doe, Rocket Launch". Thank you.</p>

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