import React, { useState, useEffect } from 'react';
import FieldsAd from '../../../Component/forms/FieldsAd';
import axios from 'axios';
import { toast } from 'react-toastify';
import Images from '../../../Component/Images';
import PostApi from '../../../services/PostApi';
import { Link } from 'react-router-dom';

const PostPage = (props) => {
    const {id = "new"} = props.match.params;
    const [fileImage, setFileImage] = useState([])
    const [editing, setEditing] = useState(false)
    const [post, setpost] = useState({
      title:"",
      content:"",
      file:"",
    })  
    const [error, setError] = useState({
        title:"",
        content:"",
        file:"",
    })


    const CategorieItem =async () =>{
        try{
            if(id != "new"){
              const data2 = await PostApi.findbyId(id)
              console.log(data2.avatars)
              setpost(data2)
              setEditing(true)
              setFileImage(data2.avatars)
            }
          
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(() =>{
        CategorieItem()
    },[])

    const handleChange =async event =>{
        const {value,name} = event.currentTarget;
        const  dd =new FormData();
        try{
            if(name == "file"){
              dd.append('file',event.target.files[0],event.target.files[0].name);
              const response = await axios.post("http://localhost:8000/api/avatars",dd)
              setFileImage(fileImage => [...fileImage,response.data])
              setError({ ...error, file : ""})
            }else{
              setpost({...post, [name] : value})
            }
      }catch({response}){
        const { violations } = response.data;
        if(violations){
            const apiErrors = {};
            violations.forEach(({propertyPath,message})  => {
                apiErrors[propertyPath] = message;
            });
            setError(apiErrors);
            toast.error(" Merci de vérifiee tous les champs avant de passer la commande  ")
      }
      }
    }
   console.log(fileImage)
  const handleSubmit =async event =>{
    event.preventDefault();
        try{
          if(fileImage.length > 0  ){
            if(editing){
                await axios.put("http://localhost:8000/api/annonces/"+ id,{...post
                ,  ...fileImage, avatars: fileImage.map(img => `/api/avatars/${img.id}`) 
              });
                  toast.success("Le post a été Modifier Avec succée ")
            }else{
              await axios.post("http://localhost:8000/api/annonces",{...post, 
               ...fileImage, avatars: fileImage.map(img => `/api/avatars/${img.id}`) 
                });
                toast.success("Le post a été Ajouter Avec succée ")
            }
              props.history.push("/posts");
              }else{
                setError({ ...error, file : "Aucune image n'a été trouvée "})
                toast.error("Aucune image n'a été trouvée ")
              }
              
            }catch({response}){
              const { violations } = response.data;
              if(violations){
                  const apiErrors = {};
                  violations.forEach(({propertyPath,message})  => {
                      apiErrors[propertyPath] = message;
                  });
                  setError(apiErrors);
                  toast.error(" Merci de vérifiee tous les champs avant de passer la commande  ")
            }
      }
}

const handleDeleteImage = id =>{
  const tableorigine = [...fileImage];
        setFileImage(fileImage.filter(fileimg => fileimg.id !== id));
      
}
console.log(post)
  if(!post){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">
            {!editing ? <span> Ajouter une Annonce </span> : <span> Modifier une Annonce </span> }
            </h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/posts"> Annonces</Link></li>
              <li className="breadcrumb-item active">
                {!editing ? <span> Ajouter une Annonce </span> : <span> Modifier une Annonce </span> }
              </li>
            </ol>
          </div>
        </div>
    </div>
    </div>
    {!editing ? <h2 className="text-center mt-2 mb-3">Ajouter une Annonce</h2> :
           <h2 className="text-center mt-2 mb-3">Modifier une Annonce</h2>   }       
    <div className="card card-primary container">
              <div className="card-header">
                <h3 className="card-title">Information d'Annonce</h3>
              </div>
              <form role="form mr-5 ml-5" onSubmit={handleSubmit} encType="multipart/form-data"  >
                <div className="card-body">
                 <FieldsAd type="text" placeholder="Titre : " style="form-group"
                    label="Titre :"
                    value={post.title} 
                    name="title"
                    error={error.title}
                    onChange={handleChange}
                />
                 <FieldsAd type="file" placeholder="Image  " style="form-group"
                    label="Image :"
                    name="file"
                    error={error.file}
                    onChange={handleChange}
                />
                <div className="">
                    <Images  fileImage={fileImage} handleDeleteImage={handleDeleteImage} />
                </div>
                <FieldsAd type="text" placeholder="Content  " style="form-group"
                    label="content :"
                    value={post.content} 
                    name="content"
                    error={error.content}
                    onChange={handleChange}
                />
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">Sauvgarder</button>
                </div>
              </form>
            </div>
    
    </> );
}
}
export default PostPage;