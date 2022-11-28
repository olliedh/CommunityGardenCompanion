import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./PostForm";

const MessageBoard = ({toggle, setToggle}) => {

    // const postHandler = (e) => {
    //     e.preventDefault();

    // }
    const [postsFeed, setPostsFeed] = useState({})
    const [postState, setPostState] = useState(null)
    const [status, setStatus] = useState("loading...")
  

  useEffect(() => {
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
  }, [toggle]);

    return ( <> {status === "loading..." ? (
        <div>
        loading...
        </div>
      ) : (
    <ContentBox>
    <h2>Welcome to the Message Board</h2>
    
    

    <ul>
    {/* <li>
  looking for seeds


    </li>

        <li>

   tips for growing eggplants
        </li> */}

        <li>
        {postState.data[0].title} : {" "
        } 
        {postState.data[0].content}
       
         
        </li>
        {/* map not grabbing on to correct data */}
        {postState && postState.data.map((obj)=> {
            return <li key={obj._id}>{obj.time} {" "} Title:  {" "} {obj.title}  {" "} Content: {" "} {obj.content}</li>
         })
         
         }
    </ul>
    <div>
    <button>post</button>
    

    <button>Log in to post</button> 

    </div>
    <Post/>

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