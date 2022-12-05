import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Footer = () => {
    return (  <>
    <Wrapper>
      <LinksDiv>
    <StyledNavLink to={"/about"}>About</StyledNavLink>

    <StyledNavLink to={"/"}>Find us</StyledNavLink>
    </LinksDiv>
    </Wrapper>
    </>);
}
 
export default Footer;

const Wrapper = styled.div`
flex-shrink: 0;
/* 
width: 100%;
height: 2rem;
background-color: var(--dark-sienna);
margin-top: 1rem; */

--size: 50px;
  --R: calc(var(--size)*1.28);

  -webkit-mask:
 radial-gradient(89.44px at 50% 120.00px,#000 99%,#0000 101%) calc(50% - 80px) 0/160px 100%,
    radial-gradient(89.44px at 50% -80px,#0000 99%,#000 101%) 50% 40px/160px 100% repeat-x;
  background: linear-gradient(90deg,var(--liver-organ),var(--dark-sienna));
 
  mask:
 radial-gradient(89.44px at 50% 120.00px,#000 99%,#0000 101%) calc(50% - 80px) 0/160px 100%,
    radial-gradient(89.44px at 50% -80px,#0000 99%,#000 101%) 50% 40px/160px 100% repeat-x;
  background: linear-gradient(90deg,var(--liver-organ),var(--dark-sienna));
 
  height: 120px;
  //try later to make the waves less pronounced with transforms



  margin-top: 5rem;
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const LinksDiv = styled.div`

position: -webkit-sticky; /* Safari */
  position: fixed;
 
bottom: 5px;
  right: 8%;

`

const StyledNavLink = styled(NavLink)`

margin-left: 12px;
font-family: "hind";
font-size: 12px;
color: var(--bone);

&:hover {
  color: #f1ab86;
}

`