import React from 'react';
import { Link } from 'react-router-dom';



const AdminAside = () => {
    return ( <>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
   
    <Link to="/" className="brand-link">
      {/* <img  src="" alt="ertert" className="brand-image  elevation-3" */}
          {/* /> */}
      <h4 className="text-center">Datte  Aljinan</h4>
    </Link>

 
    <div className="sidebar">
     
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
        </div>
        <div className="text-center">
          <a  className="d-block">Admin </a>
        </div>
      </div>

  
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
         
          <li className="nav-item has-treeview menu-open">
            <Link to="/" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Table de Bord
              </p>
            </Link>
          </li>
          <li className="nav-item has-treeview menu-open mt-5 mb-2">
            <a  className="nav-link active bg-info">
              <i className="nav-icon fas fa-cubes"></i>
              <p>
               Catégories
              </p>
            </a>
          </li>
            <li className="nav-item">
            <Link to="/categories" className="nav-link">
                <i className="nav-icon fas fa-list text-info"></i>
                <p className="text">Liste des Catégories</p>
                </Link>
            </li>
            <li className="nav-item">
            <Link to="/categories/new" className="nav-link">
                <i className="nav-icon fas fa-plus-circle text-info"></i>
                <p>Ajouter une Catégorie</p>
                </Link>
            </li>
          <li className="nav-item has-treeview menu-open mt-3 mb-2">
            <a  className="nav-link bg-success">
              <i className="nav-icon fab fa-product-hunt"></i>
              <p>
                Produits
              </p>
            </a>
          </li>
          <li className="nav-item">
            <Link to="/product" className="nav-link">
              <i className="fas fa-list nav-icon text-success"></i>
              <p>Liste des Produits</p>
            </Link>
          </li>
              <li className="nav-item">
                <Link to="/product/new" className="nav-link">
                  <i className="fas fa-plus-circle nav-icon text-success"></i>
                   <p>Ajouter un Produits</p>
                </Link>
            </li>
            <li className="nav-item has-treeview menu-open mt-3 mb-2">
            <a href="#" className="nav-link active bg-danger">
              <i className="nav-icon fas fa-cart-plus"></i>
              <p>
                Ventes
              </p>
            </a>
          </li>
          <li className="nav-item">
            <Link to="/shops" className="nav-link">
              <i className="fas fa-list nav-icon text-danger"></i>
              <p>Liste des Ventes</p>
            </Link>
          </li>
            <li className="nav-item has-treeview menu-open mt-3 mb-3">
            <a  className="nav-link active bg-warning">
              <i className="nav-icon far fa-newspaper"></i>
              <p>
                Annonces 
              </p>
            </a>
          </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <i className="fas fa-list nav-icon text-warning"></i>
                <p>Liste des Annonces</p>
              </Link>
            </li>
                <li className="nav-item">
                  <Link to="/posts/new" className="nav-link">
                    <i className="fas fa-plus-circle nav-icon text-warning"></i>
                    <p>Ajouter une Annonce</p>
                  </Link>
              </li>
        </ul>
      </nav>
    
    </div>
  
  </aside>

    
    
    </> );
}
 
export default AdminAside;