import styled from 'styled-components';
import Username from "../components/Username";
import Password from "../components/Password";
//import Email from "../components/Email";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <HomeLanding>
      <HomeContainer>
        <form onSubmit={submit}>
        <Title>
            <FontAwesomeIcon/>
            APPARAZZI
          </Title><br />
          <InputWrapper>
            <Username handleTextInput={handleTextInput} user={user} />
          </InputWrapper>
          <InputWrapper>
            <Password handleTextInput={handleTextInput} user={user} />
          </InputWrapper>
          <SubmitButton>Submit</SubmitButton>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignUpLink to="/signup">Sign Up</SignUpLink> {/* Added Sign Up Button */}
      </HomeContainer>
    </HomeLanding>
  );
};

export default Login;

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
  margin-right: 0%;
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

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 4.6rem;
  }
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

const SignUpLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #3d3d3d;
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
