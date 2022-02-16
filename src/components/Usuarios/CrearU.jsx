import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {v4 as uudv4} from "uuid";
import api from "../../services/api.js";

export default function CrearU() {
    
    const [usuario, setUsuario] = useState({id: parseInt((10 + (Math.random() * (10000-10))),36), name:"",email:"",password:""});
    const cambioValorname = (e)=>{
        e.preventDefault();
        const newTodos = {...usuario};
        newTodos.name = e.target.value;
        setUsuario(newTodos);
    }
    const cambioValoremail = (e)=>{
        e.preventDefault();
        const newTodos = {...usuario};
        newTodos.email = e.target.value;
        setUsuario(newTodos);
    }
    const cambioValorpassword = (e)=>{
        e.preventDefault();
        const newTodos = {...usuario};
        newTodos.password = e.target.value;
        setUsuario(newTodos);
    }
    const enviarDatos = (e)=>{
        e.preventDefault();
        var datosEnviar={...usuario}
        console.log('esto manda',datosEnviar);
        fetch(`${api}/usuarios`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            console.log('otro',datosRespuesta);
        })
        .catch(console.log)
    }

    return ( 
        <div className="card">
            <div className="card-header">
                Empleados
            </div>
            <div className="card-body">
                <form onSubmit={enviarDatos}>
                <div className="form-group">
                    <label htmlFor="">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" onChange={cambioValorname} value={usuario.name} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Correo:</label>
                    <input type="text" name="correo" id="correo" onChange={cambioValoremail} value={usuario.email} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Contraseña:</label>
                    <input type="text" name="correo" id="correo" onChange={cambioValorpassword} value={usuario.password} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                </div>
                <div className="btn-group" role="group" aria-label="">
                    <button type="submit" className="btn btn-success">Agregar nuevo usuario</button>
                    <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                </div>
                </form>
            </div>
            <div className="card-footer text-muted">
                Footer
            </div>
        </div>
    );
}
 
// export default Crear;