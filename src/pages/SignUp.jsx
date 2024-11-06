import styled from 'styled-components';
import Username from "../components/Username";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import Email from "../components/Email";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextInput = (e) => {

    setNewUser((prev) => ({...prev, [e.target.name]: e.target.value}))

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newUser.password === confirmPassword) {
      post("/auth/signup", newUser)
        .then((results) => {
          storeToken(results.data.authToken)
          authenticateUser()
          navigate('/profile')
        })
        .catch((err) => {
          console.log("Something went wrong=====>", err.response.data.message);
          setErrorMessage(err.response.data.message)
        });
    } else {
      setErrorMessage("Provided password does not match.")
    }

  }

  return (
    <HomeLanding>
      <HomeContainer>
        <form onSubmit={handleSubmit}>
          <Title>APPARAZZI</Title>
          <InputWrapper>
            <Username handleTextInput={handleTextInput} user={newUser} />
          </InputWrapper>
          <InputWrapper>
            <Email handleTextInput={handleTextInput} newUser={newUser} />
          </InputWrapper>
          <InputWrapper>
            <Password handleTextInput={handleTextInput} user={newUser} />
          </InputWrapper>
          <InputWrapper>
            <ConfirmPassword setConfirmPassword={setConfirmPassword} />
          </InputWrapper>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignInLink to="/login">Already have an account? Log In</SignInLink>
      </HomeContainer>
    </HomeLanding>
  );
};

export default SignUp;

// Styled components
const HomeLanding = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
`;

const HomeContainer = styled.div`
  width: 100%;
  margin-top: -5%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-sizing: border-box;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 4.6rem;
  font-family: 'Bebas Neue', sans-serif;
  color: #2c2c2c;
  text-align: center;
  margin: 20px;
`;

const SubmitButton = styled.button`
  width: 25%;
  padding: 7px;
  background-color: black;
  color: white;
  font-size: 0.9rem;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SignInLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #3d3d3d;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
