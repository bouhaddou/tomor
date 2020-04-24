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
        
        <div style={{ height: 470 }} className="row ">
            <div className="col-md-6 offset-md-3 mt-5">
            <h1 className="text-center mt-5 mb-3">Authentification</h1>
                <form onSubmit={handleSubmit}>
                    <Field 
                    style="form-group"
                        label="Adresse Email" 
                        name="username"  
                        value={credentials.username} 
                        onChange={handleChange}
                        placeholder="Adresse email de connexion"
                        error={error}
                        type="text"
                        />
                     <Field 
                      style="form-group"
                        label="Mot de Passe " 
                        name="password"  
                        value={credentials.password} 
                        onChange={handleChange}
                        placeholder="Mot de passe  de connexion"
                        type="password"
                        error={error}
                        />
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">connexion</button>
                    </div>
                </form>
            </div>
        </div>
    
    </>);
}
 
export default LoginPage;