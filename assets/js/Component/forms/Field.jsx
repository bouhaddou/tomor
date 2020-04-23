import React from 'react';


const Field = ({name,onChange,type ="text",id,error="",style,placeholder="",place="",value="" }) => (
    
        <div className={style}>
        <input
            onChange={onChange}
            type={type} 
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            className={"form-control " + (error && " is-invalid" )}
        />
        
        {error &&<p className="invalid-feedback">{error}</p>}
    </div>

 );
export default Field;