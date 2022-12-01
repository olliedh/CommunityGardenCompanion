
import { useState } from "react";

const Checkbox = ({ label, value, handleChange }) => {
    return (
        <>
        <input type="checkbox" name={label} value={label}  onChange={handleChange} />
        
        <label>
        {label}
      </label>
      </>
    );
  };
  export default Checkbox
