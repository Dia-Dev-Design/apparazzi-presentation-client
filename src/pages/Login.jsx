
import Username from "../components/Username";
import Password from "../components/Password";
import Email from "../components/Email";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    post("/auth/login", {
      username: username,
      password: password,
    })
      .then((results) => {
        console.log("These are the results!!! ====>", results.data)
        storeToken(results.data.authToken);
        authenticateUser()
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  }

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form onSubmit={submit}>
          <h1>APPARAZZI</h1>
          <br/>
          <Username setUsername={setUsername} />
          <Password setPassword={setPassword} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;