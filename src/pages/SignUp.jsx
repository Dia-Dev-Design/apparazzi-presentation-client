import { useState, useContext, } from 'react'
import { AuthContext } from '../context/auth.context';
import ConfirmPassword from "../components/ConfirmPassword";
import Email from "../components/Email";
import Password from "../components/Password";
import Username from "../components/Username";
import PhoneNumber from "../components/PhoneNumber";
import { post } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [errormessage, setErrormessage] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      post("/auth/signup", {
        username: username,
        password: password,
        email: email,
      })
        .then((results) => {
          storeToken(results.data.authToken)
          authenticateUser()
          navigate('/')
        })
        .catch((err) => {
          console.log("Something went wrong=====>", err.response.data.message);
          setErrormessage(err.response.data.message)
        });

    } else {
      setErrormessage("Provided password does not match.")
    }

  }

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form onSubmit={handleSubmit}>
          <h1>APPARAZZI</h1>
          <br/>
          <Username setUsername={setUsername} />
          <Email setEmail={setEmail} />
          <Password setPassword={setPassword} />
          <ConfirmPassword setConfirmPassword={setConfirmPassword} />
          {/* <PhoneNumber setPhoneNumber={setPhoneNumber} /> */}

          <br />
          <button type='submit' className="submitButton">Sign Up</button>
          <br/>

          <p>Already have an account?<Link to="/login">Log In</Link></p>

          <p>{errormessage}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;