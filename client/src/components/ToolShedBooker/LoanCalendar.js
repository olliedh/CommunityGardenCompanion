import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
//github google of the css
import PropTypes from "prop-types";


const LoanCalendar = ({selectedDate, setSelectedDate}) => {

 
    return (
        <div>
      <p>Select a date for your reservation:</p>
      <DatePicker 
      selected={selectedDate} 
      onChange={date => setSelectedDate(date)} 
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      />

        </div>
    );
}
 
export default LoanCalendar;