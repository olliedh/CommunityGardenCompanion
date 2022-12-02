import LoanCalendar from "./LoanCalendar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Checkbox from "./CheckBox";
import styled from "styled-components";
import moment from "moment";
import {useNavigate} from "react-router-dom"

const LoanForm = (toggle, setToggle) => {
    
    //getting the user identity and login status
    const {user, isAuthenticated} = useAuth0()
    //state will change to loading when fetch worked to conditionally render the form
    const [status, setStatus] = useState("loading");
    ///////////state that receives the inventory  ////////should there just be one state for the form?
    const [toolsState, setToolsState] = useState([]);
    ///state that will take in tools as array elements when
    const [selectedTools, setSelectedTools] = useState({})
    //state of date selection, lifted from loancalendar child, passed down
    const [selectedDate, setSelectedDate] = useState(null);
    //////////////////////////////////////////////////////////////////////
    //show different error messages depending on which tool is unavailable- does this happen based on the get?
    const [errMessage, setErrMessage] = useState("");
    //disabling the submit until the form is filled
    const [disabled, setDisabled] = useState(true);
    const navigate=useNavigate()

    //fetch that loads the tool list data as checkboxes
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
    
    //showtools is called on initial load only
    useEffect(() => {
        showTools()
    }, []);
    
    //enables the submit button only if a date and minimum 1 tool were chosen
    useEffect(() => {
        Object.values(selectedTools).length > 0 && selectedDate !== null
          ? setDisabled(false)
          : setDisabled(true);
      }, [selectedTools, selectedDate]);
    
console.log(selectedDate)


    //when the item is selected, it should 
    //1. be added to the selected tools array
    //2. change toolsState.isAvailable value to false. 

    const handleChange = (e) => {

        console.log(e.target.checked)
        //how do I grab the checkbox value or name to push into the new state?
    if (e.target.checked === true) {

        setSelectedTools({ ...selectedTools, [e.target.name]: e.target.name})

    } else {
        //This command takes everything from selectedTools (that is not e.target.name) and places it inside the rest variable
        const {[e.target.name]: _, ...rest} = selectedTools 
        setSelectedTools(rest)
        
    }
    };



  //Submit should :
  //1. post an object containing user.name, user.email, selectedDate, selectedTools
  //2. update the inventory items that have been selected to isAvailable: false
  //3. return the reservation information for confirmation
    const handleSubmit = (e) => {
  
        e.preventDefault()
        fetch("/reservations/newreservation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:user.name, email:user.email, created:moment().format('llll'), tools: Object.values(selectedTools), datereserved: selectedDate}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
              navigate("/")
           
        //     //   showPost();
            
        //       // setToggle(!toggle);
            })
            .catch((error) => {
              console.log("Error! :", error);
            //  optional:  navigate("/posterror");
            });


  
    }


    return ( <>

     { //fix the loading/conditional display here
     status === "loading..." ? (
        <div>
        loading...
        </div>
      ) :
   ( <FormWrapper>
    <h2>
      Reserve tools from the shed!
    </h2>

    <Form onSubmit={handleSubmit}>
        <ChoicesDiv>   <LoanCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <ul>

        {toolsState && toolsState.map((obj)=>{
        
        return    <ToolLi  key={obj._id}>
              {/* make the handlechange function push the checked items with setSelectedTools */}
             <span>   <input type="checkbox" name={obj.tool} value={obj.tool}  onChange={handleChange} />
        
        <label>
        {`tool type: ${obj.tool}`}
      </label> </span>  <ImgSpan><ToolImg src={obj.imgSrc} alt={`${obj.tool}`}></ToolImg></ImgSpan>
      
                    
                
                  </ToolLi>
                  

        }) }
         </ul>
         </ChoicesDiv> 

        <button disabled={disabled}>Create Reservation</button>
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
padding-top: 5%;

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

const ChoicesDiv = styled.div`

display: flex;
flex-wrap:wrap;
`