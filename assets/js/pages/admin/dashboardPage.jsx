import React from 'react';

const dashboardPage = ({isAuthenticated}) => {
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
                <h3>55</h3>
                <p>Gestion des Catégories</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag"></i>
              </div>
              <a href="" className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>53%</h3>
                <p className=" ">Gestion des produits</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars"></i>
              </div>
              <a  className="small-box-footer"> voir plus...<i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>

                <p>Gestion des Utilisateurs</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a  className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>

                <p>Gestion des Ventes</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <a href="#" className="small-box-footer">voir plus... <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>
    </div>
</section>
<section className="content">
    <div className="container-fluid">
        <div className="row">
        <div className="col-12">
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Les Clients plus Populaire</h3>

                <div className="card-tools">
                <div className="input-group input-group-sm" >
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                    <div className="input-group-append">
                    <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                </div>
            </div>
            <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>183</td>
                    <td>John Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-success">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>219</td>
                    <td>Alexander Pierce</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-warning">Pending</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>657</td>
                    <td>Bob Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-primary">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>175</td>
                    <td>Mike Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-danger">Denied</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12">
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Les Clients Moins Populaire</h3>

                <div className="card-tools">
                <div className="input-group input-group-sm" >
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

                    <div className="input-group-append">
                    <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                </div>
            </div>
            <div className="card-body table-responsive p-0" >
                <table className="table table-head-fixed text-nowrap">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>183</td>
                    <td>John Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-success">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>219</td>
                    <td>Alexander Pierce</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-warning">Pending</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>657</td>
                    <td>Bob Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-primary">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>175</td>
                    <td>Mike Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-danger">Denied</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>134</td>
                    <td>Jim Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-success">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>494</td>
                    <td>Victoria Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-warning">Pending</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>832</td>
                    <td>Michael Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-primary">Approved</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                    <tr>
                    <td>982</td>
                    <td>Rocky Doe</td>
                    <td>11-7-2014</td>
                    <td><span className="tag tag-danger">Denied</span></td>
                    <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>

</section>


    </> );
}
 
export default dashboardPage;