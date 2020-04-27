import React, { useState, useEffect } from 'react';
import produitsApi from '../services/produitsApi';
import Produits from './Produits';
import { Link } from 'react-router-dom';


const ProductInfo = (props) => {
  const  par  = props.match.params.id;
  const [produit,setProduit] = useState(undefined);
  const [edi,setEdi] = useState(false);
  const [cart, setCart] = useState({});



  const fetchProduit= async () =>{
    try{
     const  {id,ref,title,content,prix,setAt,observation,avatars} = await produitsApi.findbyId(par)
      setProduit({id,ref,title,content,prix,setAt,observation,avatars})
      const quantity = 1
      setCart({id,title,avatars,prix,quantity})
      const donnee = JSON.parse(localStorage.getItem("product"))
      if(donnee !== null)
      {
        const  existid = donnee.filter(pro => pro.id === id)
        if(existid.length > 0)
        {
          setCart({...cart, quantity: existid[0].quantity})
        }
      }
           
    }catch(error){
        console.log(error.response);
    }
}
useEffect(() =>{
  fetchProduit();
 
},[])
const handleShop =(param) => {
  const data = localStorage.getItem("product")
  if(data === null)
  {
    const quantity= 1
    const {id,title, avatar, prix} = param
    localStorage.setItem("product",JSON.stringify([{id,title, avatar, prix,quantity}]))
    props.setCartNav({id,title, avatar, prix,quantity})
  }else{
    const {id,title, avatar, prix} = param
    const proLocal = JSON.parse(localStorage.getItem("product"));
    const  existid = proLocal.filter(produit => produit.id === id)
    if(existid.length > 0)
    {
      const index = proLocal.findIndex(x => x.id === existid[0].id )
      proLocal[index].quantity = cart.quantity 
      localStorage.removeItem("product") 
      localStorage.setItem("product",JSON.stringify(proLocal))
      props.setCartNav(proLocal)
    }else{
    const quantity= 1
    proLocal.push({id,title, avatar, prix,quantity})
    localStorage.setItem("product",JSON.stringify(proLocal))
    props.setCartNav(proLocal)
    }
  }
}

  const handleChange = event =>{
    const {id,avatar,title, prix} = produit;
    setCart({id,avatar,title, prix});
    const {value, name}  = event.currentTarget;
    setCart({...cart, [name]: parseFloat(value)})
  }
  if(!produit){ return <div>loading</div>}else{  return ( <>
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
  
    <div className="product_image_area">
      <div className="container">
        <div className="row s_product_inner">
          <div className="col-lg-6">
            <div className="s_product_img">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
              
                {produit.avatars.map(function(image, index) {  
                  return <li key={image.id} data-target="#carouselExampleIndicators" 
                  data-slide-to={index} className={"  " + (index == 0 && " active ")}>
                    <img className="w-100 h-100" src={"avatars/" +  image.filePath} alt=""/>
                  </li>
                } )}
                </ol>
                <div className="carousel-inner">
                
                {produit.avatars.map(function(image, index){
                  return <div  key={image.id} className={"carousel-item  " + (index == 0 && " active")}>
                    <img
                      className="d-block w-100"
                      src={"avatars/" +  image.filePath}
                      alt="First slide"
                    />
                  </div>
                  })}
                  
                 
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="s_product_text">
              <h3>{produit.title}</h3>
              <h2>{ produit.prix.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } Dirhams</h2>
              <ul className="list">
                <li>
                  <a className="active" href="#">
                    <span>Réference</span> : {produit.ref}</a>
                </li>
                <li>
                  <a href="#"> <span>Disponibilité</span> : En Stock</a>
                </li>
              </ul>
              <p>
               {produit.content}
              </p>
              
                <div className="row">
                  <div className="col-md-3">  
                  <div className="form-group">
                    <label className="h5" >Quantité:  {}</label></div>
                  </div>
                  <div className="col-md-4">
                  <div className="form-group">

                  <input type="number" 
                  className="form-control" 
                  id={cart.quantity}  
                  name="quantity"  
                  onChange={handleChange} 
                  value={cart.quantity} />
                   
                  </div>
                  </div>
                  <div className="col h6">kg</div>
              </div>
              <div className="card_area">
                
                <a className="main_btn" 
                onClick={() => handleShop(produit)}
                >Ajouter au panier</a>
                <a className="icon_btn" href="#">
                  <i className="lnr lnr lnr-diamond"></i>
                </a>
                <a className="icon_btn" href="#">
                  <i className="lnr lnr lnr-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 



























    <section className="product_description_area">
      <div className="container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              >Description</a
            >
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              >Specification</a
            >
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <p>
              Beryl Cook is one of Britain’s most talented and amusing artists
              .Beryl’s pictures feature women of all shapes and sizes enjoying
              themselves .Born between the two world wars, Beryl Cook eventually
              left Kendrick School in Reading at the age of 15, where she went
              to secretarial school and then into an insurance office. After
              moving to London and then Hampton, she eventually married her next
              door neighbour from Reading, John Cook. He was an officer in the
              Merchant Navy and after he left the sea in 1956, they bought a pub
              for a year before John took a job in Southern Rhodesia with a
              motor company. Beryl bought their young son a box of watercolours,
              and when showing him how to use it, she decided that she herself
              quite enjoyed painting. John subsequently bought her a child’s
              painting set for her birthday and it was with this that she
              produced her first significant work, a half-length portrait of a
              dark-skinned lady with a vacant expression and large drooping
              breasts. It was aptly named ‘Hangover’ by Beryl’s husband and
            </p>
            <p>
              It is often frustrating to attempt to plan meals that are designed
              for one. Despite this fact, we are seeing more and more recipe
              books and Internet websites that are dedicated to the act of
              cooking for one. Divorce and the death of spouses or grown
              children leaving for college are all reasons that someone
              accustomed to cooking for more than one would suddenly need to
              learn how to adjust all the cooking practices utilized before into
              a streamlined plan of cooking that is more efficient for one
              person creating less
            </p>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <h5>Width</h5>
                    </td>
                    <td>
                      <h5>128mm</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Height</h5>
                    </td>
                    <td>
                      <h5>508mm</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Depth</h5>
                    </td>
                    <td>
                      <h5>85mm</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Weight</h5>
                    </td>
                    <td>
                      <h5>52gm</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Quality checking</h5>
                    </td>
                    <td>
                      <h5>yes</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Freshness Duration</h5>
                    </td>
                    <td>
                      <h5>03days</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>When packeting</h5>
                    </td>
                    <td>
                      <h5>Without touch of hand</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Each Box contains</h5>
                    </td>
                    <td>
                      <h5>60pcs</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    </> );
}}
 
export default ProductInfo;