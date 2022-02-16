import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function EditarU() {
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();
    const todoTaskRef = useRef();
    const params = useParams()
    useEffect(()=>{
        componentDidMount();
    },[]);

    const componentDidMount=()=>{
        fetch(`${api}/usuarios/${params.id}`)
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            setUsuario(datosRespuesta);
        })
        .catch(console.log)
    }
    const cambioValorNombre = (e)=>{
        e.preventDefault();
        const newTodos = {...usuario};
        newTodos.name = e.target.value;
        setUsuario(newTodos);
    }
    const cambioValorEmail = (e)=>{
        e.preventDefault();
        const newTodos2 = {...usuario};
        newTodos2.email = e.target.value;
        setUsuario(newTodos2);
    }
    const enviarDatos = (e)=>{
        e.preventDefault();
        const datosEnviar = {...usuario}
        fetch(`${api}/usuarios/${params.id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            navigate("/usuarios");
        })
        .catch(console.log)
    }
        if (usuario.length==0) {return <div>Cargando...</div>}
        else{
            return (  
                <div className="card">
                    <div className="card-header">
                        Editar usuarios
                    </div>
                    <div className="card-body">
                        <form onSubmit={enviarDatos}>
                    
                        <div className="form-group">
                            <label htmlFor="">Id:</label>
                            <input type="text" disabled name="nombre" id="nombre" value={usuario.id} className="form-control"  />
                            </div>
                            <div className="form-group">
                            <label htmlFor="">Nombre:</label>
                            <input type="text" name="name" id="name" onChange={cambioValorNombre} value={usuario.name} className="form-control" placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="text-muted">Escribe el nombre del usuario</small>
                            </div>
                            <div className="form-group">
                            <label htmlFor="">Correo:</label>
                            <input type="text" name="email" id="email" onChange={cambioValorEmail} value={usuario.email} className="form-control" placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="text-muted">Escribe el correo del usuario</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Guardar datos</button>
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
}
