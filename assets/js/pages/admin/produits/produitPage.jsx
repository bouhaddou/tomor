import React, { useState, useEffect } from 'react';
import FieldsAd from '../../../Component/forms/FieldsAd';
import CategorieApi from '../../../services/CategorieApi';
import Select from '../../../Component/forms/Select';
import axios from 'axios';
import { toast } from 'react-toastify';
import Images from '../../../Component/Images';
import produitsApi from '../../../services/produitsApi';
import { Link } from 'react-router-dom';

const produitPage = (props) => {
    const {id = "new"} = props.match.params;
    const [fileImage, setFileImage] = useState([])
    const [editing, setEditing] = useState(false)
    const [categories, setCategories] = useState(undefined)
    const [produit, setProduit] = useState({
      ref:"",
      Categorie:"",
      title:"",
      content:"",
      prix:"",
      observation:"",
    })  
    const [error, setError] = useState({
        ref:"",
        Categorie:"",
        title:"",
        content:"",
        prix:"",
        observation:"",
        file:""
    })


    const CategorieItem =async () =>{
        try{
            const data = await  CategorieApi.findAll()
            setCategories(data) 
          
            if(id != "new"){
              const data2 = await produitsApi.findbyId(id)
              setProduit(data2)
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
       }
        if(name == "prix")
        {
        setProduit({...produit, [name] : parseFloat(value)})
        }else{
        setProduit({...produit, [name] : value})
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
   
  const handleSubmit =async event =>{
    event.preventDefault();
        try{
          if(fileImage.length > 0 &&  produit.Categorie != null ){
            if(editing){
                await axios.put("http://localhost:8000/api/produits/"+ id,{...produit, 
                Categorie:`/api/categories/${produit.Categorie}`, ...fileImage,
                    avatars: fileImage.map(img => 
                    `/api/avatars/${img.id}`)
                  });
                  toast.success("Le produit a été Modifier Avec succée ")
            }else{
              await axios.post("http://localhost:8000/api/produits",{...produit, 
              Categorie:`/api/categories/${produit.Categorie}`, ...fileImage,
                  avatars: fileImage.map(img => 
                  `/api/avatars/${img.id}`)
                });
                toast.success("Le produit a été Ajouter Avec succée ")
            }
              props.history.push("/product");
              }else{
                if(produit.Categorie == null){
                 setError({ ...error, Categorie : "la categorie ne doit pas être vide "})
                 toast.error("merci de choisie la catégorie de produit ")
                }else {
               
                setError({ ...error, file : "Aucune image n'a été trouvée "})
                toast.error("Aucune image n'a été trouvée ")
                }
              
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

if(!categories){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">
            {!editing ? <span> Ajouter un produit </span> : <span> Modifier un produit </span> }
            </h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/product"> produit</Link></li>
              <li className="breadcrumb-item active">
              {!editing ? <span> Ajouter un produit </span> : <span> Modifier un produit </span> }
              </li>
            </ol>
          </div>
        </div>
    </div>
    </div>
    {!editing ? <h2 className="text-center mt-2 mb-3">Ajouter un Produit</h2> :
      <h2 className="text-center mt-2 mb-3">Modifier un Produit</h2> }      
    <div className="card card-primary container">
              <div className="card-header">
                <h3 className="card-title">Information Produit</h3>
              </div>
              <form role="form mr-5 ml-5" onSubmit={handleSubmit} encType="multipart/form-data"  >
                <div className="card-body">
                <FieldsAd type="text" placeholder="Réference : " style="form-group"
                    label="Réference :"
                    value={produit.ref} 
                    name="ref"
                    error={error.ref}
                    onChange={handleChange}
                />
                 <FieldsAd type="text" placeholder="Titre : " style="form-group"
                    label="Titre :"
                    value={produit.title} 
                    name="title"
                    error={error.title}
                    onChange={handleChange}
                />
                 <Select name="Categorie" id="Categorie" label="List des categories :" error={error.Categorie} value={produit.Categorie} onChange={handleChange} >
                    {categories.map(categorie => 
                    <option key={categorie.id} value={categorie.id}>{categorie.title} </option>
                    )}
                </Select>
                 <FieldsAd type="number" placeholder="prix" style="form-group"
                    label="prix :"
                    value={produit.prix} 
                    name="prix"
                    error={error.prix}
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
                    value={produit.content} 
                    name="content"
                    error={error.content}
                    onChange={handleChange}
                />
                <FieldsAd type="text" placeholder="observation  " style="form-group "
                    label="observation :"
                    value={produit.observation} 
                    name="observation"
                    error={error.observation}
                    onChange={handleChange}
                />
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-success mr-2">Sauvegarder</button>
                  <Link to="/product"  className="btn btn-primary" >
                      <i className="fas fa-back"> 
                      </i>  Retour
                  </Link>
                </div>
              </form>
            </div>
    
    </> );
}
}
export default produitPage;