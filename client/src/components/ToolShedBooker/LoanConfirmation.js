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
                    
                    <p> Your Name: {loanDetails.name}</p>
                    <p>  Your Email: {loanDetails.email}</p>
                    <p> Reserved date: { loanDetails.datereserved &&
                    formattedDate(
                        loanDetails.datereserved
                        )
                        } </p>
                    <p> Tools reserved: </p>
                    {loanDetails?.tools.map( (tool) => {

                        return  <p key={loanDetails._id}>{`${tool} `}</p>
                    })}
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
margin: 2%;
margin-bottom: 200px;
`

const Img = styled.img`

max-height: 240px;
position: fixed;
bottom: 22px;

`

const SpinnerDiv = styled.div`

display:flex;
flex-direction: column;

justify-content: center;
height: 45vh;
margin-left: 10%;

`