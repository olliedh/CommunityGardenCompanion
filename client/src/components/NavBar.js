import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";

const NavBar = () => {
    return ( <>
    <Wrapper>
        <LoginButton/>
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



`