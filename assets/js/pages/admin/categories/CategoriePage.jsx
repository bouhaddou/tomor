import React, { useState, useEffect } from 'react';
import FieldsAd from '../../../Component/forms/FieldsAd';
import CategorieApi from '../../../services/CategorieApi';
import Select from '../../../Component/forms/Select';
import axios from 'axios';
import { toast } from 'react-toastify';


const CategoriePage = (props) => {
    const {id = "new"} = props.match.params;
    const [editing, setEditing] = useState(false)
    const [categorie, setCategorie] = useState({
      title:"",
      content:""
    })  
    const [error, setError] = useState({
      title:"",
      content:""
    })
 console.log(id)

    const CategorieItem =async () =>{
       
        try{
            if(id != "new"){
              const data = await CategorieApi.findbyId(id)
              setCategorie(data)
              setEditing(true)
              console.log("ok")
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
        setCategorie({...categorie, [name] : value})
    }
  const handleSubmit =async event =>{
    event.preventDefault();
        try{
        
            if(editing){
                await axios.put("http://localhost:8000/api/categories/"+ id,categorie);
                  toast.success("La categorie a été Modifier Avec succée ")
                props.history.push('/categories');

            }else{
              await axios.post("http://localhost:8000/api/categories",categorie);
                toast.success("La categorie a été Ajouter Avec succée ")
                props.history.push('/categories');
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


  if(!categorie){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Table de bord</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Accueil</a></li>
              <li className="breadcrumb-item active">Table de bord</li>
            </ol>
          </div>
        </div>
    </div>
    </div>
    <h2 className="text-center mt-2 mb-2">Ajouter une Catégorie</h2>        
    <div className="card card-primary container">
              <div className="card-header">
                <h3 className="card-title">Information de la categorie</h3>
              </div>
              <form role="form mr-5 ml-5" onSubmit={handleSubmit} encType="multipart/form-data"  >
                <div className="card-body">
                    <FieldsAd type="text" placeholder="Titre  " style="form-group"
                        label="Titre :"
                        value={categorie.title} 
                        name="title"
                        error={error.title}
                        onChange={handleChange}
                    />
                    <FieldsAd type="text" placeholder="Content  " style="form-group"
                    label="content :"
                    value={categorie.content} 
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
export default CategoriePage;