import React from 'react';
import {useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function ListarU(){
    const KEY = "todoAPP.user";
    const [usuarios, setUsuario] = useState([]);
    const borrarRegistros = (id)=>{
        fetch(`${api}/usuarios/${id}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(datosEnviar),
        })
        .then(respuesta=> respuesta.json())
        .then((datosRespuesta)=>{
            cargarDatos();
        })
        .catch(console.log)
    }
    // const [usuarios, setusuarios] = useState([]);
    const cargarDatos=()=>{
        let usuarioSave= JSON.parse(localStorage.getItem(KEY))
        fetch(`${api}/usuarios`)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
                if (usuarioSave.email==='admin@admin.com' || usuarioSave.email==='charles@charles.com') {
                    console.log('adminisrador',datosRespuesta)
                    setUsuario(datosRespuesta);    
                }else{
                    console.log('filtrado',datosRespuesta)
                    let datosfiltrados=datosRespuesta.filter((x) => x.id === usuarioSave.id);
                    setUsuario(datosfiltrados);    

                }
            })
            .catch(console.log)
    }
    useEffect(() => {
        cargarDatos();
    }, []);

   if (usuarios.length==0) {return <div>Cargando...</div>}
   else{
            return  (
            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success" to={"/usuarios/Crear"}>Agregar Nuevo Usuario</Link>
                </div>
                <div className="card-body">
                <h4>Lsita de usuarios</h4>
                <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   usuarios.map(
                                    (usuario)=>(
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.name}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning"  to={`/usuarios/Editar/${usuario.id}`} >Editar</Link>
                                                    <button type='button' className="btn btn-danger" onClick={()=> borrarRegistros(usuario.id)}>Borrar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            }                           
                        </tbody>
                        </table>
                </div>
            </div>
            
            );
    }
}
 