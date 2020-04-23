import React from 'react';


const FieldsAd = ({name,onChange,type ="text",error="",style="",placeholder="",value="",label }) => (
    
        <div className={style}>
         <label htmlFor={name}>{label}</label>
        <input
            onChange={onChange}
            type={type} 
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            className={"form-control " + (error && " is-invalid" )}
        />
        
        {error &&<p className="invalid-feedback">{error}</p>}
    </div>

 );
export default FieldsAd;