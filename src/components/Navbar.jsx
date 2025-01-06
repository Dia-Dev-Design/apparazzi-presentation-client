import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AppIcon from "../assets/ApparazziIconSmall.jpg";
import UserIcon from "../assets/user.png";
import SubmitIcon from "../assets/add_image.png";
import styled from "styled-components";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  return (
    <NavBar>
      <NavWrapper>
        <NavIconContainer>
          <StyledLink to="/">
            <NavIcon src={AppIcon} alt="App Icon" />
          </StyledLink>
        </NavIconContainer>

        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>&#9776;</Hamburger>

        <Menu open={menuOpen}>
          {token ? (
            <NavRightContainer>
              <StyledLink to="/AllPhotos" className="nav-link">
                All Photos
              </StyledLink>
              <StyledLink to="/leaderboards">Leaderboards</StyledLink>
              <StyledLink to="/submit-photo">
                <SubmitImage src={SubmitIcon} alt="Submit Photo" />
              </StyledLink>
              <StyledLink to="/profile">
                <ProfileIcon src={UserIcon} alt="User Profile" />
              </StyledLink>
            </NavRightContainer>
          ) : (
            <>
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/login">Log In</StyledLink>
              <StyledLink to="/signup">Sign Up</StyledLink>
            </>
          )}
        </Menu>
      </NavWrapper>
    </NavBar>
  );
};

export default Navbar;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const NavIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavIcon = styled.img`
  height: 40px;
  border-radius: 50%;
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  border-radius: 7px;
  @media (max-width: 769px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 0;
    width: 200px;
    background: #fff;
    border: 2px solid #dfdfdf;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    padding: 10px;
  }
`;

const NavRightContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media (max-width: 769px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 10px;
  font-weight: 500;
  text-align: center;

  @media (max-width: 769px) {
    padding: 10px 0;
    width: 100%;
  }
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SubmitImage = styled.img`
  width: 40px;
  height: 40px;
`;


const Hamburger = styled.div`
  font-size: 30px;
  cursor: pointer;
  display: none;
  @media (max-width: 769px) {
    display: block;
  }
`;