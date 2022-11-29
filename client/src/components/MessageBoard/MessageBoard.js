import { useState, useEffect, useParams } from "react";
import styled from "styled-components";
import Post from "./PostForm";
import {useAuth0} from "@auth0/auth0-react"
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";


const MessageBoard = ({toggle, setToggle}) => {

    const {isAuthenticated} = useAuth0()
    // const postHandler = (e) => {
    //     e.preventDefault();

    // }
    const [postsFeed, setPostsFeed] = useState({})
    const [postState, setPostState] = useState(null)
    const [status, setStatus] = useState("loading...")
    const [postId, setPostId] = useState(null)
  const showPost = () => {
 
    fetch("/posts")
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 400 || data.status === 500) {
          //is data.message relevant here?
        throw new Error(data.message);
      } else {
        setPostState(data);
      // console.log(data.data);
        setPostsFeed(data);
    
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
  }, [toggle]);

    return ( <> {status === "loading..." ? (
        <div>
        loading...
        </div>
      ) : (
    <ContentBox>
    <h2>Welcome to the Message Board</h2>
    
    

    <ul>

    
      
        {postState && postState.data.map((obj)=> {
            return (
          
            <li 
            key={obj._id}>
                <Link to={`/postdetails/${obj._id}`}>
                {obj.time} {" "} Title:  {" "} {obj.title}  {" "} Content: {" "} {obj.content}
                </Link> 
             {/* { setPostId= obj.id} */}
                </li> 
                
            )
         })
         
         }
    </ul>
    <div>
   


    </div>
   {isAuthenticated && <Post showPost={showPost}/>} 

    </ContentBox> 
    )}
    </> 
        );
}
 
export default MessageBoard;

const ContentBox = styled.div`
display: flex;
flex-direction: column;
margin: 2% 5% 2% 5%;

`