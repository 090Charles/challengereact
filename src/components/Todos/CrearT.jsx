import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import {v4 as uudv4} from "uuid";
import api from "../../services/api.js";

export default function CrearT() {
    const KEY = "todoAPP.user";
    const [tarea, setTarea] = useState({id: 0, title:"",description:"",status:"",user:0,createAt:null,finishAt:null});
    const navigate = useNavigate();
    const cambioTitle = (e)=>{
        e.preventDefault();
        const newTodos = {...tarea};
        newTodos.title = e.target.value;
        setTarea(newTodos);
    }
    const cambioDescrip = (e)=>{
        e.preventDefault();
        const newTodos = {...tarea};
        newTodos.description = e.target.value;
        setTarea(newTodos);
    }
    const enviarDatos = (e)=>{
        e.preventDefault();
        var datosEnviar={...tarea}
        datosEnviar.status = 'Asignada';
        let usuarioSave= JSON.parse(localStorage.getItem(KEY))
        datosEnviar.user = usuarioSave.id;
        datosEnviar.createAt =  Date().toLocaleString();
        datosEnviar.finishAt = null
        fetch(`${api}/task`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            navigate("/tareas");
        })
        .catch(console.log)
    }

    return ( 
        <div className="card">
            <div className="card-header">
                Crear Nueva Tarea
            </div>
            <div className="card-body">
                <form onSubmit={enviarDatos}>
                <div className="form-group">
                    <label htmlFor="">Title:</label>
                    <input type="text" name="title" id="title" onChange={cambioTitle} value={tarea.title} className="form-control" placeholder="" aria-describedby="helpId" />
                    {/* <small id="helpId" className="text-muted">Escribe el nombre del empleado</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input type="text" name="description" id="description" onChange={cambioDescrip} value={tarea.description} className="form-control" placeholder="" aria-describedby="helpId" />
                    {/* <small id="helpId" className="text-muted">Escribe el correo del empleado</small> */}
                </div>
                <div className="btn-group" role="group" aria-label="">
                    <button type="submit" className="btn btn-success">Agregar Nueva Tarea</button>
                    <Link to={"/tareas"} className="btn btn-primary">Cancelar</Link>
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