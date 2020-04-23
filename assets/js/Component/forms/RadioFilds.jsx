import React from 'react';


const RadioFilds = ({name,onChange,type ="text",id,error="",label="",style,value="" }) => (
    
        <div className={style}>
        <input
            onChange={onChange}
            type={type} 
            
            name={name}
            id={id}
            value={value}
            className={"form-check-input " + (error && " is-invalid" )}
        />
        <label htmlFor={id} className={error && "form-check-label is-invalid "}>{label}</label>
      
    </div>

 );
export default RadioFilds;