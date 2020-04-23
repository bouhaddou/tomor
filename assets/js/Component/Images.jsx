import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Images = ({fileImage,handleDeleteImage}) => {
   if(fileImage.length == 0 ){return <div>no image</div>}else{  
       return ( <>
        <h2>Les images</h2>
        <div className="row">
         {fileImage.length > 0 && fileImage.map( image =>
            <div key={image.id} className="col-md-3 border m-1 mb-2">
                 <button  onClick={() => handleDeleteImage(image.id)}
                 className="float-right text-danger btn"><i className="fas fa-times"></i></button>
                    <img style={{ maxWidth: 200, maxHeight: 150 , height: 149  }} className="img-fuild w-100 h-100 mb-2" key={image.id} className="img-fluid w-100" src={"avatars/" +  image.filePath} />
            </div>
         )} 
        </div>
       
        
       
    </> );
}
} 
export default Images;