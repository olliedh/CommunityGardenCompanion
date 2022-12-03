import Comment from "./CommentForm";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "react-spinkit"
const PostDetails = ({toggle, setToggle}) => {



  

    const {postId }= useParams()
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
  }, [postId, toggle]);
    
    return ( <>
     {(status === "loading..." || !postState)? (
        <SpinnerDiv>


      <Spinner name="chasing-dots" color="#9a8939"/>

        </SpinnerDiv>
      ) : (
  <ContentBox>
    <div>
    <h3>{`Subject: ${postState.title}`}</h3>
  
    <p>{`Message: ${postState.content}`}</p>

    <p>{`By: ${postState.name}, ${postState.userId}`}</p>

    <p>{`Posted: ${postState.time}`}</p>
  <ul>
  {   postState.comments.length  &&  <h4>Comments</h4>}
    {
      postState.comments.length && 
      postState.comments.map((obj)=> {
        return (
      
        <li 
        key={obj.commentId}>
                <p>Comment: {obj.content} </p>
               <div> <span>Name: {" "} {obj.name} {"     "} </span>
                <span>Posted on: {" "} {obj.time}</span> 
                </div>
                {/* </StyledPostList> */}
            {/* </Link>  */}
         {/* { setPostId= obj.id} */}
            </li> 
            
        )
     })
     

    }
    </ul>

    {isAuthenticated &&    <Comment postId={postId} showPost={showPost}/>} 
    </div>
    </ContentBox>) }
    </> );
}
 
export default PostDetails;

const ContentBox = styled.div`
display: flex;
flex-direction: column;
margin: 2% 5% 130px 3%;

min-width: 75vw;
`

const SpinnerDiv = styled.div`

display:flex;
flex-direction: column;

justify-content: center;
height: 45vh;
margin-left: 15%;

`