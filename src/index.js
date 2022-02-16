import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Routes, BrowserRouter as Router,Switch} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// se importan todos los componentes para definir rutas
import HomeForm from './components/Login/HomeForm.jsx'
import ListarU from './components/Usuarios/ListarU.jsx'
import CrearU from './components/Usuarios/CrearU.jsx'
import EditarU from './components/Usuarios/EditarU.jsx'
import MostrarT from './components/Todos/MostrarT.jsx'
import CrearT from './components/Todos/CrearT.jsx'
import LoginForm from './components/Login/LoginForm.jsx'



ReactDOM.render(
  <React.StrictMode>
  <Router>
    <App/>
    <Routes>
        <Route path="/" element={<HomeForm/>} />
        <Route path="/Login" element={<LoginForm/>} />
        <Route path="/usuarios" element={<ListarU/>} />
        <Route path="/usuarios/Crear" element={<CrearU/>} />
        <Route path="/usuarios/Editar/:id" element={<EditarU/>} />
        <Route path="/tareas" element={<MostrarT/>} />
        <Route path="/tareas/Crear" element={<CrearT/>} />
      </Routes>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
