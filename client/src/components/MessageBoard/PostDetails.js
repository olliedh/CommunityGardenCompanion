import Comment from "./CommentForm";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "react-spinkit"
const PostDetails = ({toggle, setToggle}) => {



  

    const {postId }= useParams()
    const { user, isAuthenticated } = useAuth0();
    const [postState, setPostState] = useState(null)
    const [status, setStatus] = useState("loading...")
    const navigate = useNavigate();
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

  const handleGoBackToMB = () => {
    navigate(`/messageboard`)
        
  }
    
    return ( <>
     {(status === "loading..." || !postState)? (
        <SpinnerDiv>


      <Spinner name="chasing-dots" color="#9a8939"/>

        </SpinnerDiv>
      ) : (
  <ContentBox>
    <div>
    <Post>
    <h3>{`Subject: ${postState.title}`}</h3>
  
    <Content>{` ${postState.content}`}</Content>
 <DetailsDiv>
    <span>{`By: ${postState.name}, ${postState.userId}`}</span>

    <span>{`Posted: ${postState.time}`}</span>
  </DetailsDiv>
 </Post>
  <ul>
  {   postState.comments.length ?  <h2>Comments</h2> : ""}
    {
      postState.comments.length ? ( 
      postState.comments.map((obj)=> {
        return (
      
        <li 
        key={obj.commentId}>
                <p> {obj.content} </p>
               <DetailsDiv> 
                <span>Name: {" "} {obj.name} {"     "} </span>
                <span>Posted on: {" "} {obj.time}</span> 
                </DetailsDiv>
          
            </li> 
            
        )
     })) : ""
     

    }
    </ul>
<StyledReturn onClick={()=> handleGoBackToMB()}>Go Back</StyledReturn>
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

const DetailsDiv = styled.div`

font-size: 12px;
color: var(--dark-sienna);
margin-bottom: 1%;



`

const Content = styled.p`
font-size: 1.5rem;

max-width: 50rem;
`

const Post = styled.div`

margin-bottom: 3%;
`

const StyledReturn = styled.button`
  color: var(--hunter-green);
border: none;
height: 50px;
background: hsla(128, 21%, 57%, 0.2);
border-radius: 100% 52% 82% 69% / 64% 86% 78% 70%  ;
box-shadow: 0 1px 2px 0 rgba(59, 22, 14, 0.17), 0 1px 8px 0 rgba(59, 22, 14, 0.19);
padding: 0 1% 0 1%;
transition-timing-function: ease-in-out;
  transition: 0.22s;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 1px 2px 0 rgba(59, 22, 14, 0.17), 0 1px 8px 0 rgba(59, 22, 14, 0.19);
 
    opacity: 0.7;
    text-shadow: 2px 2px 3px rgba(255,255,255,0.8);


  }


  &:active {
    box-shadow: inset 0 1px 2px 0 rgba(59, 22, 14, 0.17), 0 1px 8px 0 rgba(59, 22, 14, 0.19);
 

    text-shadow: 2px 2px 3px rgba(255,255,255,0.8);
  }

`