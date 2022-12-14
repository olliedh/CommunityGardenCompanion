import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react"
import Profile from "./Profile";
import { useState } from "react";

const NavBar = () => {
    const {user, isAuthenticated} = useAuth0()
    // add state `isOpen, setIsOpen`
    const [isOpen, setIsOpen] = useState(false)
    
    return ( <>
    <Wrapper>
  
        {/* <HamburgerButton onClick={setIsOpen(!isOpen)}  src={require('./hamburger.png')}/>
          {/* - show if media width < 600px */}
          {/* - onClick => setIsOpen(!isOpen) */}
  
      {/*
        <ContentWrapper isOpen={isOpen} />
      */}
<LinksDiv>
    <StyledNavLink to={"/"}>Home</StyledNavLink>
    
   
    <StyledNavLink to={"/messageboard"}>Messageboard</StyledNavLink>

    {isAuthenticated &&  <StyledNavLink to={"/toolshed"}>Toolshed</StyledNavLink>}


    <StyledNavLink to={"/plantingtabletest"}>Guides</StyledNavLink>
    {/* <StyledNavLink to={"/profile"}>Profile</StyledNavLink> */}
    </LinksDiv>
    <UserLog> { isAuthenticated && <User> {`${user.name}   `} </User>} 
      {isAuthenticated? <LogoutButton/>:  <LoginButton/> }
      </UserLog>
     
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

gap: 2%;

/* @media (max-width: 600px) {

} */

`

const StyledNavLink = styled(NavLink)`


font-family: "hind";
font-weight: 500;
color: var(--bone);
position: relative;
&:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  -webkit-transform: scaleX(0);
          transform: scaleX(0);
  -webkit-transform-origin: right;
          transform-origin: right;
  transition: -webkit-transform 250ms ease-in;
  transition: transform 250ms ease-in;
  transition: transform 250ms ease-in, -webkit-transform 250ms ease-in;

}

&:hover:after {
  -webkit-transform: scaleX(1);
          transform: scaleX(1);
  -webkit-transform-origin: left;
          transform-origin: left;
}
&:visited {
  color: #f1ab86;
  position: relative;
}

&.active {

  color: var(--bone);
  

}
`

// const HamburgerButton = styled.img`

// width: 2rem;


// @media (max-width: 600px) {
//   display: block;
//           /* onClick => setIsOpen(!isOpen)  */
//         }

// `

// /*
// const ContentWrapper = styled.div`
//   display: block;

//   @media (max-width: 600px) {
//     display: ${props => (props.isOpen ? `flex` : `none`)};
//   }
// `
//  */

const User = styled.span`
color: var(--bone);
text-transform: capitalize;
opacity: 0.9;
flex-shrink:3;
margin-right: 5px;
margin-left: 5px;


`

const UserLog = styled.div`
display: flex;

align-items: center;

@media (max-width: 600px) { 
  flex-direction: column;
  align-items: flex-end;
}
`

const LinksDiv = styled.div`
flex-shrink: 0;
display: flex;
gap: 2%;
@media (max-width: 600px) { 
  margin-right: 25%;
margin-top: 6%;
}
`