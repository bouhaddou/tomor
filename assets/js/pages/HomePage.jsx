import React, { useState, useEffect } from 'react';

import BlogPage from './BlogPage';
import Slider from '../Component/Slider';
import produitsApi from '../services/produitsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HomePage = (props) => {
    const [produits,setProduits] = useState({});
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

console.log(bestProduct)
    if(!produits){
    return <div>loading</div>}else{ 
        return ( <>
            <Slider />
           
  <section className="inspired_product_area section_gap_bottom_custom">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="main_title">
            <h2><span className="text-success"> Nouveaux produits</span></h2>
            <p>Les meilleurs Produits au Royaume du Maroc</p>
          </div>
        </div>
      </div>

      <div className="row">
          {filterProduit.length >0 && filterProduit.map(produit =>
            <div key={produit.id} className="col-lg-3 col-md-6 col-sm-12">
              <div className="single-product">
                <div className="product-img">
                  <img className="img-fluid w-100" src={"avatars/" +  produit.avatars[0].filePath}  />
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
                  <h4 className="text-info">{produit.title.slice(0,22)}</h4>
                  </Link>
                  <div className="mt-3 text-center">
                    <h6 className="mr-4 text-center text-danger">{produit.prix.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</h6>
                  </div>
                </div>
              </div>
            </div>
           )}
      </div>
    </div>
  </section>
  <section className="offer_area">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5  ">
                  <div className="" >
                      {/* <img  className="img-fluid h-100 rounded" src={bestProduct && bestProduct.avatar} /> */}
                      {/* <img style={{ maxHeight: 165  }}  className="img-fluid w-100 h-100" src={bestProduct && ("avatars/" +  bestProduct.avatars.filePath)} /> */}
                  </div>
                </div>
                <div className="col-lg-7 text-center">
                  <div className="offer_content">
                      <h3 className="text-uppercase mb-40">{bestProduct &&bestProduct.title}</h3>
                      <h3 className="text-uppercase">30% de promotion</h3>
                      <a href="#" className="main_btn mb-20 mt-5">voir plus</a>
                      <div className=" product-btm mt-3">
                      Prix <span className="mr-4"><strong>{bestProduct && bestProduct.prix} </strong>Dhs</span>
                      <del>{bestProduct && (bestProduct.prix * 1.20).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</del>
                    </div>
                  </div>
                </div>
            </div>
        </div>
  </section>
            
  <section className="blog-area section-gap">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="main_title">
            <h2><span>latest blog</span></h2>
            <p>Bring called seed first of third give itself now ment</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single-blog">
            <div className="thumb">
              <img className="img-fluid" src="img/b1.jpg" alt="" />
            </div>
            <div className="short_details">
              <div className="meta-top d-flex">
                <a href="#">By Admin</a>
                <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
              </div>
              <a className="d-block" href="single-blog.html">
                <h4>Ford clever bed stops your sleeping
                  partner hogging the whole</h4>
              </a>
              <div className="text-wrap">
                <p>
                  Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                  Forth.
                </p>
              </div>
              <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6">
          <div className="single-blog">
            <div className="thumb">
              <img className="img-fluid" src="img/b2.jpg" alt="" />
            </div>
            <div className="short_details">
              <div className="meta-top d-flex">
                <a href="#">By Admin</a>
                <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
              </div>
              <a className="d-block" href="single-blog.html">
                <h4>Ford clever bed stops your sleeping
                  partner hogging the whole</h4>
              </a>
              <div className="text-wrap">
                <p>
                  Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                  Forth.
                </p>
              </div>
              <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="single-blog">
            <div className="thumb">
              <img className="img-fluid" src="img/b3.jpg" alt="" />
            </div>
            <div className="short_details">
              <div className="meta-top d-flex">
                <a href="#">By Admin</a>
                <a href="#"><i className="ti-comments-smiley"></i>2 Comments</a>
              </div>
              <a className="d-block" href="single-blog.html">
                <h4>Ford clever bed stops your sleeping
                  partner hogging the whole</h4>
              </a>
              <div className="text-wrap">
                <p>
                  Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light
                  Forth.
                </p>
              </div>
              <a href="#" className="blog_btn">Learn More <span className="ml-2 ti-arrow-right"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
           
    </> );
}
}
export default HomePage;