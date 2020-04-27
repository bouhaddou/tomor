import React, { useState, useEffect } from 'react';
import PostApi from '../../services/PostApi'
import ShopsApi from '../../services/ShopsApi'
import ProduitsApi from '../../services/ProduitsApi'
import CategorieApi from '../../services/CategorieApi'
import { Link } from 'react-router-dom';

const dashboardPage = ({isAuthenticated}) => {

  const [Categories,setCategories] = useState([])
  const [Produits,setProduits] = useState([])
  const [Shops,setShops] = useState([])
  const [Posts,setPosts] = useState([])

  const getALlTable =async () =>{
      try{
        const dataPosts = await PostApi.findAll()
        setPosts(dataPosts)
        const dataShops = await ShopsApi.findAll()
        setShops(dataShops)
        const dataProduit = await ProduitsApi.findAll()
        setProduits(dataProduit)
        const dataCategorie = await CategorieApi.findAll()
        setCategories(dataCategorie)
      }catch(error){
        console.log(error.response)
      }
  }

  useEffect(() =>{
    getALlTable()
  },[])

    return ( <>

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Table de bord</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Accueil</a></li>
              <li className="breadcrumb-item active">Table de bord</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section className="content" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{Categories.length}</h3>
                <p>Gestion des Catégories</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag"></i>
              </div>
              <Link to="/categories" className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{Produits.length}</h3>
                <p className=" ">Gestion des produits</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars"></i>
              </div>
              <Link to="/product" className="small-box-footer"> voir plus...<i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{Posts.length}</h3>
                <p>Gestion des Annonces</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <Link to="/posts" className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>{Shops.length}</h3>
                <p>Gestion des Ventes</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <Link to="/shops" className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
        </div>
    </div>
</section>

<div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Online Store Visitors</h3>
                  <a href="javascript:void(0);">View Report</a>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <p className="d-flex flex-column">
                    <span className="text-bold text-lg">820</span>
                    <span>Visitors Over Time</span>
                  </p>
                  <p className="ml-auto d-flex flex-column text-right">
                    <span className="text-success">
                      <i className="fas fa-arrow-up"></i> 12.5%
                    </span>
                    <span className="text-muted">Since last week</span>
                  </p>
                </div>
                <div className="position-relative mb-4"><div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand"><div className="">
                    </div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                  <canvas id="visitors-chart" height="200" width="395" className="chartjs-render-monitor" 
                  style={{  width: 395, height: 200,}}></canvas>
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <span className="mr-2"><i className="fas fa-square text-primary"></i> This Week</span>
                  <span>
                    <i className="fas fa-square text-gray"></i> Last Week
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header border-0">
                <h3 className="card-title">Products</h3>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-sm">
                    <i className="fas fa-download"></i>
                  </a>
                  <a href="#" className="btn btn-tool btn-sm">
                    <i className="fas fa-bars"></i>
                  </a>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-striped table-valign-middle">
                  <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>More</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      <img src="./img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                      Some Product
                    </td>
                    <td>$13 USD</td>
                    <td>
                      <small className="text-success mr-1">
                        <i className="fas fa-arrow-up"></i>
                        12%
                      </small>
                      12,000 Sold
                    </td>
                    <td>
                      <a href="#" className="text-muted">
                        <i className="fas fa-search"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                      Another Product
                    </td>
                    <td>$29 USD</td>
                    <td>
                      <small className="text-warning mr-1">
                        <i className="fas fa-arrow-down"></i>
                        0.5%
                      </small>
                      123,234 Sold
                    </td>
                    <td>
                      <a href="#" className="text-muted">
                        <i className="fas fa-search"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                      Amazing Product
                    </td>
                    <td>$1,230 USD</td>
                    <td>
                      <small className="text-danger mr-1">
                        <i className="fas fa-arrow-down"></i>
                        3%
                      </small>
                      198 Sold
                    </td>
                    <td>
                      <a href="#" className="text-muted">
                        <i className="fas fa-search"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./img/default-150x150.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                      Perfect Item
                      <span className="badge bg-danger">NEW</span>
                    </td>
                    <td>$199 USD</td>
                    <td>
                      <small className="text-success mr-1">
                        <i className="fas fa-arrow-up"></i>
                        63%
                      </small>
                      87 Sold
                    </td>
                    <td>
                      <a href="#" className="text-muted">
                        <i className="fas fa-search"></i>
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Sales</h3>
                  <a href="javascript:void(0);">View Report</a>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <p className="d-flex flex-column">
                    <span className="text-bold text-lg">$18,230.00</span>
                    <span>Sales Over Time</span>
                  </p>
                  <p className="ml-auto d-flex flex-column text-right">
                    <span className="text-success">
                      <i className="fas fa-arrow-up"></i> 33.1%
                    </span>
                    <span className="text-muted">Since last month</span>
                  </p>
                </div>

                <div className="position-relative mb-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                  <canvas id="sales-chart" height="200" style={{ width: 395, height: 200,}} width="395" className="chartjs-render-monitor"></canvas>
                </div>

                <div className="d-flex flex-row justify-content-end">
                  <span className="mr-2">
                    <i className="fas fa-square text-primary"></i> This year
                  </span>

                  <span>
                    <i className="fas fa-square text-gray"></i> Last year
                  </span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header border-0">
                <h3 className="card-title">Online Store Overview</h3>
                <div className="card-tools">
                  <a href="#" className="btn btn-sm btn-tool">
                    <i className="fas fa-download"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-tool">
                    <i className="fas fa-bars"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                  <p className="text-success text-xl">
                    <i className="ion ion-ios-refresh-empty"></i>
                  </p>
                  <p className="d-flex flex-column text-right">
                    <span className="font-weight-bold">
                      <i className="ion ion-android-arrow-up text-success"></i> 12%
                    </span>
                    <span className="text-muted">CONVERSION RATE</span>
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                  <p className="text-warning text-xl">
                    <i className="ion ion-ios-cart-outline"></i>
                  </p>
                  <p className="d-flex flex-column text-right">
                    <span className="font-weight-bold">
                      <i className="ion ion-android-arrow-up text-warning"></i> 0.8%
                    </span>
                    <span className="text-muted">SALES RATE</span>
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-0">
                  <p className="text-danger text-xl">
                    <i className="ion ion-ios-people-outline"></i>
                  </p>
                  <p className="d-flex flex-column text-right">
                    <span className="font-weight-bold">
                      <i className="ion ion-android-arrow-down text-danger"></i> 1%
                    </span>
                    <span className="text-muted">REGISTRATION RATE</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </> );
}
 
export default dashboardPage;