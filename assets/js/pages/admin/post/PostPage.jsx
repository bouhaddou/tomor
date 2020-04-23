import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../Component/Pagination';
import PostApi from '../../../services/PostApi';


const PostPage = () => {
    const [Posts, setPosts] = useState([])
    const [currentPage, setCurrentPage]= useState(1);
    const fetchPosts = async () =>{
        try{
         const data = await  PostApi.findAll();
             setPosts(data);
       }catch(error){
           console.log(error.response)
       }
    }
    
    
    
    useEffect(() => {
      fetchPosts();
    }, []);
    const handleChange = (id) =>{
        setCurrentPage(id);
    }
    const itemsPerPage = 6 ;
    const PaginationPosts = Pagination.getData(currentPage,itemsPerPage,Posts);

   if(!Posts){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Table de bord</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a>Accueil</a></li>
              <li className="breadcrumb-item active">Table de bord</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">Liste des Posts</h2>
    <div className="container">
        <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title text-danger">Posts ( {Posts.length} Posts)</h3>
                <h3 className="card-title text-danger float-right"><Link to="/product/new">Ajouter un Posts</Link></h3>
              </div>
              <div className="card-body p-0">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <th >Titre</th>
                      <th>Image</th>
                      <th>Date</th>
                      <th className="text-center">Content</th>
                      <th className="text-center" >action</th>
                    </tr>
                  </thead>
                  <tbody>
                {PaginationPosts.map(post => 
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td className="">
                          {/* <ul className="list-inline text-center">
                            { post.avatars != 0 && post.avatars.map((image) =>
                              <li className="list-inline-item" key={image.id}>
                                  <img style={{ maxHeight: 60, maxWidth:60  }} className="table-avatar rounded-circle text-center" src={"avatars/" +  image.filePath} alt={post.ref} />
                              </li>
                            )}
                          </ul> */}
                          image
                      </td>
                      <td>{post.setAt}</td>
                      <td>{post.content.slice(0,20)}</td>
                      <td className="project-actions text-right">
                          <Link to={"/posts/show/" + post.id} className="btn btn-primary btn-sm mr-1" >
                              <i className="fas fa-folder"> 
                              </i>     Voir
                          </Link>
                          <Link to={"/posts/"+ post.id}  className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Edit
                          </Link>
                          <Link to="/posts/delete" className="btn btn-danger btn-sm mr-1">
                              <i className="fas fa-trash">
                              </i>   Supprimer
                          </Link>
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
                length={Posts.length} />
            </div>
    </> );
}
}
 
export default PostPage;