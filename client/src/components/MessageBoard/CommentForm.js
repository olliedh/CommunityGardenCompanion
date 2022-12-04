import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";


const Comment = ({ postId, showPost}) =>{

    const [commentData, setCommentData] = useState(null)
  //  const [toggle, setToggle] = useState(false)
   const { user, isAuthenticated } = useAuth0();
    const commentHandler = (e) => {
        e.preventDefault()
     console.log(commentData)
     setCommentData({title: "", content: ""});
        fetch(`/post/comment`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id:postId,  content:commentData.content, time:moment().format('llll'), userId: user.email, name: user.name}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
              showPost();
              // setToggle(!toggle);
          
         
            })
            .catch((error) => {
              console.log("Error! :", error);
            // optional:  navigate("/posterror");
            });
        };


    const changeHandler = (e)=>{
     
        setCommentData({...commentData,[e.target.name]:e.target.value})
    }
    return(
        <>
        <Wrapper>

        <StyledForm onSubmit={commentHandler} >
   
           <h3> Add a commment: </h3>
         
            <textarea name="content"
             value={commentData?.content} 
             id="" cols="30" rows="10" onChange={changeHandler}></textarea>

          

            <button  type="submit" disabled={commentData?  false : true}>Comment</button>
         

        </StyledForm>
        </Wrapper>
        </>
    )
}


export default Comment

const Wrapper = styled.div`

display: flex;
flex-direction: column;
min-width: 250px;
margin: 2% 30% 2% 30%;
background: hsla(128, 21%, 57%, 0.2);
min-width: 200px;
padding: 6%;
border-radius: 29% 75% 37% 36% / 27% 28% 32% 30%   ;
box-shadow: 0 3px 6px 0 rgba(59, 22, 14, 0.2), 0 2px 9px 0 rgba(59, 22, 14, 0.19);


`
const StyledForm = styled.form`


display: flex;
flex-direction: column;

/* margin: 2% 10% 2% 10%; */
`