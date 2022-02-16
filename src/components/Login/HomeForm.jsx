import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function HomeForm() {
    const [usuarioLogeado, setUsuarioLogeado] = useState({id: 0,name:"", email:"",password:""});
    const KEY = "todoAPP.user";
    useEffect(() => {
        let usuarioalmacenado= JSON.parse(localStorage.getItem(KEY))
        setUsuarioLogeado(usuarioalmacenado); 

    }, []);
  return(   
    <>
        <h3>Bienvenido a su administrador de tareas</h3>        
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src="" width="100" className="img-fluid rounded" />
                    <h5 className="card-title">Nombre: {usuarioLogeado.name}</h5>
                    <p className="card-text">Email:  {usuarioLogeado.email}</p>
                    <Link className='btn btn-dark' to="/usuarios">Editar Perfil</Link>
                </div>                
                <div className="card-body">
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
