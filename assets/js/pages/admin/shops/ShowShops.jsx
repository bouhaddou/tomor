import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShopsApi from '../../../services/ShopsApi';

const ShowShops = (props) => {
    const {id} = props.match.params;
const [Shop, setShop] = useState(undefined);
const [total, setTotal] = useState(0);
const getProductFunction =async () =>{
  try{
        const data = await ShopsApi.findbyId(id)
        setShop(data) 
        let somme = 0
   
        if(data)
        {
            for(let i = 0;i < data.length ; i++)
            {
            somme = somme +  (data[i].produit.prix * data[i].Quantity) 
            setTotal(somme)
            }
      }  
  }catch(error){
      console.log(error.response)
  }
}

useEffect(() =>{
    getProductFunction()
},[])

if(!Shop){ return <div>Loading</div>}else{  return ( <>
 <div className="content-header">
      <div className="container-fluid ">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Table de bord</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item "><Link to="/"> Table de bord</Link></li>
              <li className="breadcrumb-item "><Link to="/shops"> Ventes</Link></li>
              <li className="breadcrumb-item active">Detaill de Vente</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
     
    <section className="content m-5">
        <div className="card">
            <div className="card-header">
                {/* <h3 className="card-title">Information de {Shop.title}</h3> */}
                <div className="">
                <h3 className="mt-2 text-center">informations de vente</h3>
                </div>
            </div>
        </div>
        <h4 className="mt-2 text-center text-info">informations de client</h4>
        <div className="row">
            <div className="col-md-6"> 
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th> Prénom  :</th>
                            <td>{Shop[0].client.lastName}</td>
                        </tr>
                        <tr>
                            <th> Nom :</th>
                            <td>{Shop[0].client.firstName}</td>
                        </tr>
                        <tr>
                            <th> Email :</th>
                            <td>{Shop[0].client.email}</td>
                        </tr>
                        <tr>
                            <th> Télephone  :</th>
                            <td>{Shop[0].client.phone}</td>
                        </tr>
                    </tbody>
             </table>
            </div>
            <div className="col-md-6">
            <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th> Paye :</th>
                            <td>{Shop[0].client.paye}</td>
                        </tr>
                        <tr>
                            <th> Ville :</th>
                            <td>{Shop[0].client.city}</td>
                        </tr>
                        <tr>
                            <th> Adresse principale  :</th>
                            <td>{Shop[0].client.adress}</td>
                        </tr>
                        <tr>
                            <th> Adresse Postale :</th>
                            <td>{Shop[0].client.postal}</td>
                        </tr>
                    </tbody>
             </table>
            </div>
        </div>
        <h4 className="text-center mt-2 text-info"> Les produits demandée</h4>
        <div className="mt-2">
            <table className="table table-hover">
                <thead>
                    <tr>
                         <th>Référence</th>
                         <th>Titre</th>
                         <th>Image</th>
                         <th className="text-center">Quantite</th>
                         <th className="text-center">Prix</th>
                         <th className="text-center">Total</th>
                    </tr>
                </thead>
                <thead>
                {Shop.map(pro => 
                    <tr key={pro.id}>
                         <td>{pro.produit.ref}</td>
                         <td>{pro.produit.title}</td>
                         <td>
                         <img style={{ maxHeight: 60, maxWidth:60  }} 
                         className="table-avatar rounded-circle text-center" src={"avatars/" +  pro.produit.avatars[0].filePath} />
                              
                        </td>
                         <td className="text-center">{pro.Quantity}</td>
                         <td className="text-center">{pro.produit.prix.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                         <td className="text-center">{ (pro.Quantity * pro.produit.prix).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</td>
                    </tr>
                )}
                </thead>
            </table>
        </div>
        <hr/>
        <div className="row">
            <div className="col-md-5 mb-5">
                <h3>Adresse de Livraison</h3> 
                <p className="">{Shop[0].delivery}</p>
            </div>
            <div className="col-md-7 mb-5">
                <div className="row">
                    <div className="col-md-7 ">
                        <h4 className="text-right">Montant à payer :</h4>
                    </div>
                    <div className="col-md-5">
                       <h4 className="text-center text-danger border">{total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Dhs</h4> 
                    </div>
                </div>
            </div>
        </div>
    </section>
    </> );
}
}
export default ShowShops;