import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./vuelos.css";

const Reserva = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li className="navbar-title">
            <img
              src="../pictures/puenteGlobal.png"
              alt="logo principal"
              style={{ width: "50%" }}
            />
          </li>
          <li>
            <a href="">Inicio</a>
          </li>
          <li>
            <a href="#">Reservas</a>
          </li>
          <li>
            <a href="#">Boletos</a>
          </li>
          <li>
            <a href="#">Vuelos</a>
          </li>
          <li>
            <a href="#">Hola, Usuario</a>
          </li>
        </ul>
      </nav>
      <h2 className="titulo">Mis Reservas</h2>
      <div className="container">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Vuelo ID</th>
              <th>Fecha de reserva</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Leonardo</td>
              <td>A156</td>
              <td>12-4-2024</td>
              <td>Cancelado</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Leonardo</td>
              <td>A780</td>
              <td>1-4-2024</td>
              <td>Salió</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Leonardo</td>
              <td>A934</td>
              <td>2-4-2024</td>
              <td>Salió</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Leonardo</td>
              <td>A225</td>
              <td>20-4-2024</td>
              <td>A tiempo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reserva;
