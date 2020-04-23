import React, { useState, useEffect } from 'react';
import ContactApi from '../../../services/ContactApi';
import { Link } from 'react-router-dom';
import Pagination from '../../../Component/Pagination';


const ContactPage = () => {
    const [Contact, setContact] = useState([])
    const [currentPage, setCurrentPage]= useState(1);
    const fetchContact = async () =>{
        try{
         const data = await  ContactApi.findAll();
             setContact(data);
       }catch(error){
           console.log(error.response)
       }
    }
    
    
    
    useEffect(() => {
      fetchContact();
    }, []);
    const handleChange = (id) =>{
        setCurrentPage(id);
    }
    const itemsPerPage = 6 ;
    const PaginationContact = Pagination.getData(currentPage,itemsPerPage,Contact);

 console.log(Contact)
   if(!Contact){ return <div>chargement</div>}else{ return ( <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Table de bord</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a>Accueil</a></li>
              <li className="breadcrumb-item active ">Contact</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     <h2 className="mt-2 text-center">Liste des Contact</h2>
    <div className="container">
        <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title text-danger">Contact ( {Contact.length} Contact)</h3>
              </div>
              <div className="card-body p-0">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <th >Nom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Date</th>
                      <th className="text-center">Objet</th>
                      <th className="text-center">Message</th>
                      <th className="text-center" >action</th>
                    </tr>
                  </thead>
                  <tbody>
                {PaginationContact.map(contact => 
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.setAt}</td>
                      <td>{contact.objet}</td>
                      <td>{contact.message.slice(0,20)}</td>
                      <td className="project-actions text-right">
                          <Link to={"/product/show/" + contact.id} className="btn btn-primary btn-sm mr-1" >
                              <i className="fas fa-folder"> 
                              </i>     Voir
                          
                          </Link>
                          <Link to={"/product/"+ contact.id}  className="btn btn-info btn-sm mr-1" >
                              <i className="fas fa-pencil-alt"> 
                              </i>  Edit
                             
                          </Link>
                          <Link to="/product/delete" className="btn btn-danger btn-sm mr-1">
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
                length={Contact.length} />
            </div>
    </> );
}
}
 
export default ContactPage;