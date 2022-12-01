import LoanCalendar from "./LoanCalendar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Checkbox from "./CheckBox";
import styled from "styled-components";

const LoanForm = (toggle, setToggle) => {
    //getting the user identity and login status
    const {user, isAuthenticated} = useAuth0()
    //state will change to loading when fetch worked to conditionally render the form
    const [status, setStatus] = useState("loading");
    ///////////state that receives the inventory  ////////should there just be one state for the form?
    const [toolsState, setToolsState] = useState([]);
    ///state that will take in tools as array elements when
    const [selectedTools, setSelectedTools] = useState([])
    //or should I be using this type of state instead???
    // const [checkedState, setCheckedState] = useState(
    // new Array(toolsState.length).fill(false)
    // );
    //state of date selection, lifted from loancalendar child, passed down
    const [selectedDate, setSelectedDate] = useState(null);
    //////////////////////////////////////////////////////////////////////
    //show different error messages depending on which tool is unavailable- does this happen based on the get?
    const [errMessage, setErrMessage] = useState("");
    //disabling the submit until the form is filled
    const [disabled, setDisabled] = useState(true);

    const showTools = () => {
        fetch(`/tools`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          if (data.status === 400 || data.status === 500) {
              //is data.message relevant here?
              throw new Error(data.message);
              
            } else {
                setToolsState(data.data);
                
                setStatus("idle");
                
            }
        })
        .catch((error) => {
            // navigate("/error");
            console.log(error)
        });
        
    }
    
    useEffect(() => {
        showTools()
    }, []);
    
    useEffect(() => {
        selectedTools.length === 0 && selectedDate === null
          ? setDisabled(true)
          : setDisabled(false);
      }, [selectedTools, selectedDate, setDisabled]);
    
      console.log(toolsState)
    const handleChange = (value, name) => {
      // setFormData({ ...formData, [name]: value });
      // setErrMessage("");
    };
  
    const handleSubmit = (e) => {
  
        e.preventDefault()
  
    }
    return ( <>
     {status === "loading..." ? (
        <div>
        loading...
        </div>
      ) :
   ( <FormWrapper>
    <h2>
      Reserve tools from the shed!
    </h2>

    <Form onSubmit={handleSubmit}>
        <ul>
        {toolsState && toolsState.map((obj)=>{
        
        return    <ToolLi  key={obj._id}>
              
             <span>  <Checkbox  label={`  ${obj.tool}`} value={false} handleChange={handleChange} /> </span>  <ImgSpan><ToolImg src={obj.imgSrc}></ToolImg></ImgSpan>
                
                  </ToolLi>

        }) }
         </ul>

        <LoanCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <button  type="submit" disabled={disabled}>Post</button>
    </Form>
    </FormWrapper>
    
   )}
    </> );
}
 
export default LoanForm;

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 130px;

`;
const ToolImg = styled.img`
height: 50px;
width: auto;
max-width: 100px;
border-radius: 3px;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;

const ToolLi = styled.li`
font-weight: 500;
display:flex;
gap: 5px;
align-items: center;
/* */
width: 25vw;
min-width: 200px;
justify-content: space-between;
padding-left: 0;
margin-bottom: 2%;

`;

const ImgSpan = styled.span`

display: flex;
flex-direction: column;

width: 80px;

`;

const Form = styled.form`

display:flex;
flex-direction: column;
align-items:center;
`