import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "react-spinkit"



const LoanConfirmation = ({loanDetails}) => {

    const formattedDate = (rawdate) => {  const dateObject = new Date(rawdate)
         return  `${1900 + dateObject.getYear() }-${dateObject.getMonth() + 1}-${dateObject.getDate()}`}
 
    return (  <> 
    { loanDetails === null ? (
        <SpinnerDiv>

          <Spinner name="chasing-dots" color="#9a8939"/>

        </SpinnerDiv>
      ) :
   (
       <>
          <Wrapper>
                    <h2>
                        Hurray! Your toolshed reservation is confirmed
                     </h2>
                    
                    <p> Your Name: <Details>{loanDetails.name}</Details></p>
                    <p>  Your Email: <Details>{loanDetails.email}</Details></p>
                    <p> Reserved date: <Details> { loanDetails.datereserved &&
                    formattedDate(
                        loanDetails.datereserved
                        )
                        } </Details> </p>
                    <h3> Tools reserved: </h3>
                    <ul>
                    {loanDetails?.tools.map( (tool) => {

                        return  <Li key={loanDetails._id}>{`${tool} `}</Li>
                    })}
                    </ul>
                    </Wrapper>
                    <Img src={require('./wheelbarrow.gif')} alt="wheelbarrow image"/>;
                    
       </>
                    
                    ) }  
                
            </>);
}
 
export default LoanConfirmation;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
/* align-items: center; */
margin: 3%;
margin-bottom: 200px;
`

const Img = styled.img`

max-height: 240px;
position: fixed;
bottom: 22px;
margin-left: 100px;

animation:signup-response 1s 1;
    -webkit-animation:signup-response 1s 1;
    animation-fill-mode: forwards;

    animation-delay:6s;
    -webkit-animation-delay:7s; /* Safari and Chrome */
    -webkit-animation-fill-mode: forwards;

    @keyframes signup-response{
    from {opacity :1;}
    to {opacity :0;}
}

@-webkit-keyframes signup-response{
    from {opacity :1;}
    to {opacity :0;}
}
`

const SpinnerDiv = styled.div`

display:flex;
flex-direction: column;

justify-content: center;
height: 45vh;
margin-left: 10%;

`

const Li = styled.li`

display: list-item; 
list-style-type: disc;
list-style-position: inside;
font-size: 18px;
`

const Details = styled.span`
font-size: 20px;
color: var(--dark-sienna);
`