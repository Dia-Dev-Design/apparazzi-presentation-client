import { useState } from "react";
import styled from 'styled-components';
import { post } from "../services/authService";
import { newPhoto } from "../services/fileChange";
import { convertGPS } from "../services/convertGPS";
import { returnMapTime } from "../services/time";

const SubmitPhoto = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [photo, setPhoto] = useState({
    description: "",
    tags: "",
    imageUrl: "",
    _id: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleFileUpload = (e) => {
    setDisabled(true);
    const file = e.target.files[0];
    if (!file) return;

    newPhoto(e)
      .then((response) => {
        setPhoto({ ...response.data });
        if (!response.data.photographedDate) {
          setPhoto((prev) => ({ ...prev, photographedDate: returnMapTime() }));
        }
        if (isNaN(response.data.latitude) || isNaN(response.data.longitude)) {
          setPhoto((prev) => ({
            ...prev,
            latitude: convertGPS(response.data.latitude),
            longitude: convertGPS(response.data.longitude),
          }));
        }
        if (!response.data.longitude || !response.data.latitude) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setPhoto((prev) => ({
                  ...prev,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }));
              },
              (error) => {
                console.error("Error getting location:", error);
                setErrorMessage("Cannot submit photo without allowing location.");
              }
            );
          }
        }
      })
      .catch(console.error)
      .finally(() => setDisabled(false));

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/photos/${photo._id}/add-after`, {
      description: photo.description,
      tags: photo.tags.split(",").map(tag => tag.trim().toLowerCase()),
      latitude: photo.latitude,
      longitude: photo.longitude,
      photographedDate: photo.photographedDate,
    })
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalHeader>New Photo</ModalHeader>
        <Form onSubmit={handleSubmit}>
          {!imagePreview && (
            <FileInputLabel htmlFor="fileInput">Choose Photo</FileInputLabel>
          )}
          <FileInput id="fileInput" type="file" onChange={handleFileUpload} />
          {imagePreview && (
            <ContentWrapper>
              <InputWrapper>
                <FileInputLabel htmlFor="fileInput">Choose Photo</FileInputLabel>
                <Label>Description</Label>
                <Input type="text" name="description" onChange={(e) => setPhoto({ ...photo, description: e.target.value })} value={photo.description} />
                <Label>Tags</Label>
                <Input type="text" name="tags" onChange={(e) => setPhoto({ ...photo, tags: e.target.value })} value={photo.tags} />
                <Button type="submit" disabled={disabled}>Submit Photo</Button>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              </InputWrapper>
              <ImagePreview src={imagePreview} alt="Preview" />
            </ContentWrapper>
          )}
        </Form>
      </Modal>
    </Overlay>
  );
};

export default SubmitPhoto;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 700px;
  max-width: 90%;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  margin-top: -8px;
  border-bottom: 1px solid lightgrey;
`;

const Form = styled.form`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const Label = styled.label`
  font-size: 1rem;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  position: absolute;
  margin-top: -17px;
  margin-left: 655px;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  max-width: 55%;
  margin-bottom: -10px;
  margin-right: -10px;
  border-radius: 7px;
`;

const FileInputLabel = styled.label`
  display: block;
  width: fit-content;
  padding: 8px 15px;
  margin: 0px auto 20px;
  background-color: lightgrey;
  border-radius: 7px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;
