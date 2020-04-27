import React, { useState, useEffect } from 'react';
import produitsApi from '../../../services/produitsApi';
import { Link } from 'react-router-dom';
import Pagination from '../../../Component/Pagination';
import { toast } from 'react-toastify';

const ProduitsPage = () => {
    const [Produits, setProduits] = useState([])
    const [currentPage, setCurrentPage]= useState(1);
    const fetchProduits = async () =>{
        try{
         const data = await  produitsApi.findAll();
             setProduits(data);
       }catch(error){
           console.log(error.response)
       }
    }
    
    
    
    useEffect(() => {
      fetchProduits();
    }, []);
    const handleChange = (id) =>{
        setCurrentPage(id);
    }
    const itemsPerPage = 6 ;
    const PaginationProduits = Pagination.getData(currentPage,itemsPerPage,Produits);


    const handleDelete = async (id) =>{
      const tableorigine = [...Produits];
      setProduits(Produits.filter(produit => produit.id !== id));
      try{
          await  produitsApi.deleteProduits(id)
          toast.error(" le Produit a été supprimée avec succès ")
      }catch(error){
              setProduits(tableorigine);
      }
  };

if(!Produits){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Produits</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item active"> Produits</li>
              
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">Liste des Produits</h2>
    <div className="container">
        <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title text-danger">Produits ( {Produits.length} produits)</h3>
                <h3 className="card-title text-danger float-right"><Link to="/product/new" className="btn btn-block bg-gradient-warning btn-xs">Ajouter un Produit</Link></h3>
              </div>
              <div className="card-body p-0">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <th >Réf</th>
                      <th>Titre</th>
                      <th  className="text-center">Ventes</th>
                      <th className="text-center">Image</th>
                      <th className="text-center" >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                {PaginationProduits.map(produit => 
                    <tr key={produit.id}>
                      <td>{produit.ref}</td>
                      <td>{produit.title.slice(0,10)}</td>
                      <td className="text-center">
                      <span className="badge badge-primary"> {produit.shops.length} </span>
                      </td>
                      <td className="">
                          <ul className="list-inline text-center">
                            { produit.avatars != 0 && produit.avatars.map((image) =>
                              <li className="list-inline-item" key={image.id}>
                                  <img style={{ maxHeight: 60, maxWidth:60  }} className="table-avatar rounded-circle text-center" src={"avatars/" +  image.filePath} alt={produit.ref} />
                              </li>
                            )}
                          </ul>
                      </td>
                      <td className="project-actions text-right">
                          <Link to={"/product/show/" + produit.id} className="btn btn-primary btn-sm mr-1" >
                              <i className="fas fa-folder"> 
                              </i>     Voir
                          
                          </Link>
                          <Link to={"/product/"+ produit.id}  className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Edit
                          </Link>
                          <button 
                            disabled={produit.shops.length > 0}
                            className="btn btn-danger btn-sm mr-1" 
                             onClick={() => handleDelete(produit.id)}
                          >
                              <i className="fas fa-trash">
                              </i>   Supprimer
                            
                          </button>
                      </td>
                      <td>
                      
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
                length={Produits.length} />
            </div>
    </> );
}
}
 
export default ProduitsPage;