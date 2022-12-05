import styled from 'styled-components';



const About = () => {
    return (  <>
    
    <AboutDiv>
     <h2>About</h2>

     <p> This website was inspired by my time sharing a plot with friends at the Villeray community garden over the summer.</p>
     <p>One of them is illustrator Lucille Audinet, whose image "Au Parc Floral" informed the design.</p>
     
     <ImgDiv><img  src={require('./lulugardenilu.png') } alt="Illustration of a couple at a park with clouds and stars above and flowers on both sides"/>
    </ImgDiv>
     </AboutDiv>
    
    
    </>);
}
 
export default About;


const AboutDiv = styled.div`

margin: 0 3% 30px 3%;

`

const ImgDiv = styled.div`

display: flex;
justify-content: center;
`