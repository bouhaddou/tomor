import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blogApi from '../services/blogApi';
import { Link } from 'react-router-dom';
import PostApi from '../services/PostApi';
import produitsApi from '../services/produitsApi';



const BlogPage = () => {

  const [blogItem, setBlogItem] = useState(undefined)
  const [recentBlog, setRecentBlog] = useState({})
  const [filterProduit,setFilterProduit] = useState({});

  const fetchBlog =async () => {
    try{
      const dataProduit = await  produitsApi.findAll();
      setFilterProduit(dataProduit.slice(0,6))
    const data = await PostApi.findAll()
    setBlogItem(data)
    setRecentBlog(data.slice(0,4))
  }catch(error){
    console.log(error.response)
  }
  }

  useEffect(() =>{
    fetchBlog()
  },[])
    
    if(!blogItem){ return <div>Chargement</div>}else{ return ( <>
    
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
  <section className="blog_area section_gap">
      <div className="container">
          <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                  <div className="blog_left_sidebar">
               
                  {blogItem.map(blo =>
                      <article className="blog_item" key={blo.id}>
                        <div className="blog_item_img">
                          <img style={{ maxHeight: 400  }} className="card-img rounded-0" src={"avatars/" +  blo.avatars[0].filePath}  alt={blo.title}/>
                          <a href="#" className="blog_item_date">
                            <h3>15</h3>
                            <p>Jan</p>
                          </a>
                        </div>
                        
                        <div className="blog_details">
                            <a className="d-inline-block" href="single-blog.html">
                                <h2>{blo.title}</h2>
                            </a>
                            <p>{blo.content}</p>
                            <ul className="blog-info-link">
                              <li><a ><i className="ti-user"></i> Admin</a></li>
                            </ul>
                        </div>
                      </article>
                    )}
                      <nav className="blog-pagination justify-content-center d-flex">
                          <ul className="pagination">
                              <li className="page-item">
                                  <a href="#" className="page-link" aria-label="Previous">
                                      <span aria-hidden="true">
                                          <span className="ti-arrow-left"></span>
                                      </span>
                                  </a>
                              </li>
                              <li className="page-item">
                                  <a href="#" className="page-link">1</a>
                              </li>
                              <li className="page-item active">
                                  <a href="#" className="page-link">2</a>
                              </li>
                              <li className="page-item">
                                  <a href="#" className="page-link" aria-label="Next">
                                      <span aria-hidden="true">
                                          <span className="ti-arrow-right"></span>
                                      </span>
                                  </a>
                              </li>
                          </ul>
                      </nav>
                  </div>
              </div>
              <div className="col-lg-4">
                  <div className="blog_right_sidebar">
                      <aside className="single_sidebar_widget search_widget">
                          <form >
                            <div className="form-group">
                              <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Search Keyword" />
                                <div className="input-group-append">
                                  <button className="btn" type="button"><i className="ti-search"></i></button>
                                </div>
                              </div>
                            </div>
                            <button className="main_btn rounded-0 w-100" type="submit">Search</button>
                          </form>
                      </aside>

                      <aside className="single_sidebar_widget popular_post_widget">
                          <h3 className="widget_title">Recent Post</h3>
                        {recentBlog.length > 0 && recentBlog.map(recent =>
                          <div className="media post_item" key={recent.id}>
                              <img style={{ maxHeight: 150, maxWidth:120  }} className="img-fuild" src={"avatars/" +  recent.avatars[0].filePath} alt={recent.title} />
                              <div className="media-body">
                                  <a href="single-blog.html">
                                      <h3>{recent.title}</h3>
                                      <h6>{recent.setAt}</h6>
                                  </a> <p>{recent.content.slice(0,20)}</p>
                                 
                              </div>
                          </div>
                         )}
                      </aside>
                      <aside className="single_sidebar_widget tag_cloud_widget">
                          <h4 className="widget_title">Tag Clouds</h4>
                          <ul className="list">
                          {filterProduit.length > 0 && filterProduit.map(produit => 
                              <li key={produit.id}>
                                  <Link  to="">{produit.title.slice(0,10)}</Link>
                              </li>
                          )}
                           
                          </ul>
                      </aside>


                      <aside className="single_sidebar_widget instagram_feeds">
                        <h4 className="widget_title">Instagram Feeds</h4>
                        <ul className="instagram_row flex-wrap">
                        {filterProduit.length > 0 && filterProduit.map(produit =>   
                            <li key={produit.id}>
                                <Link to="">
                                  <img className="img-fluid" src={"avatars/" +  produit.avatars[0].filePath} alt={produit.title.slice(0,15)} />
                                </Link>
                            </li>
                        )}
                        </ul>
                      </aside>


                      <aside className="single_sidebar_widget newsletter_widget">
                        <h4 className="widget_title">Newsletter</h4>

                        <form action="#">
                          <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter email" required />
                          </div>
                          <button className="main_btn rounded-0 w-100" type="submit">Subscribe</button>
                        </form>
                      </aside>
                  </div>
              </div>
          </div>
      </div>
  </section>
    
    </> );
}
}
export default BlogPage;