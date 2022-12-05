
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Spinner from "react-spinkit";
import { useAuth0 } from "@auth0/auth0-react";
const Post = ({showPost, status}) =>{

    const [postData, setPostData] = useState(null)
  //  const [toggle, setToggle] = useState(false)
   const { user, isAuthenticated } = useAuth0();
    const postHandler = (e) => {
        e.preventDefault()
     console.log(postData)
     setPostData({title: "", content: ""});
        fetch("/post/newpost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title:postData.title, content:postData.content, time:moment().format('llll'), userId: user.email, name: user.name, comments: []}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
      
           
              showPost();
            
              // setToggle(!toggle);
            })
            .catch((error) => {
              console.log("Error! :", error);
            //  optional:  navigate("/posterror");
            });
        };


    const changeHandler = (e)=>{
     
        setPostData({...postData,[e.target.name]:e.target.value})
    }
    return(
        <> {status === "loading..." ? (
          <SpinnerDiv>
    
    
          <Spinner name="chasing-dots" color="#9a8939"/>
    
            </SpinnerDiv>
          ) :
        (<Wrapper>
        <h3>Post a new message</h3>
        <StyledForm onSubmit={postHandler} >
        
            <label >Subject</label>
            <input type="text" 
            value={postData?.title} 
            // placeholder="Subject"
            name="title" onChange={changeHandler} />

            <label >Message</label>
            <textarea name="content"
             value={postData?.content} 
            //  placeholder="Message"
             id="" cols="30" rows="10" onChange={changeHandler}></textarea>

          

            <button  type="submit" disabled={postData?  false : true}>Post</button>
         

        </StyledForm>
        </Wrapper>)
}
        </>
    )
}


export default Post

const Wrapper = styled.div`

display: flex;
flex-direction: column;

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

const SpinnerDiv = styled.div`

display:flex;
flex-direction: column;

justify-content: center;
height: 45vh;


`



