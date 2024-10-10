import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Consecutivos = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li className="navbar-title" onClick={() => {
              navigate("/InicioAdmin");
            }}>
            <img
              src="../src/images/puenteGlobal.png"
              alt="logo principal"
              style={{ width: "50%" }}
            />
          </li>
          <li
            onClick={() => {
              navigate("/UsuariosAdmin");
            }}
          >
            <a href="#">Usuarios</a>
          </li>
          <li onClick={() => navigate("/Roles")}>
            <a href="#">Roles</a>
          </li>
          <li
            onClick={() => {
              navigate("/ConsecutivosAdmin");
            }}
          >
            <a href="#">Consecutivos</a>
          </li>
          <li onClick={() => navigate("/Pais")}>
            <a href="#">Paises</a>
          </li>
          <li
            onClick={() => {
              navigate("/AerolineasAdmin");
            }}
          >
            <a href="#">Aerolíneas</a>
          </li>
          <li>
            <a href="#">
              <i>Modo Admin</i>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container table-responsive">
        <h2 className="titulo">Lista de Consecutivos</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descipción</th>
              <th>Consecutivo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tarifas</td>
              <td>2</td>
              <td>
                <button className="btnEdit">Editar</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Productos y servicios</td>
              <td>5</td>
              <td>
                <button className="btnEdit">Editar</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Anuncios</td>
              <td>8</td>
              <td>
                <button className="btnEdit">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btnAdmn">Nuevo</button>
      </div>
    </>
  );
};

export default Consecutivos;
