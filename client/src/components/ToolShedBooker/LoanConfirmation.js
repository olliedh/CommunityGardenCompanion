import moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";




const LoanConfirmation = ({loanDetails}) => {
    const {id} = useParams()
    return (  <>  <Wrapper>
                    <h2>
                        Hurray! Your toolshed reservation is confirmed
                     </h2>
                    
                    <p> Your Name: {loanDetails.name}</p>
                    <p>  Your Email: {loanDetails.email}</p>
                    <p> Reserved date: {loanDetails.datereserved}</p>
                    <p> Tools reserved: </p>
                    {loanDetails?.tools.map( (tool) => {

                        return  <p>{`${tool} `}</p>
                    })}
                    </Wrapper>
                    <Img src={require('./wheelbarrow.gif')} alt="wheelbarrow image"/>
                    
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