import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { fileChange } from "../services/fileChange";
import styled from "styled-components";

const EditProfile = () => {
  const [updatedUser, setupdatedUser] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const { user, storeToken, authenticateUser } = useContext(AuthContext)

  let navigate = useNavigate();

  const handleFileUpload = (e) => {
    setDisabled(true)
    fileChange(e)
      .then((res) => {
        setupdatedUser((prev) => ({ ...prev, imageUrl: res.data.image }))
        setDisabled(false)
      })
      .catch((err) => {
        console.log("Error uploading photo", err)
      })

  };

  const handleChange = (e) => {
    setupdatedUser((prev) => ({...prev, [e.target.name]: e.target.value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    post(`/users/edit-profile-without-picture`, updatedUser)
      .then((res) => {
        storeToken(res.data.authToken)
        authenticateUser()
        navigate("/profile")
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    if (user) {
      setupdatedUser(user)
    }
  }, [user])

  return (
    <PageContainer>
      <FormContainer>
        {updatedUser?.imageUrl && (
          <ProfilePicture src={updatedUser.imageUrl} alt="Profile" />
        )}
        <h1>Edit Profile</h1>
        {updatedUser && (
          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                onChange={handleChange}
                type="text"
                name="name"
                value={updatedUser.username}
              />
            </FormGroup>
            <FormGroup>
              <Label>Location</Label>
              <Input
                onChange={handleChange}
                type="text"
                name="location"
                value={updatedUser.location}
              />
            </FormGroup>
            <FormGroup>
              <Label>Profile Picture</Label>
              <Input type="file" name="imageUrl" onChange={handleFileUpload} />
            </FormGroup>
            <FormGroup>
              <Label>Bio</Label>
              <BioTextarea
                onChange={handleChange}
                name="bio"
                value={updatedUser.bio}
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                onChange={handleChange}
                type="text"
                name="email"
                value={updatedUser.email}
              />
            </FormGroup>
            <Button disabled={disabled} type="submit">
              Update Profile
            </Button>
          </StyledForm>
        )}
        <DeleteButton onClick={() => navigate("/delete-profile")}>
          Delete Profile
        </DeleteButton>
      </FormContainer>
    </PageContainer>
  );
};

export default EditProfile;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0.2, 0.2, 0.2, 0.2);
  padding: 30px;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const ProfilePicture = styled.img`
  position: absolute;
  top: 14%;
  right: 12%;
  height: 20%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;

   @media (max-width: 768px) {
    top: 10%;
    right: 25%;
    transform: translateX(50%);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BioTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  resize: none;
  outline: none;
  overflow: hidden;
  &:focus {
    border-color: #007bff;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
  width: 100%;
  textarea {
    min-height: 40px;
    max-height: 200px;
    line-height: 1.4;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 50%;
  height: 4%;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  background: #912d2d;
  margin-top: 20px;
  &:hover {
    background: red;
  }
`;
