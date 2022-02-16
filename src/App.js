import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import './App.css';
// import { Route, Routes, BrowserRouter as Router,Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginForm from './components/Login/LoginForm.jsx'
import api from "./services/api.js";

export default function App() {
  const navigate = useNavigate();
  const [estado, setEstado] = useState({estado: false});
  const KEY = "todoAPP.user";
  
  useEffect(() => {
    if (localStorage.getItem(KEY) === null) {
      navigate("/Login");
      setEstado(false);
    }else{
      setEstado(true);
      navigate("/Home");
    }
  },[]);
  
  
  const Logot = () => {
    console.log("Logout");
    localStorage.clear();
    setEstado(false);
  }
 
    return(
      // <Router>    
      <div className="container">
          <h1 > Pagina para administrar cola de tareas</h1>        
          <nav className="navbar navbar-expand navbar-light bg-light">
              <div className="nav navbar-nav">
                  <Link className="nav-item nav-link active" to="/">Home   </Link>   
                  <Link className="nav-item nav-link active" to="/usuarios">Perfil   </Link>   
                  <Link className="nav-item nav-link" to="/tareas">Tareas </Link>
                  <Link className="nav-item nav-link" onClick={Logot} to="/Login">Logout </Link>
              </div>
          </nav>
          <br></br>
          <br></br>
          <br></br>
          {/* {(estado)?(<di></di>):( <LoginForm  Login={Login} error={error} />)} */}
        </div>
   
      )  
 
}

// export default App;
