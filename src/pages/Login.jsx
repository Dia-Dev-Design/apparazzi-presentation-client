
import Username from "../components/Username";
import Password from "../components/Password";
import Email from "../components/Email";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const [errorMessage, setErrormessage] = useState('')

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextInput = (e) => {

    setUser((prev) => ({...prev, [e.target.name]: e.target.value}))

  }

  const submit = (e) => {
    e.preventDefault();

    post("/auth/login", user)
      .then((results) => {
        console.log("These are the results!!! ====>", results.data)
        storeToken(results.data.authToken);
        authenticateUser()
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Something went wrong", err.response.data.message);
        setErrormessage(err.response.data.message)
      });
  }

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form onSubmit={submit}>
          <h1>APPARAZZI</h1>
          <br/>
          <Username handleTextInput={handleTextInput} user={user} />
          <Password handleTextInput={handleTextInput} user={user} />
          <button>Submit</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;