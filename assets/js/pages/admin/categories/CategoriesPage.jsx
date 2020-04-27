import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../Component/Pagination';
import CategorieApi from '../../../services/CategorieApi';
import { toast } from 'react-toastify';

const CategoriesPage = () => {
    const [Categories, setCategories] = useState([])
    const [currentPage, setCurrentPage]= useState(1);
    const fetchCategories = async () =>{
        try{
         const data = await  CategorieApi.findAll();
             setCategories(data);
       }catch(error){
           console.log(error.response)
       }
    }
    
    useEffect(() => {
      fetchCategories();
    }, []);
    const handleChange = (id) =>{
        setCurrentPage(id);
    }
    const itemsPerPage = 6 ;
    const PaginationCategories = Pagination.getData(currentPage,itemsPerPage,Categories);

    const handleDelete = async (id) =>{
      const tableorigine = [...Categories];
      setCategories(Categories.filter(Categorie => Categorie.id !== id));
      toast.error(" la catégorie a été supprimée avec succès ")
      try{
          await  CategorieApi.deleteCategorie(id)
      }catch(error){
              setProduits(tableorigine);
      }
      
  };

   if(!Categories){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Catégories</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item active">Categories</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
      <h2 className="mt-2 text-center">Liste des Categories</h2>
    <div className="container">
        <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title text-danger">Categories ( {Categories.length} Categories)</h3>
                <h3 className="card-title text-danger float-right"><Link to="/categories/new" className="btn btn-block bg-gradient-warning btn-xs">Ajouter une Categorie</Link></h3>
              </div>
              <div className="card-body p-0">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <th >id</th>
                      <th>Titre</th>
                      <th className="text-center">Produits</th>
                      <th className="text-center">description</th>
                      <th className="text-center" >action</th>
                    </tr>
                  </thead>
                  <tbody>
                {PaginationCategories.map(categorie => 
                    <tr key={categorie.id}>
                      <td>{categorie.id}</td>
                      <td>{categorie.title.slice(0,20)}</td>
                      <td className="text-center">
                      <span className="badge badge-primary"> {categorie.produits.length} </span>
                      </td>
                      <td style={{ maxWidth : 200}}>{categorie.content.slice(0,200)}</td>
                      <td className="project-actions text-center">
                          <Link to={"/categories/show/" + categorie.id} className="btn btn-primary btn-sm mr-1" >
                              <i className="fas fa-folder"> 
                              </i>     Voir
                          </Link>
                          <Link to={"/categories/"+ categorie.id}  className="btn btn-info btn-sm mr-1 " >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Edit
                          </Link>
                          <button
                          disabled={categorie.produits.length > 0}
                          onClick={() => handleDelete(categorie.id)}
                              className="btn btn-danger btn-sm mr-1">
                              <i className="fas fa-trash">
                              </i>   Supprimer
                          </button>
                      </td>
                    </tr>
                )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
           
            <div className="d-flex justify-content-center">
            <Pagination 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                handleChange={handleChange} 
                length={Categories.length} />
            </div>
    </> );
}
}
 
export default CategoriesPage;