import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
//github google of the css
import PropTypes from "prop-types";
import styled from "styled-components";




const LoanCalendar = ({selectedDate, setSelectedDate}) => {

 
    return (
        <DateSelectDiv>
      <p>Select Reservation Date</p>
      <DatePicker 
      selected={selectedDate} 
      onChange={date => setSelectedDate(date)} 
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      />

        </DateSelectDiv>
    );
}
 
export default LoanCalendar;

const DateSelectDiv = styled.div`
/* text-align: center; */

`