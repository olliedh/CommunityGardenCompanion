import styled from "styled-components";

const Footer = () => {
    return (  <>
    <Wrapper>

hi
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
 
  height: 120px;
  /* maring: 15px;  */ 
  /* radial-gradient(96.15px at 50% calc(100% - 129.00px),#000 99%,#0000 101%) calc(50% - 86px) 0/172px 100%,
    radial-gradient(96.15px at 50% calc(100% + 86.00px),#0000 99%,#000 101%) 50% calc(100% - 43px)/172px 100% repeat-x; */
`