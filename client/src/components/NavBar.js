import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react"
import Profile from "./Profile";

const NavBar = () => {
    const {user, isAuthenticated} = useAuth0()
    return ( <>
    <Wrapper>
    <StyledNavLink to={"/"}>Home</StyledNavLink>
    
    <StyledNavLink to={"/plantingtabletest"}>Planting Chart</StyledNavLink>

    {isAuthenticated &&  <StyledNavLink to={"/toolshed"}>The Toolshed</StyledNavLink>}

   
    <StyledNavLink to={"/messageboard"}>Message Board</StyledNavLink>

    {/* <StyledNavLink to={"/profile"}>Profile</StyledNavLink> */}

    <div width="200"> { isAuthenticated && `${user.name}  `} 
      {isAuthenticated? <LogoutButton/>:  <LoginButton/> }
      </div>
     
    </Wrapper>
    </> );
}
 
export default NavBar;

const Wrapper = styled.div`
background: var(--teal-blue);
background: linear-gradient(90deg, var(--teal-blue),#5D9FB5);

min-height: 1rem;
padding: 1% 3% 1% 3%;
display: flex;
justify-content: flex-end;
align-items: center;

gap: 1%;



`

const StyledNavLink = styled(NavLink)`


font-family: "hind";
font-weight: 500;
color: var(--bone);
&:visited {
  color: #f1ab86;
}

`