import Comment from "./comment";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const PostDetails = () => {



    // const postHandler = (e) => {
    //     e.preventDefault();


    // }

    const {postId }= useParams()
    console.log(postId)
    const { user, isAuthenticated } = useAuth0();
    const [postState, setPostState] = useState(null)
    const [status, setStatus] = useState("loading...")

  const showPost = () => {
 
    fetch(`/post/${postId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      if (data.status === 400 || data.status === 500) {
          //is data.message relevant here?
        throw new Error(data.message);

      } else {
        setPostState(data.data);
     
        setStatus("idle");
      
      }
    })
    .catch((error) => {
      // navigate("/error");
      console.log(error)
    });

  }

  useEffect(() => {
    showPost()
  }, [postId]);
    
    return ( <>
     {status === "loading..." ? (
        <div>
        loading...
        </div>
      ) : (
  <ContentBox>
    <div>{`Subject: ${postState.title}`}</div>
  
    <div>{`Message: ${postState.content}`}</div>

    <div>{`Name: ${postState.name}`}</div>

    <div>{`time: ${postState.time}`}</div>


    <Comment postId={postId}/>
    </ContentBox>) }
    </> );
}
 
export default PostDetails;

const ContentBox = styled.div`
display: flex;
flex-direction: column;
margin: 2% 5% 2% 5%;
`