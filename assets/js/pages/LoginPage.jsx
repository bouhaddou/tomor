import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import LoginApi from '../services/LoginApi';
import Field from '../Component/forms/Field';


const LoginPage = ({onLogin , history}) => {
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    });
    const [error , setError] = useState("");

    const handleChange = (event) =>{
        const {value, name} = event.currentTarget;
        setCredentials({...credentials, [name] : value});
    }

    const handleSubmit =async event =>{
        event.preventDefault();
        try{
           await LoginApi.autheticate(credentials);
           setError("");
           onLogin(true);
      toast.success("vous êtes bien connectée ")
        history.push("/dashboard");

        }catch(error){
            setError(" Aucun compte ne poséde pas cette Adresse ou alors les informations ne correspondent pas");
        }
    }

    return (<>
        
<div className=" container hold-transition login-page  backCOLO" >
  <div className="login-logo">
    <a href=""><b>Authentification</b>Admin</a>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Connectez-vous pour  <br/> démarrer votre session</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
        <Field 
                    style=""
                        label="Adresse Email" 
                        name="username"  
                        value={credentials.username} 
                        onChange={handleChange}
                        placeholder="Adresse email de connexion"
                        error={error}
                        type="text"
                        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
        <Field 
                      style=""
                        label="Mot de Passe " 
                        name="password"  
                        value={credentials.password} 
                        onChange={handleChange}
                        placeholder="Mot de passe  de connexion"
                        type="password"
                        error={error}
                        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">
                Remember 
              </label>
            </div>
          </div>
          <div className="col-6">
            <button type="submit" className="btn btn-primary btn-block">Connecter</button>
          </div>
        </div>
      </form>

      <div className="social-auth-links text-center mb-3">
        <p>- OR -</p>
        <a href="#" className="btn btn-block btn-primary">
          <i className="fab fa-facebook mr-2"></i> Connecter avec Facebook
        </a>
        <a href="#" className="btn btn-block btn-danger">
          <i className="fab fa-google-plus mr-2"></i> Connecter avec Google+
        </a>
      </div>

      <p className="mb-1">
        <a href="forgot-password.html">j'ai oublié mon mot de passe</a>
      </p>
      <p className="mb-0">
      </p>
    </div>
  </div>
</div>
    
    </>);
}
 
export default LoginPage;