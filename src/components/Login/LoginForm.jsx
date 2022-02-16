import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function LoginForm() {
  const [details, setdetails] = useState({id: 0,name:"", email:"",password:""});
  const [estado, setEstado] = useState({estado: false});
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  
  const KEY = "todoAPP.user";
  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }
  const Login= (details) => { 
    console.log('hacelllll',details);
    fetch(`${api}/usuarios/Byemail/${details.email}`)
    .then(response => response.text())
    .then((datosRespuesta)=>{
      console.log('respuestaaa1',datosRespuesta)
      let respuesta;
      if (datosRespuesta!=='') {
        respuesta = JSON.parse(datosRespuesta);
      }
      if (respuesta !== undefined) {
        if (details.email == respuesta.email && details.password == respuesta.password ) {
          setEstado(true);
          localStorage.setItem(KEY,JSON.stringify(respuesta));  
          navigate("/");
        } else {
          console.log("No se hizo login not match");    
          seterror("User do not match!");
        }        
      } else {
        console.log("No se hizo login no exist");    
        seterror("User no exist!");
      }
    })
    .catch(console.log)
  }
  return(   
    <form onSubmit={submitHandler}> 
        <div id="principal" className="row col-md-12 align-items-center">
          <div id="secundario" className="col-md-2"></div>
          <div id="login" className="col-md-8 align-items-center text-white bg-dark">
              <h3 className="text-center text-white pt-5">List of Task</h3>
              <div className="container">
                  <div id="login-row" className="row justify-content-center align-items-center">
                      <div id="login-column" className="col-md-6">
                          <div id="login-box" className="col-md-12">
                              <div id="login-form" className="form" action="" method="post">
                                  <h3 className="text-center text-info">Login</h3>
                                  {(error!="")?(<div className="error">{error}</div>):""}
                                  {/* <div className="form-group">
                                      <label htmlFor="username" className="text-info">Username:</label>
                                      <input type="" name="username" id="username" className="form-control" onChange={e =>setdetails({...details, name: e.target.value})} value={details.name}/>
                                  </div> */}
                                  <div className="form-group">
                                      <label htmlFor="email" className="text-info">Email:</label>
                                      <input type="email" name="email" id="email" className="form-control" onChange={e =>setdetails({...details, email: e.target.value})} value={details.email}/>
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="password" className="text-info">Password:</label>
                                      <input type="password" name="password" id="password" className="form-control" onChange={e =>setdetails({...details, password: e.target.value})} value={details.password}/>
                                  </div>
                                  <div className="form-group">                                     
                                      <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div id="secundario" className="col-md-2"></div>
        </div>
    </form>

  )
}
