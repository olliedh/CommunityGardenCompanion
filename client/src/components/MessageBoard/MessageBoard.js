import { useState, useEffect } from "react";
import styled from "styled-components";
const MessageBoard = () => {

    // const postHandler = (e) => {
    //     e.preventDefault();

    // }
    const [postsFeed, setPostsFeed] = useState({})
    const [status, setStatus] = useState("loading...")
    const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
        //   setTweetState(data);
        console.log(data);
          setPostsFeed(data);
          setStatus("idle");
        //   setToggle(!toggle);
        }
      })
      .catch((error) => {
        // navigate("/error");
        console.log(error)
      });
  }, [toggle]);

    return ( <>
    <ContentBox>
    <h2>Welcome to the Message Board</h2>
    
    <div>
    <button>post</button>

    <button>sign in</button> 

    </div>

    <ul>
    <li>
  looking for seeds


    </li>

        <li>

   tips for growing eggplants
        </li>
    </ul>
    </ContentBox>
    </> 
     );
}
 
export default MessageBoard;

const ContentBox = styled.div`
display: flex;
flex-direction: column;
margin: 2% 5% 2% 5%;

`