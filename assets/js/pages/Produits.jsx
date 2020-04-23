import React, { useState, useEffect } from 'react';
import produitsApi from '../services/produitsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Produits = (props) => {

  const [produits,setProduits] = useState({

  });
  const [filterProduit,setFilterProduit] = useState({});
  const [bestProduct,setBestProduct] = useState({});
  const [edi,setEdi] = useState(false);

  
  

  const fetchProduits = async () =>{
    try{
     const data = await  produitsApi.findAll();
         setProduits(data);
         setFilterProduit(data.slice(0,6))
         const nombre = Math.floor(Math.random() * (data.length - 1 + 1)) + 1;
         setBestProduct(data[nombre])
         this.props.setCartNav({})
   }catch(error){
       console.log(error.response)
   }
}



useEffect(() => {
  fetchProduits();
}, []);



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
            proLocal[index].quantity = proLocal[index].quantity + 1
            localStorage.removeItem("product") 
            localStorage.setItem("product",JSON.stringify(proLocal))
          }else{
          const quantity= 1
          proLocal.push({id,title, avatar, prix,quantity})
          localStorage.setItem("product",JSON.stringify(proLocal))
          }
          props.setCartNav(proLocal)
        }
        toast.success("le produit est ajouter au panier avec succée")
}

   if(!produits){
      return <div>loading</div>}else{ return ( <>
            <section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-between align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Produits</h2>
              <p>Very us move be blessed multiply night</p>
            </div>
            <div className="page_link">
              <a href="index.html">Home</a>
              <a href="cart.html">Cart</a>
            </div>
          </div>
        </div>
      </div>
    </section>
        <section className="cat_product_area section_gap">
            <div className="container">
                <div className="row flex-row-reverse">
                    <div className="col-lg-9">
                    <section className="inspired_product_area section_gap_bottom_custom">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-12">
                          <div className="main_title">
                            <h2><span className="text-success"> Produits</span></h2>
                            <p>Les meilleurs types de dattes au Royaume du Maroc</p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          {produits.length >0 && produits.map(produit =>
                            <div key={produit.id} className="col-lg-4 col-md-6 col-sm-12">
                              <div className="single-product">
                                <div className="product-img">
                                
                                  <img style={{ maxHeight: 165  }}  className="img-fluid w-100 h-100" src={"avatars/" +  produit.avatars[0].filePath} />
                               
                                  <div className="p_icon">
                                      <Link  to={"/ProductInfo/" + produit.id } >
                                        <i className="ti-eye"></i>
                                      </Link>
                                      <a 
                                      onClick={() => handleShop(produit)}
                                      > <i className="ti-shopping-cart"></i> </a>
                                  </div>
                                </div>
                                <div className="product-btm">
                                  <Link className="d-block text-center " to={"/ProductInfo/" + produit.id }>
                                  <h4 className="text-info text-center">{produit.title.slice(0,22)}</h4>
                                  </Link>
                                  <div className="mt-3 text-center">
                                    <h6 className="mr-4 text-center text-danger text-center">{produit.prix.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </section>

                    </div>
                    <div className="col-lg-3">
                        <div className="left_sidebar_area">
                            <aside className="left_widgets p_filter_widgets">
                                <div className="l_w_title">
                                <h3>Les dattes</h3>
                                </div>
                                <div className="widgets_inner">
                                <ul className="list">
                                {filterProduit.length > 0 && filterProduit.map(produit =>  
                                    <li key={produit.id}>
                                        <Link className="d-block text-center " to={"/ProductInfo/" + produit.id }> {produit.title}</Link>
                                    </li>
                                )}
                                </ul>
                                </div>
                            </aside>
                            <aside className="left_widgets p_filter_widgets">
                                <div className="l_w_title">
                                <h3>Facebook</h3>
                                </div>
                                <div className="widgets_inner">
                                <div className="range_item">
                                    <div id="slider-range"></div>
                                    <div className="">
                                        <label htmlFor="amount">Price : </label>
                                        <input type="text" id="amount" readOnly />
                                    </div>
                                </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="offer_area">
        {/* <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5  ">
                  <div className="" >
                      <img  className="img-fluid h-100 rounded" src={bestProduct.avatar} />
                  </div>
                </div>
                <div className="col-lg-7 text-center">
                  <div className="offer_content">
                      <h3 className="text-uppercase mb-40">{bestProduct.title}</h3>
                      <h3 className="text-uppercase">30% de promotion</h3>
                      <a href="#" className="main_btn mb-20 mt-5">voir plus</a>
                      <div className=" product-btm mt-3">
                      Prix <span className="mr-4"><strong>{bestProduct.prix} </strong>dirhams</span>
                      <del>{(bestProduct.prix * 1.20)} dirhams</del>
                    </div>
                  </div>
                </div>
            </div>
        </div> */}
  </section>                          
    
    </> );
}
}
 
export default Produits;