import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {uuid as uidv4} from 'react-uuid'
import api from "../../services/api.js";

export default function MostrarT(){
    const KEY = "todoAPP.user";
    const navigate = useNavigate();
    const [tareasA, setTareasA] = useState([]);
    const [tareasP, setTareasP] = useState([]);
    const [tareasF, setTareasF] = useState([]);
    const [nodata, setNodata] = useState(false);
    const borrarRegistros = (tarea)=>{
        let id = tarea.id
        fetch(`${api}/task/${id}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            cargarDatos();
            navigate("/tareas");
        })
        .catch(console.log)
    }
    const cargarDatos=()=>{
        let usuarioSave= JSON.parse(localStorage.getItem(KEY))
        fetch(`${api}/task/${parseInt(usuarioSave.id)}`)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            if (datosRespuesta.length!==0) {
                const listTask = [...datosRespuesta];
                const asign= listTask.filter((asign) => asign.status === 'Asignada');
                const process= listTask.filter((asign) => asign.status === "En Proceso");
                const finish= listTask.filter((asign) => asign.status === 'Finalizada');        
                setTareasA([...asign]);
                setTareasP([...process]);
                setTareasF([...finish]);            
                let empty= {id: 0,title: "",description: "",status: "",user: 1,createAt: "",finishAt: ""}
                if(tareasA.length!==0 || tareasP.length!==0 || tareasF.length!==0) {
                    if(asign.length===0) setTareasA([empty]);
                    if(process.length===0) setTareasP([empty]);
                    if(finish.length===0) setTareasF([empty]);
                }

            } else {
                setNodata(true);
                console.log('no hay data para este usuario');
            }
        })
        .catch(console.log)
    }
    const moverAsignada = (tarea)=>{
        let id = tarea.id
        let datosEnviar = {...tarea};
        datosEnviar.status = 'Asignada'
        datosEnviar.finishAt = null
        fetch(`${api}/task/${id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            cargarDatos();
        })
        .catch(console.log)
    }
    const moverProceso = (tarea)=>{
        let id = tarea.id
        let datosEnviar = {...tarea};
        datosEnviar.status = 'En Proceso'        
        datosEnviar.finishAt = null
        fetch(`${api}/task/${id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            cargarDatos();
        })
        .catch(console.log)
    }
    const moverFinalizada = (tarea)=>{
        let id = tarea.id
        let datosEnviar = {...tarea};
        datosEnviar.status = 'Finalizada'    
        datosEnviar.finishAt = Date().toLocaleString()
        fetch(`${api}/task/${id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            cargarDatos();
        })
        .catch(console.log)
    }
    useEffect(() => {
        cargarDatos();
    }, []);

   if (tareasA.length==0 && tareasP.length==0 && tareasF.length==0) {
        if (nodata) {           
            {
            return (
                <>
                    <div className="card-header">
                    <Link className="btn btn-success" to={"/tareas/Crear"}>Agregar Nueva Tarea</Link>
                    </div>
                    <div>No hay tareas para este usuario...</div>
                </>
            )} 
            
        }else{
            {return <div>Cargando...</div>} 
        }
   }
   else{
            return  (
            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success" to={"/tareas/Crear"}>Agregar Nueva Tarea</Link>
                </div>
                <div className="card-body">
                    <h4>Listado de tareas</h4>
                    <div className="row">
                        <table className="col-6 col-md-4">
                                <thead>
                                    <tr>
                                        <th>Asigandas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {  tareasA.map(
                                                (tarea)=>(
                                                    <tr key={tarea.id}>
                                                        <td>
                                                            {(tarea.id===0)?(<di>Empty</di>):(
                                                            <>
                                                                <div className="card text-white bg-primary mb-3 mb-3 style=max-width: 18rem;">
                                                                        <h4><div className="card-header">{tarea.title}</div></h4>
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{tarea.description}</h5>
                                                                            <p className="card-text">Estado: {tarea.status}</p>
                                                                        <p className="card-text">Fecha Creacion: {tarea.createAt}</p>
                                                                        <p className="card-text">Fecha Finalizacion: {tarea.finishAt}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn-group" role="group" aria-label="">
                                                                        <button type='button' className="btn btn-warning" onClick={()=> moverProceso(tarea)}>{"=>>"}</button>
                                                                        <button type='button' className="btn btn-danger" onClick={()=> borrarRegistros(tarea)}>Borrar</button>
                                                                    </div>
                                                            </>)}
                                                        </td>
                                                        
                                                    </tr>
                                                )
                                            )                      
                                    }                     
                                </tbody>
                        </table>
                        <table className="col-6 col-md-4">
                                <thead>
                                    <tr>
                                        <th>En proceso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        tareasP.map(
                                            (tarea)=>(
                                                <tr key={tarea.id}>
                                                    <td>
                                                    {(tarea.id===0)?(<di>Empty</di>):(
                                                    <>
                                                        <div className="card text-white bg-success  mb-3 mb-3 style=max-width: 18rem;">
                                                                <div className="card-header">{tarea.title}</div>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{tarea.description}</h5>
                                                                    <p className="card-text">Estado: {tarea.status}</p>
                                                                    <p className="card-text">Fecha Creacion: {tarea.createAt}</p>
                                                                    <p className="card-text">Fecha Finalizacion: {tarea.finishAt}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group" role="group" aria-label="">
                                                            <button type='button' className="btn btn-warning" onClick={()=> moverAsignada(tarea)}>{"<<="}</button>
                                                                <button type='button' className="btn btn-danger" onClick={()=> borrarRegistros(tarea)}>Borrar</button>
                                                            <button type='button' className="btn btn-warning" onClick={()=> moverFinalizada(tarea)}>{"=>>"}</button>
                                                        </div>
                                                    </>)}
                                                    </td>
                                                </tr>
                                            )
                                        )                               
                                    }                     
                                </tbody>
                        </table>
                        <table className="col-6 col-md-4">
                                <thead>
                                    <tr>
                                        <th>Finalizadas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        tareasF.map(
                                            (tarea)=>(
                                                <tr key={tarea.id}>
                                                    <td>
                                                        {(tarea.id===0)?(<di>Empty</di>):(
                                                        <>
                                                            <div className="card text-white bg-danger  mb-3 mb-3 style=max-width: 18rem;">
                                                            <div className="card-header">{tarea.title}</div>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{tarea.description}</h5>
                                                                    <p className="card-text">Estado: {tarea.status}</p>
                                                                    <p className="card-text">Fecha Creacion: {tarea.createAt}</p>
                                                                    <p className="card-text">Fecha Finalizacion: {tarea.finishAt}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group" role="group" aria-label="">
                                                            <button type='button' className="btn btn-warning" onClick={()=> moverProceso(tarea)}>{"<<="}</button>
                                                                <button type='button' className="btn btn-danger" onClick={()=> borrarRegistros(tarea)}>Borrar</button>
                                                            </div>
                                                        </>)}
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        )                               
                                    }                     
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            );
    }
}
 