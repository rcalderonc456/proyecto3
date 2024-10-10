import { useNavigate } from "react-router-dom";
import  { useState, useEffect } from 'react';
import "./login.css";

const Vuelos = () => {
  const navigate = useNavigate();
  const [vuelos, setVuelos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVuelos();
  }, []);

  const fetchVuelos = async () => {
    try {
      const response = await fetch('http://localhost:5194/api/Vuelo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVuelos(data);
    } catch (error) {
      setError("No se pudo cargar la lista de vuelos.");
      console.error("Fetch error: ", error);
    }
  };
  return (
    <>
      <nav>
        <ul>
          <li className="navbar-title" onClick={() => {
              navigate("/Inicio");
            }}>
            <img
              src="../src/images/PuenteGlobal.png"
              alt="logo principal"
              style={{ width: "50%" }}
            />
          </li>
          <li onClick={() => {
              navigate("/Inicio");
            }}>
            <a href="">Inicio</a>
          </li>
          <li onClick={() => {
              navigate("/Reservas");
            }}>
            <a href="#">Reservas</a>
          </li>
          <li onClick={() => {
              navigate("/Boletos");
            }}>
            <a href="#">Boletos</a>
          </li>
          <li onClick={() => {
              navigate("/Vuelos");
            }}>
            <a href="#">Vuelos</a>
          </li>
          <li>
            <a href="#">Hola, Usuario</a>
          </li>
        </ul>
      </nav>
      <h2 className="titulo">Vuelos Disponibles</h2>
      <div className="container">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aerolinea</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha de Salida</th>
              <th>Fecha de llegada</th>
              <th>Puerta</th>
              <th>Precio</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.vueloID}>
                <td>{vuelo.vueloID}</td>
                <td>{vuelo.aerolineaID}</td>
                <td>{vuelo.origen}</td>
                <td>{vuelo.destino}</td>
                <td>{vuelo.fechaSalida}</td>
                <td>{vuelo.fechaLlegada}</td>
                <td>{vuelo.puertaAeropuertoID}</td>
                <td>${vuelo.monto}</td>
                <td>
                  <button className="btnAdmn">Reservar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Vuelos;
