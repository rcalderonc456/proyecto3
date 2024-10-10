
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import "./inicioAdmin.css";

const InicioAdmin = () => {
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
          <li>
            <a href="#">
              <i>Modo Admin</i>
            </a>
          </li>
        </ul>
      </nav>

      <div className="header">
        <h2>Viajes con propósito, experiencias sin límites</h2>
      </div>
      <div className="cont">
        <a className="btn-group"></a>
        <a href="#!">
          <button className="btnAdmn btn-noti" onClick={() => {
              navigate("/UsuariosAdmin");
            }}>Usuarios</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-nac"onClick={() => {
              navigate("/Roles");
            }}>Roles</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-extr" onClick={() => {
              navigate("/ConsecutivosAdmin");
            }}>Consecutivos</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-serv"onClick={() => {
              navigate("/Pais");
            }}>Paises</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-cont" onClick={() => {
              navigate("/AerolineasAdmin");
            }}>Aerolineas</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-puert"onClick={() => {
              navigate("/Puertas");
            }}>Puertas</button>
        </a>
        <a href="#!">
          <button className="btnAdmn btn-vuel"onClick={() => {
              navigate("/VuelosAdmin");
            }}>Vuelos</button>
        </a>
        <a>
          <button className="btnAdmn btn-danger" onClick={() => {
              navigate("/Login");
            }}>Cerrar sesion</button>
        </a>
      </div>
    </>
  );
};

export default InicioAdmin;
