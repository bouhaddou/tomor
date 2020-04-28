import React, { useState } from 'react';
import Field from '../Component/forms/Field';
import axios from 'axios';
import contactApi from '../services/contactApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Contact = () => {

  const [contact, setContact] = useState({
    name:"",
    phone:"",
    email:"",
    message:"",
    objet:""
  })
  const [error, setError] = useState({
    name:"",
    phone:"",
    email:"",
    message:"",
    objet:""
  })



  const handleSubmit =async event =>{
    event.preventDefault();
    try{
      const response = await contactApi.PostItem(contact)
      toast.success("votre message a été envoyer avec succée  ")
    }catch({response}){
      const { violations } = response.data;
      if(violations){
          const apiErrors = {};
          violations.forEach(({propertyPath,message})  => {
              apiErrors[propertyPath] = message;
          });
  
         setError(apiErrors);
         toast.error(" Merci de vérifiee tous les champs avant de envoyer votre message  ")
      }
  }

  }


  const handleChange = event =>{
    const {name,value} = event.currentTarget;
    setContact({...contact, [name]:value})
    
    
  }

    return ( <>
      <div className=" container content-header bg-color">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Produits</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item "><Link to="/"> accueil</Link></li>
                    <li className="breadcrumb-item active">Produits</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

  <section className="section_gap">
    <div className="container">
      <div className="d-none d-sm-block mb-5 pb-4">
        <div id="map" ></div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">contactez nous</h2>
        </div>
        <div className="col-lg-8 mb-4 mb-lg-0">
          <form className="form-contact contact_form" onSubmit={handleSubmit}>
            <div className="row">
              
              <Field type="text" placeholder="tapez votre Nom Complet !!" style="col-md-6 form-group "
                value={contact.name} 
                name="name" 
                id="name" 
                error={error.name} 
                onChange={handleChange}
                />
                <Field type="text" placeholder="tapez l'objet de message " style="col-md-6 form-group "
               value={contact.objet} 
               name="objet" 
               id="objet" 
               error={error.objet} 
               onChange={handleChange}
                />
                <Field type="email" placeholder="tapez votre Email !!" style="col-md-6 form-group "
                value={contact.email} 
                name="email" 
                id="email" 
                error={error.email} 
                onChange={handleChange}
                />
              
                <Field type="text" placeholder="tapez votre Numero de téléphone" style="col-md-6 form-group "
                 value={contact.phone} 
                 name="phone" 
                 id="phone" 
                 error={error.phone} 
                 onChange={handleChange}
                />
                <div className="col-md-12">
                <div className="form-group">
                    <textarea value={contact.message}    onChange={handleChange}  className={"form-control " + (error.message && " is-invalid" )} name="message" id="message" cols="30" rows="9" placeholder="Tapez votre Message"></textarea>
                    {error.message &&<p className="invalid-feedback">{error.message}</p>}
                </div>
              </div>
                  
            <div className="form-group mt-lg-3">
              <button type="submit" className="main_btn">Envoyer le message</button>
            </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-home"></i></span>
            <div className="media-body">
              <h3>Maroc , Ouarzazate</h3>
              <p>Ait kdif, N°  91770</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-tablet"></i></span>
            <div className="media-body">
              <h3><a href="tel:454545654">+212 618 911 741</a></h3>
              <p>Du lundi au vendredi de 9h à 18h</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-email"></i></span>
            <div className="media-body">
              <h3><a href="mailto:support@colorlib.com"> DATTESALJINAN@GMAIL.COM</a></h3>
              <p>Envoyez-nous votre demande !</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </> );
}
 
export default Contact;