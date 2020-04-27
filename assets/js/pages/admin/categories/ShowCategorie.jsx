import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorieApi from '../../../services/CategorieApi';
import { toast } from 'react-toastify';

const ShowCategorie = (props) => {
    const {id} = props.match.params;
const [Categorie, setCategorie] = useState(undefined);

const getProductFunction =async () =>{
  try{
        const data = await CategorieApi.findbyId(id)
        setCategorie(data)        
  }catch(error){
      console.log(error.response)
  }
}

useEffect(() =>{
    getProductFunction()
},[])

const handleDelete = async (id) =>{
    const tableorigine = [...Categorie];
    setCategorie(Categorie.filter(categor => categor.id !== id));
    toast.error(" la catégorie a été supprimée avec succès ")
    try{
        await  CategorieApi.deleteCategorie(id)
    }catch(error){
            setProduits(tableorigine);
    }
    
};

  if(!Categorie){ return <div>Loading</div>}else{  return ( <>
 <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Informations de la Categorie</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/categories"> Categories</Link></li>
              <li className="breadcrumb-item active">Information de la Categorie</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">informations</h2>
    <section className="content">
        <div className="card">
        <div className="card-header">
            <h3 className="card-title text-center text-info"> {Categorie.title}</h3>
            <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i className="fas fa-minus"></i></button>
            </div>
        </div>
        <div className="card-body">
        <table className="table table-hover">
            <tbody>
                <tr className="">
                    <th> Id :</th>
                    <td>{Categorie.id}</td>
                </tr>
                <tr>
                    <th> Titre :</th>
                    <td>{Categorie.title}</td>
                </tr>
                <tr>
                    <th className="w-25"> Date de publication :</th>
                    <td>{Categorie.setAt}</td>
                </tr>
                <tr>
                    <th> Description :</th>
                    <td>{Categorie.content}</td>
                </tr>
               <tr>
                   <th>Actions</th>
                   <td>
                          <Link to={"/categories/" + Categorie.id } className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Modifier
                          </Link>
                          <button 
                                disabled={Categorie.produits.length > 0}
                                onClick={() => handleDelete(Categorie.id)}
                                className="btn btn-danger btn-sm mr-1">
                                <i className="fas fa-trash">
                                </i> Supprimer
                          </button>
                          <Link to="/categories"  className="btn btn-primary btn-sm mr-1" >
                             <i className="fas fa-back"> 
                                </i>  Retour
                            </Link>
                   </td>
               </tr>
            </tbody>
        </table>
       
        </div>
      
        </div>

    </section>
    </> );
}
}
export default ShowCategorie;