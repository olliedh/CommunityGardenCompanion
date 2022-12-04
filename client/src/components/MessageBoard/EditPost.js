import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () =>{

    const [postData, setPostData] = useState(null)
  //  const [toggle, setToggle] = useState(false)
  
 const navigate = useNavigate();

   const {postId }= useParams()
   const { user, isAuthenticated } = useAuth0();

   const [status, setStatus] = useState("loading...")

   const showEdit = () => {
//   console.log(postId)
    fetch(`/post/${postId}`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
      if (data.status === 400 || data.status === 500) {
          //is data.message relevant here?
        throw new Error(data.message);

      } else {
        setPostData(data.data);
     console.log(data.data);
        setStatus("idle");
      
      }
    })
    .catch((error) => {
      // navigate("/error");
      console.log(error)
    });

  }

  useEffect(() => {
    showEdit()
  }, []);



    const postHandler = (e) => {
        e.preventDefault()
     console.log(postData)
     setPostData({title: "", content: ""});
        fetch("/post/", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: postData._id, title:postData.title, content:postData.content, timeofedit:moment().format('llll')}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
             
               navigate(`/postdetails/${postId}`)
            
            //   showPost();
            
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
    if (postData) {
    return(
        <>
        
        <Wrapper>
        <h3>edit your message</h3>
        <StyledForm onSubmit={postHandler} >
        
            <label >Title</label>
            <input type="text" 
            value={postData?.title} 
            placeholder={postData?.title} 
            name="title" onChange={changeHandler} />

            <label >Content</label>
            <textarea name="content"
             value={postData?.content} 
             placeholder={postData?.content} 
             id="" cols="30" rows="10" onChange={changeHandler}></textarea>

          

            <button  type="submit" disabled={postData?  false : true}>Done</button>
         

        </StyledForm>
        </Wrapper>
        </>
    ) }
} 


export default EditPost

const Wrapper = styled.div`

display: flex;
flex-direction: column;
min-width: 250px;
margin: 2% 30% 2% 30%;
margin-bottom: 150px;

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