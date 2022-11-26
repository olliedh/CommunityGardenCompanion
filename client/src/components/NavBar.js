import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react"

const NavBar = () => {
    const {isAuthenticated} = useAuth0()
    return ( <>
    <Wrapper>
    <NavLink to={"/post"}>Post</NavLink>
      {isAuthenticated? <LogoutButton/>:  <LoginButton/> }
     
    </Wrapper>
    </> );
}
 
export default NavBar;

const Wrapper = styled.div`
background: var(--teal-blue);
min-height: 1rem;
padding: 1% 3% 1% 3%;
display: flex;
justify-content: flex-end;
gap: 10px;



`