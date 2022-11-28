import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
const Comment = ({showPost}) =>{

    const [postData, setPostData] = useState(null)
   const [toggle, setToggle] = useState(false)
   const { user, isAuthenticated } = useAuth0();
    const postHandler = (e) => {
        e.preventDefault()
     console.log(postData)
     setPostData({title: "", content: ""});
        fetch("/post/newpost", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content:postData.content, time:moment().format('llll'), userId: user.email, name: user.name}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
      
           
              showPost();
            //   setCharacterCount(280);
              setToggle(!toggle);
            })
            .catch((error) => {
              console.log("Error! :", error);
            //   navigate("/posterror");
            });
        };


    const changeHandler = (e)=>{
     
        setPostData({...postData,[e.target.name]:e.target.value})
    }
    return(
        <>
        <Wrapper>

        <StyledForm onSubmit={postHandler} >
   
           
            <label >Content</label>
            <textarea name="content"
             value={postData?.content} 
             id="" cols="30" rows="10" onChange={changeHandler}></textarea>

          

            <button  type="submit" disabled={postData?  false : true}>Post</button>
         

        </StyledForm>
        </Wrapper>
        </>
    )
}


export default Comment

const Wrapper = styled.div`

display: flex;
flex-direction: column;
margin: 2% 30% 2% 30%;


`
const StyledForm = styled.form`


display: flex;
flex-direction: column;

/* margin: 2% 10% 2% 10%; */
`