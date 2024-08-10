import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { fileChange } from "../services/fileChange";

const EditProfile = () => {
  const [updatedUser, setupdatedUser] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const { user, storeToken, authenticateUser } = useContext(AuthContext)
 
  let navigate = useNavigate();

  const handleFileUpload = (e) => {
    setDisabled(true)
    fileChange(e)
      .then((res) => {
        console.log("This is the result of the file upload++++++>", res.data)
        setupdatedUser((prev) => ({...prev, ["imageUrl"]: res.data.image}))
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
        console.log("This is the updated use")
        storeToken(res.data.authToken)
        authenticateUser()
        navigate("/profile")
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    if(user) {
      console.log("This is the user =====>", user)
      setupdatedUser(user)
    }
  }, [user])

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <h1>Edit Profile</h1>
        <br />

        <div>

        {
          updatedUser &&

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={updatedUser.username}
            />
            <label>Location</label>
            <input
              onChange={handleChange}
              type="text"
              name="location"
              value={updatedUser.location}
            />
            <label>Profile Picture</label>
            <input
              onChange={handleFileUpload}
              type="file"
              name="imageUrl"
            />
            <label>Bio</label>
            <input
              onChange={handleChange}
              type="text"
              name="bio"
              value={updatedUser.bio}
            />
            <label>Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              value={updatedUser.email}
            />

            {/* phoneNumber */}

            <button disabled={disabled} type="submit">
              Update Profile
            </button>
          </form>


        }
        </div>

        <button onClick={() => navigate("/delete-profile")}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
