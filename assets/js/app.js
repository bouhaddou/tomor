import React,{ useState, useEffect} from 'react';
import ReactDOM from "react-dom"
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductInfo from './pages/ProductInfo';
import LoginPage from './pages/LoginPage';
import LoginApi from "./services/LoginApi";
import Checkout from './pages/checkout';
import Cart from './pages/cart';
import Contact from './pages/contact';
import BlogPage from './pages/BlogPage';
import Produits from './pages/produits';
import dashboardPage from './pages/admin/dashboardPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './Component/AdminNavbar';
import AdminAside from './Component/AdminAside';
import ProduitsPage from './pages/admin/produits/ProduitsPage';
import produitPage from './pages/admin/produits/produitPage';
import ShowProduct from './pages/admin/produits/ShowProduct'
import CategoriesPage from './pages/admin/categories/CategoriesPage';
import ShowCategorie from './pages/admin/categories/ShowCategorie';
import CategoriePage from './pages/admin/categories/CategoriePage';
import CommandePage from './pages/admin/shops/CommandePage';
import ShowShops from './pages/admin/shops/ShowShops'
import ContactPage from './pages/admin/contact/ContactPage';
import PostPage from './pages/admin/post/PostPage';
import PostsPage from './pages/admin/post/PostsPage';
import ShowPost from './pages/admin/post/ShowPost';
import AdminFooter from './Component/AdminFooter';
import {I18nProvider,LOCALES} from './i18n'
import {FormattedMessage} from 'react-intl'
import translate from './i18n/translate'
LoginApi.setup();
const App = () => {
    const [cartNav, setCartNav] = useState([])
    const [lang, setLang]= useState(LOCALES.FRENSH)
    const funcNav = () =>{
           const x = JSON.parse(localStorage.getItem("product"));
           if(x){
           setCartNav(x)
           }
           console.log(x)
      }
      
      useEffect(() =>{
        funcNav()
      },[])
    
    const [isAuthenticated, setIsAuthenticated] = useState(LoginApi.isAuthenticated)  ;
    const PrivatRoute = ({path, isAuthenticated, component}) =>{
        return isAuthenticated ? 
           <Route path={path} isAuthenticated={isAuthenticated} component={component} /> 
           : 
           <Redirect to="/login" />
       }   


    return ( <>
        <I18nProvider locale={lang}>
         <div className="">
        <HashRouter>
            {!isAuthenticated && <Navbar cartNav={cartNav} setLang={setLang}  lang={lang} />}
            {isAuthenticated && <AdminNavbar />}
            {isAuthenticated && <AdminAside />}
            <Switch>
              
                {!isAuthenticated && <Route path="/login"  render={props => (  <LoginPage  onLogin={setIsAuthenticated} {...props} /> )} />}
                {!isAuthenticated && <Route  path="/produits" render={props=>{return <Produits setCartNav={setCartNav}  lang={lang} {...props} /> }} />}
                {!isAuthenticated && <Route path="/ProductInfo/:id" render={props=> { return <ProductInfo setCartNav={setCartNav} {...props} /> }} />}
                {!isAuthenticated &&<Route path="/cart" render={props=>{ return <Cart setCartNav={setCartNav}  lang={lang} {...props} />  }} /> }
                {!isAuthenticated && <Route path="/checkout" component={Checkout} />}
                {!isAuthenticated && <Route path="/contact" component={Contact} />}
                {!isAuthenticated && <Route path="/blogPage" component={BlogPage} /> }
                {!isAuthenticated && <Route path="/" render={props=>{return <HomePage setLang={setLang} setCartNav={setCartNav} lang={lang} {...props} /> }} /> }
                <div className="content-wrapper">
                <Switch>
                <PrivatRoute path="/posts/show/:id" component={ShowPost} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/posts/:id" component={PostPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/posts" component={PostsPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/AdminContact" component={ContactPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/shops/show/:id" component={ShowShops} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/shops" component={CommandePage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/categories/show/:id" component={ShowCategorie} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/categories/:id" component={CategoriePage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/categories" component={CategoriesPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/product/show/:id" component={ShowProduct} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/product/:id" component={produitPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/product/new" component={produitPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/product" component={ProduitsPage} isAuthenticated={isAuthenticated}  />
                <PrivatRoute path="/" component={dashboardPage} isAuthenticated={isAuthenticated}  />
                   </Switch>
                </div>
            </Switch>
            {!isAuthenticated &&<Footer />}
            {isAuthenticated && <AdminFooter />}
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </HashRouter>
        </div>
        </I18nProvider>
    </> );
}
 
const rootElement = document.querySelector('#App');
ReactDOM.render(<App/>,rootElement);