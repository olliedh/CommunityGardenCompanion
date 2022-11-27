import { useState } from "react";
import styled from "styled-components";

const Post = () =>{

    const [postData, setPostData] = useState(null)

    const postHandler = (e) => {
        e.preventDefault()
     console.log(postData)
        fetch("/post/newpost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title:postData.title, content:postData.content }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
      
              setPostData("");
            //   setCharacterCount(280);
            //   setToggle(!toggle);
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
        <div>Post</div>

        <StyledForm onSubmit={postHandler} >
        {/* <label >Topic</label>
            <div>
            <label >Tips</label>
            <input type="radio" name="topic" value="tips" onChange={changeHandler}  />
            <label >Trades</label>
            <input type="radio" name="topic" value="trades" onChange={changeHandler} />
            <label >General</label>
            <input type="radio" value="general" name="topic" onChange={changeHandler} />
            </div> */}
            <label >Title</label>
            <input type="text" 
            // value={postData.title} 
            name="title" onChange={changeHandler} />

            <label >Content</label>
            <textarea name="content"
            //  value={postData.content} 
             id="" cols="30" rows="10" onChange={changeHandler}></textarea>

          

            <button  type="submit" disabled={postData?  false : true}>Post</button>
         

        </StyledForm>
        </Wrapper>
        </>
    )
}


export default Post

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