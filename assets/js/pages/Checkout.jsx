import React, { useEffect, useState } from 'react';
import $ from "jquery"
import Field from '../Component/forms/Field';
import axios from 'axios';
import RadioFilds from '../Component/forms/RadioFilds';
import { toast } from 'react-toastify';
const Checkout = ({props}) => {

  const [montant , setMontant] = useState(0);
  const [client,setClient] = useState({
    firstName : "",
    lastName : "",
    company : "",
    email : "",
    phone : "",
    paye : "",
    city : "",
    postal : "",
    password:""
  })
  const [error,setError] = useState({
    firstName : "",
    lastName : "",
    company : "",
    email : "",
    phone : "",
    paye : "",
    city : "",
    postal : "",
    password:"",
    type:"",
    status:"",
    delivery:""
  })
  const [user,setUser] = useState({
    email : "",
    password : ""
  })
  const [errorUser,setErrorUser] = useState({
    email : "",
    password : ""
  })
  const [shop,setShop] = useState([{
    produit:"",
    client:"",
    quantity:"",
    type:"",
    status:false,
    delivery:""
  }])
  const [type,setType] = useState("");
  const [status,setStatus] = useState(false);
  const [clientId,setClientId] = useState();
  const [produit,setProduit] = useState({})

  const getAllproduit = () =>{
    const idclient = 2
    const element =[]
    const donnee = JSON.parse(localStorage.getItem("product"));
  if(donnee){
    for( let i=0 ; i < donnee.length; i++ )
    { 
      element.push({produit:donnee[i].id,client:idclient,quantity:donnee[i].quantity,type:type})
    }  
     setShop({shop:element})
  }
  }
  const handlemss = () =>{ 
    $('.bihi').on('click', function(){  $('.bihibihi').toggle();});
    $('.coponclick').on('click', function(){ $('.copponhide').toggle();});
    $('.passshow').on('click', function(){  $('.passshide').toggle();});
    $('.adressshow').on('click', function(){$('.adresshide').toggle();});
  }

 useEffect(() =>{
  getAllproduit()
  calculTotal()
  $('.bihibihi').hide(); $('.copponhide').hide(); $('.passshide').hide(); $('.adresshide').hide();
 },[])

  const handlSubmit =async event => {
    event.preventDefault();
    try{
    const response = await axios.post("http://localhost:8000/api/clients",client)
    const element =[]
    const donnee = JSON.parse(localStorage.getItem("product"));
 
  // try{
    for( let i=0 ; i < donnee.length; i++ )
    { 
      element.push({produit:donnee[i].id,client:response.data.id,quantity: parseFloat(donnee[i].quantity),type:type,status:status,delivery:shop.delivery})
    }  
    
    for(let j=0; j<element.length;j++){
      await  axios.post("http://localhost:8000/api/shops", {
            ...shop,   produit : `/api/produits/${element[j].produit}`, 
            client : `/api/clients/${element[j].client}`,
            Quantity:element[j].quantity, 
            type:element[j].type,
            status:element[j].status, 
            delivery:element[j].delivery
          });
    }
    localStorage.removeItem("product")
    localStorage.removeItem("total")
    toast.success("votre commande a été bien envoyer ")
    props.history.push("/");
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


  const handleChange = event =>{
    const {name,value} = event.currentTarget;
    setClient({...client, [name]:value})
    const checked =  event.currentTarget.checked;
    if(name == "type"){
    setType(value)
    }
    if(name == "status"){
      setStatus(checked)
    }
    
  }


  const calculTotal = () =>{
    const montant = localStorage.getItem("total");
    setMontant(parseFloat(montant));
  }

    return ( <>
    
    <section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-between align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Paiement du produit</h2>
              <p>.............</p>
            </div>
            <div className="page_link">
              <a href="index.html">Accueil</a>
              <a href="checkout.html">Paiement</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="checkout_area section_gap">
      <div className="container">
        <div className="returning_customer">
          <div className="check_title mb-3">
            <span className="h5">Déja Inscrit : </span>
             <button 
               
               className="bihi btn-link"
                onClick={handlemss}
              >Cliquez ici pour vous connecter</button>
          </div>
          <div className="bihibihi">
          <p>
          Si vous avez déjà fait des achats chez nous, veuillez saisir vos 
          coordonnées dans les cases ci-dessous. Si vous êtes un nouveau client,
                  & veuillez passer à la section Facturation et expédition.
          </p>
          
          <form className="row contact_form" >
            <Field type="text" placeholder="email " style="col-md-6 form-group p_star"
                value={user.email} 
                name="emailUser"
                id="emailUser"
                error={errorUser.email}
                onChange={handleChange}
                />
            <Field type="text" placeholder="mot de passe " style="col-md-6 form-group p_star"
                value={user.password} 
                name="passwordUser" 
                id="passwordUser" 
                error={errorUser.password}
                onChange={handleChange}
                />
            <div className="col-md-12 form-group">
              <button type="submit" value="submit" className="btn submit_btn">
              se connecter
              </button>
            </div>
          </form>
          </div>
        </div>
        <div className="cupon_area">
          <div className="check_title">
           <span className="h5"> Avez-vous un coupon ?</span>
           
              <button className="coponclick"
              onClick={handlemss}
              >Cliquez ici pour entrer votre code</button>
            
          </div>
          <div className="copponhide">
              <input type="text" placeholder="Enter coupon code" />
              <a className="tp_btn" href="#">Appliquer le Coupon</a>
          </div>
        </div> 
        <form className="row contact_form" onSubmit={handlSubmit} >
        <div className="billing_details">
          <div className="row">
            <div className="col-lg-8">
              <h3>Détails de la facturation</h3>
             
                <Field type="text" placeholder="Prénom " style="col-md-6 form-group p_star"
                id="firstName" 
                name="firstName" 
                value={client.firstName}
                error={error.firstName}
                onChange={handleChange}
                />
                <Field type="text" placeholder="Nom " style="col-md-6 form-group p_star"
                id="lastName"
                name="lastName"
                value={client.lastName}
                error={error.lastName}
                onChange={handleChange}
                />
                 <Field type="text" placeholder="Nom d'entreprise " style="col-md-12 form-group " place="Nom d'entreprise"
                value={client.company} 
                name="company" 
                id="company" 
                error={error.company}
                onChange={handleChange}
                />
                <Field type="text" placeholder="Email " style="col-md-12 form-group p_star"
                value={client.email} 
                name="email"
                id="email"
                error={error.email}
                onChange={handleChange}
               />
               <Field type="number" placeholder="Numéro de téléphone " style="col-md-6 form-group p_star"
                value={client.phone} 
                name="phone" 
                id="phone" 
                error={error.phone}
                onChange={handleChange}
                />
                 <Field type="text" placeholder="paye " style="col-md-6 form-group p_star"
                value={client.paye} 
                name="paye" 
                id="paye" 
                error={error.paye}
                onChange={handleChange}
                />
                <Field type="text" placeholder="ville " style="col-md-12 form-group p_star"
                value={client.city} 
                name="city"
                id="city"
                error={error.city}
                onChange={handleChange}
                />
                <Field type="text" placeholder="Adresse " style="col-md-12 form-group p_star"
                value={client.adress} 
                name="adress" 
                id="adress" 
                error={error.adress}
                onChange={handleChange}
                />
                <Field type="number" placeholder="code Postale " style="col-md-6 form-group p_star"
                value={client.postal} 
                name="postal" 
                id="postal" 
                error={error.postal}
                onChange={handleChange}
                />
               
                <div className="col-md-12 form-group">
                  <div className="creat_account">
                    <button type="button" className="passshow" onClick={handlemss} >Créer un compte?</button>
                  </div>
                </div>
                <Field type="password" placeholder="Mot de passe " style="col-md-12 form-group passshide p_star" 
                id={client.password}
                name="password"
                value={client.password}
                id="password"
                error={error.password}
                onChange={handleChange}
                />
                <div className="col-md-12 form-group ">
                  <div className="creat_account">
                    <h3>Les détails d'expédition</h3>
                    <p >Livrer à une adresse différente?</p>
                  </div>
                  <div >
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows="5"
                      placeholder="Notes d'ordre"
                    ></textarea>
                  </div>
                </div>
            </div>
            <div className="col-lg-4">
              <div className="order_box">
                <h2>Votre commande</h2>
                <ul className="list">
                  <li>
                    <a href="#"
                      >produit
                      <span>Total</span>
                    </a>
                  </li>
                </ul>
                <ul className="list list_2">
                  <li>
                    <a href="#"
                      >Sous-total
                      <span>{montant.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#"
                      >Montant de livraison 
                      <span>50.00 Dhs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#"
                      >Total
                      <span>{(montant + 50).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</span>
                    </a>
                  </li>
                </ul>
                <div className="">
                  
                  <RadioFilds type="radio" label="le Régelement par cheque" style="creat_account"  
                  id="option1" value="CHEQUE" 
                  name="type"
                  checked="CHEQUE"
                  error={error.type}
                  onChange={handleChange}
                  />
                  
                  <p>
                  Effectuez un virement vers l'un des noms mentionnés puis envoyez-nous 
                  le numéro de virement pour confirmer 
                  </p>
                </div>
                <div className=" ">
                <RadioFilds type="radio" label="le Régelement  a la réception" style="creat_account"  
                  id="option12" 
                  value="RECEPTION" 
                  name="type"
                  checked="RECEPTION"
                  error={error.type}
                  onChange={handleChange}
                  />
                  <p>
                    Payez à la livraison directement.                 
                  </p>
                </div>
                <div className="creat_account">
                <RadioFilds type="checkbox"  style="" label="J'ai lu et j'accepte les"  
                  name="status"
                  id="status"
                  checked={shop.status}
                  error={error.status}
                  onChange={handleChange}
                  />
                  <a href="#"> conditions &  générales *</a>
                </div>
                <button type="submit" className="main_btn" >Confirmer la commande</button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </section>
    
    </> );
}
 
export default Checkout;