import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostApi from '../../../services/PostApi'
import { toast } from 'react-toastify';
const ShowPost = (props) => {
    const {id} = props.match.params;
const [Post, setPost] = useState(undefined);
const getProductFunction =async () =>{
  try{
        const data = await PostApi.findbyId(id)
        setPost(data)        
  }catch(error){
      console.log(error.response)
  }
}

useEffect(() =>{
    getProductFunction()
},[])

const handleDelete = async (id) =>{
    const tableorigine = [...Post];
    setPost(Post.filter(produi => produi.id !== id));
    try{
        await  PostApi.deletePosts(id)
        toast.error(" l'Annonce  a été supprimée avec succès ")
    }catch(error){
            setPost(tableorigine);
    }
}

  if(!Post){ return <div>Loading</div>}else{  return ( <>
 <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Informations de l'annonce</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/posts"> Annonce</Link></li>
              <li className="breadcrumb-item active">Information de l'annonce</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">informations</h2>
    <section className="content">
        <div className="card">
        <div className="card-header">
            <h3 className="card-title text-info"> {Post.title}</h3>
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
                    <td>{Post.id}</td>
                </tr>
                <tr>
                    <th> Titre :</th>
                    <td>{Post.title}</td>
                </tr>
                <tr>
                    <th className="w-25"> Date de publication :</th>
                    <td>{Post.setAt}</td>
                </tr>
                <tr>
                    <th> Image :</th>
                    <td>
                        <div className="row">
                            { Post.avatars.map((image) =>
                            
                            <div className="col-md-3 m-3">       
                                  <img key={image.id} style={{ maxHeight: 150, maxWidth:200, height: 149  }} 
                                  className="table-avatar rounded text-center m-2" src={"avatars/" +  image.filePath} alt={Post.title} />
                            </div>     
                            )}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th> Description :</th>
                    <td>{Post.content}</td>
                </tr>
               <tr>
                   <th>Actions</th>
                   <td>
                          <Link to={"/posts/" + Post.id } className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Modifier
                             
                          </Link>
                          <button 
                             onClick={() => handleDelete(Post.id)}
                             className="btn btn-danger btn-sm mr-1">
                              <i className="fas fa-trash">
                              </i>   Supprimer
                          </button>
                          <Link to="/posts"  className="btn btn-info btn-sm mr-1" >
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
export default ShowPost;