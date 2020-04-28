import React, { useState, useEffect } from 'react';
import Field from '../Component/forms/Field';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import translate from '../i18n/translate';
const Cart = ({setCartNav}) => {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const fetchProduit= async () =>{
    try{
      
      const donnee = JSON.parse(localStorage.getItem("product"))
      if(donnee !== null)
      {
          setCart(donnee)
      }
           
    }catch(error){
        console.log(error.response);
    }
}

  useEffect(() => {
    fetchProduit();
  },[])

  const totalfun = () =>{
    let somme = 0
    const donnee = JSON.parse(localStorage.getItem("product"))
    if(donnee)
    {
    for(let i = 0;i < donnee.length ; i++)
    {
      somme = somme +  (donnee[i].prix * donnee[i].quantity) 
     setTotal(somme)
     localStorage.setItem("total",JSON.stringify(somme));
    }
    if(donnee.length == 0){
      
      setTotal(0)
      localStorage.setItem("total",JSON.stringify(0));
    }
  }
  }  
  useEffect(() => {
    totalfun()
  },[])
  const handleChange = event =>{
  const {name, value} = event.currentTarget;
  const donnee = JSON.parse(localStorage.getItem("product"))
  const  existid = donnee.filter(pro => pro.id === parseFloat(name))
  const index = donnee.findIndex(x => x.id === existid[0].id )
  donnee[index].quantity = value
  localStorage.removeItem("product") 
  localStorage.setItem("product",JSON.stringify(donnee))
  setCartNav(donnee)
  setCart(donnee)
  totalfun()
}

const handleRemoveItem = (event) =>{
  const  name = event.currentTarget.id;
  const dat = localStorage.getItem("product");
  const del = JSON.parse(dat);
  const aaa =  del.filter(item => item.id !== parseFloat(name))
  localStorage.removeItem("product")
  localStorage.setItem("product",JSON.stringify(aaa))
  toast.error("bien supprimer le produit dans panier")
  const data2 = localStorage.getItem("product");
  setCart(JSON.parse(data2));
  setCartNav(JSON.parse(data2))
  totalfun()
  if(cart.length == 0){
    setTotal(0)
  }


 
}

if(!cart){return <div>loading</div>}else{ return ( <>
    
    <div className=" container content-header bg-color">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{translate("Panier")} </h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item "><Link to="/"> {translate("BORD")}</Link></li>
              <li className="breadcrumb-item active">{translate("Panier")}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <section className="cart_area">
      <div className="container">
        <div className="cart_inner">
          <div className="table-responsive">
            <h2>{translate("Panier")} ({cart.length} {translate("PRODUCTS")})</h2>
            <table className="table">
              <thead>
                <tr>
                  
                  <th scope="col">{translate("PRODUCT")}</th>
                  <th className="text-center" scope="col"></th>
                  <th scope="col"> {translate("PRIX")}</th>
                  <th scope="col">{translate("QTE")}</th>
                  <th scope="col">{translate("STOTAL")} </th>
                  <th className="text-center" scope="col">{translate("SUPPRODUCT")} </th>
                </tr>
              </thead>
              <tbody>
              {cart.length >0 && cart.map(produit =>
                <tr key={produit.id}>
                  <td>
                      <div className=" imag-pro">
                        <img className=""
                           src={"avatars/" +  produit.image } alt={produit.title}
                          alt=""
                        />
                      </div>
                      
                  </td>
                  <td><div className=" ">
                          <p>{produit.title}</p> 
                      </div></td>
                  <td>
                    <h5 className="prix">{produit.prix.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {translate("DHS")} </h5> 
                  </td>
                  <td>
                    <div className="prix">
                    <input type="number" className="form-control" id={produit.id}  name={produit.id}  onChange={handleChange} value={produit.quantity} />
                    </div>
                  </td>
                  <td>
                    <h4 className="text-danger ">{(produit.prix * produit.quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } {translate("DHS")}</h4>
                  </td>
                  <td className="text-center">
                  <a onClick={handleRemoveItem} id={produit.id}  className="text-danger"><i className="fas fa-trash-alt "></i> {translate("SUPPRODUCT")}</a>
                  </td>
                </tr>
              )}
              <tr>
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
              </tr>
               <tr>
                   
               <td></td><td></td>
                  <td></td>
                  <td>
                  <div className="checkout_btn_inner">
                    <h5>{translate("STOTAL")}</h5>
                    </div>
                  </td>
                  <td>
                      <h4>{total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {translate("DHS")} </h4>
                  </td>
                </tr>
                <tr>
                  <td></td>  
                  <td></td>
                  <td></td>
                  <td>
                    <h5>{translate("TRANSPORT")} </h5>
                  </td>
                  <td>
                    <h5>{translate("TRANSPORTMESS")}</h5>
                  </td>
                </tr>
                <tr>
                  <td></td>  
                  <td></td>
                  <td></td>
                  <td>
                    <h5>{translate("TOTAL")}</h5>
                  </td>
                  <td>
                    <h3 className="text-danger ">{total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {translate("DHS")} </h3>
                  </td>
                </tr>
                <tr>
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
                <td></td> 
                
              </tr>
                <tr className="out_button_area">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="checkout_btn_inner">
                    <Link  className={" btn btn-info  " + (cart == "" && "  ")} to="/produits"> {translate("ACHAT")}  </Link>
                    </div>
                  </td>
                  <td>
                    <div className="checkout_btn_inner">
                    <Link  className={"main_btn  " + (cart == "" && "  ")} to="/checkout"> {translate("CAISSE")}</Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
              
           
          </div>
        </div>
      </div>
    </section>

    </> );
}}
export default Cart;