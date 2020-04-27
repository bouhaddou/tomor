import React, { useEffect, useState } from 'react';
import produitsApi from '../../../services/produitsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ShowProduct = (props) => {
    const {id} = props.match.params;
const [produit, setProduit] = useState(undefined);
const getProductFunction =async () =>{
  try{
        const data = await produitsApi.findbyId(id)
        setProduit(data)        
  }catch(error){
      console.log(error.response)
  }
}

useEffect(() =>{
    getProductFunction()
},[])

const handleDelete = async (id) =>{
    const tableorigine = [...produit];
    setProduit(produit.filter(produi => produi.id !== id));
    try{
        await  produitsApi.deleteProduits(id)
        toast.error(" le Produit a été supprimée avec succès ")
    }catch(error){
            setProduits(tableorigine);
    }
}

  if(!produit){ return <div>Loading</div>}else{  return ( <>
 <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Informations de produit</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/product"> produit</Link></li>
              <li className="breadcrumb-item active">Information de produit</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">informations</h2>
    <section className="content">
        <div className="card">
        <div className="card-header">
            <h3 className="card-title">Information de {produit.title}</h3>
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
                    <td>{produit.id}</td>
                </tr>
                <tr>
                    <th> Référence :</th>
                    <td>{produit.ref}</td>
                </tr>
                <tr>
                    <th> Titre :</th>
                    <td>{produit.title}</td>
                </tr>
                <tr>
                    <th> Date de publication :</th>
                    <td>{produit.setAt}</td>
                </tr>
                <tr>
                    <th> Image :</th>
                    <td>
                        <div className="row">
                            { produit.avatars.map((image) =>
                            
                            <div className="col-md-3 m-3">       
                                    <img key={image.id} style={{ maxHeight: 150, maxWidth:200, height: 149  }} className="table-avatar rounded text-center m-2" src={"avatars/" +  image.filePath} alt={produit.ref} />
                            </div>     
                            )}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th> Prix :</th>
                    <td>{produit.prix}</td>
                </tr>
                <tr>
                    <th> Description :</th>
                    <td>{produit.content}</td>
                </tr>
                <tr>
                    <th> Observation :</th>
                    <td>{produit.observation}</td>
                </tr>
               <tr>
                   <th>Actions</th>
                   <td>
                          <Link to={"/product/" + produit.id } className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Modifier
                             
                          </Link>
                          <button 
                             onClick={() => handleDelete(produit.id)}
                            disabled={produit.shops.length > 0}
                            className="btn btn-danger btn-sm mr-1">
                              <i className="fas fa-trash">
                              </i>   Supprimer
                          </button>
                          <Link to="/product"  className="btn btn-info btn-sm mr-1" >
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
export default ShowProduct;