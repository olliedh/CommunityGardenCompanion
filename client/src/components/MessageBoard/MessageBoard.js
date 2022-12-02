import React, { useState, useEffect, useParams } from "react";
import styled from "styled-components";
import Post from "./PostForm";
import {useAuth0} from "@auth0/auth0-react"
import { Link, useNavigate } from "react-router-dom";
import PostDetails from "./PostDetails";
import EditPost from "./EditPost";


const MessageBoard = ({toggle, setToggle}) => {
const navigate = useNavigate()
    const {user, isAuthenticated} = useAuth0()
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
        console.log(data.data)
      
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

  const handleEdit = (obj) => {
    navigate(`/editpost/${obj._id}`)
        
  }


  const handleDelete = (obj) => {
 console.log(obj)
    fetch(`/post`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: obj._id
       

      }),
    })
      .then((response) => response.json())
      .then((data) => {
 
         console.log(data);
        setToggle(!toggle);
       
        // setLoading(false);
        // dispatch({
        //   type: "FINISHED_FETCH",
        //   data: data.data,
        // });
      })
      .catch((err) => {
        console.log(err);
      });

   
  
  }
    return ( <> {status === "loading..." ? (
        <StyledLoading>
        loading...
        </StyledLoading>
      ) : (
    <ContentBox>
    <h2>Welcome to the Message Board</h2>
    
    

    <ul>

    
      
        {postState && postState.data.map((obj)=> {
            return (
          <React.Fragment  key={obj._id}>
            <li 
           >
                <Link to={`/postdetails/${obj._id}`}>
                    <StyledPostList>
                    <h4>{obj.title} </h4>
                   <div> <span>Name: {" "} {obj.name} {"     "} </span>
                    <span>Posted on: {" "} {obj.time}</span> 
                    </div>
                    </StyledPostList>
                </Link> 
          
                </li> 
               {user && (user.email === obj.userId? <button onClick={()=> handleDelete(obj)}>Delete</button> : "")}
               {user && (user.email === obj.userId? <button onClick={()=> handleEdit(obj)}>Edit</button> : "")}
            </React.Fragment>
                
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
margin: 2% 5% 130px 5%;

`

const StyledPostList = styled.div`
display:flex;
flex-direction: column;
margin-bottom: 1rem;
font-size: 0.9rem;

`

const StyledLoading = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 50vh;
`