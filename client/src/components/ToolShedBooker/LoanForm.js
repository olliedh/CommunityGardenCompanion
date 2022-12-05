
import LoanCalendar from "./LoanCalendar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Checkbox from "./CheckBox";
import styled from "styled-components";
import moment from "moment";
import {useNavigate} from "react-router-dom"
import Spinner from "react-spinkit"

const LoanForm = ( {setLoanDetails}) => {
    
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
    
    const [whichToolsAreBookedForDate, setWhichToolsAreBookedForDate] = useState(null)
    //////////////////////////////////////////////////////////////////////
    //disabling the submit until the form is filled
    const [disabled, setDisabled] = useState(true);
    const navigate=useNavigate()

    //fetch that loads the tool list data as checkboxes
    const showTools = () => {
        fetch(`/tools`)
        .then((res) => res.json())
        .then((data) => {
         
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
    
    // enables the submit button only if a date and minimum 1 tool were chosen
    useEffect(() => {
        Object.values(selectedTools).length > 0 && selectedDate !== null
          ? setDisabled(false)
          : setDisabled(true);
      }, [selectedTools]);
    
        useEffect(() => {
        Object.values(selectedTools).length > 0 && selectedDate !== null
          ? setDisabled(false)
          : setDisabled(true);
      }, [selectedDate]);




    //when the item is selected, it should 
    //1. be added to the selected tools array
    //2. change toolsState.isAvailable value to false. 

    const handleChange = (e) => {

    
        // grab the checkbox value  to push into the selectedTools state
    if (e.target.checked === true) {

        setSelectedTools({ ...selectedTools, [e.target.name]: e.target.name})

    } else {
        //This command takes everything from selectedTools (that is not e.target.name) and places it inside the rest variable 
        const {[e.target.name]: _, ...rest} = selectedTools 
        setSelectedTools(rest)
        
    }
    };



  //Submit should post an object containing user.name, user.email, selectedDate, selectedTools
  //endpoint in back: 1. updates the inventory items that have been selected to isAvailable: false (this was dropped)
  //2. returns the reservation information for confirmation
    const handleSubmit = (e) => {
     
        e.preventDefault();
        setDisabled(true)
       
        fetch("/reservations/newreservation", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:user.name, email:user.email, created:moment().format('llll'), tools: Object.values(selectedTools), datereserved: selectedDate}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Success! :", data);
              setLoanDetails(data.data)
              console.log(data.data)
              navigate(`/loanconfirmation/${data.data._id}`)

           
        //     //   showPost();
            
        //       // setToggle(!toggle);
            })
            .catch((error) => {
              console.log("Error! :", error);
            //  optional:  navigate("/posterror");
            });


    console.log(disabled)
    }


    useEffect (() => {
 //stops the function if date selected is null (it will execuse again as soon as selectedDate state changes)
      if ( !selectedDate) {
        return 
      }
     //datepicker gives us a date object that has to be formatted to look like year-month-date for the address params - the db still keeps the long timestamp as a string
     const formattedDate = `${1900 + selectedDate.getYear() }-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`

      fetch(`/reservations/${formattedDate}/tools`)
      .then((res) => res.json())
      .then((data) => {
       console.log(data);
        if (data.status > 299) {
       
            throw new Error(data.message);
            
          } else {
              setWhichToolsAreBookedForDate(data.data.tools);
              
              setStatus("idle");
              
          }
      })
      .catch((error) => {
          // navigate("/error");
          console.log(error)
      });
      

    }, [selectedDate])

    const isNotBooked = tool => { return whichToolsAreBookedForDate &&  !whichToolsAreBookedForDate.includes(tool)}


    return ( <>

    { status === "loading" ? (
        <SpinnerDiv>

          <Spinner name="chasing-dots" color="#9a8939"/>

        </SpinnerDiv>
      ) :
   ( <FormWrapper>
    <Shedh2>
      Reserve tools from the shed!
    </Shedh2> 

    <Form onSubmit={handleSubmit}>
        <ChoicesDiv>   
          <LoanCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
         <ul>

          {toolsState && toolsState.map((obj)=>{

          return    <ToolLi  key={obj._id}>
              {/* make the handlechange function push the checked items with setSelectedTools */}
             <span>   <input type="checkbox" name={obj.tool} value={obj.tool}  onChange={handleChange} 
             disabled = { !whichToolsAreBookedForDate || !isNotBooked(obj.tool) }
/>
        
            <label>
             {` ${obj.tool}`}
            </label> </span>  <ImgSpan><ToolImg src={obj.imgSrc} alt={`${obj.tool}`}></ToolImg></ImgSpan>
      
                    
                
                  </ToolLi>
                  

             }) }
         </ul>
         </ChoicesDiv> 
           
        <LoanButton type="submit" disabled={disabled}>Create Reservation</LoanButton>
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
margin: 2% 30% 150px 30%;




background: hsla(49, 46%, 41%, 0.2);
min-width: 200px;
padding: 8% 3% 6% 3%;
border-radius:  69% 85% 57% 36% / 52% 44% 29% 20%   ;
box-shadow: 0 3px 6px 0 rgba(59, 22, 14, 0.2), 0 2px 9px 0 rgba(59, 22, 14, 0.19);



`;
const ToolImg = styled.img`
height: 50px;
width: auto;
max-width: 100px;
border-radius: 5px;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;

const ToolLi = styled.li`
font-weight: 500;
display:flex;
/* gap: 5px; */
/* align-items: center; */
/* */
width: 20vw;
min-width: 200px;
justify-content: space-between;
padding-left: 0;
margin-bottom: 2%;
padding-top: 2%;

`;

const ImgSpan = styled.span`

display: flex;
flex-direction: column;

width: 80px;
background-color: whitesmoke;
padding:2px; 
 border-radius: 5px;

`;

const Form = styled.form`

display:flex;
flex-direction: column;

/* align-items:center; */
`

const ChoicesDiv = styled.div`
margin-left: 3%;
/* display: flex;

flex-wrap:wrap; */
`

const SpinnerDiv = styled.div`

display:flex;
flex-direction: column;

justify-content: center;
height: 45vh;
align-items: center;

`

const LoanButton = styled.button`

width: 17rem;
`

const Shedh2  = styled.h2`
color: var(--hunter-green);
font-family: "MuseoModerno", cursive ;


`


