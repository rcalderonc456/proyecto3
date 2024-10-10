
import { useNavigate } from "react-router-dom";
import "./inicio.css";

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <ul>
          <li className="navbar-title">
            <img
              src="../src/images/PuenteGlobal.png"
              alt="logo principal"
              style={{ width: "50%" }}
            />
          </li>
          <li onClick={() => {
              navigate("/Inicio");
            }}>
            <a href="#">Inicio</a>
          </li>
          <li
            className="repre"
            onClick={() => {
              navigate("/Compra");
            }}
          >
            <a href="#">Compra</a>
          </li>
          <li
            onClick={() => {
              navigate("/InicioAdmin");
            }}
          >
            <a href="#">Boletos</a>
          </li>
          <li onClick={() => {
              navigate("/Vuelos");
            }}>
            <a href="#">Vuelos</a>
          </li>
          <li
            onClick={() => {
              navigate("/Inicio");
            }}
          >
            <a href="#">Hola, Usuario</a>
          </li>
          <li
            onClick={() => {
              navigate("/Login");
            }}
          >
            <a href="#">Cerrar sesion</a>
          </li>
        </ul>
      </nav>
      <div className="header">
        <h2>Viajes con propósito, experiencias sin límites</h2>
      </div>
      <div className="ofertas">
        <h5>
          Ofrecemos una red de rutas y destinos que conectan diferentes ciudades
          y regiones del mundo.
        </h5>
        <button className="btn btn-lg btn-of mt-4">Ver ofertas</button>
      </div>
      <h2 style={{ textAlign: "center", margin: 20, marginTop: 50 }}>
        Nuestros Servicios
      </h2>
      <div className="h-100">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img
                src="../src/images/joss-woodhead-3wFRlwS91yk-unsplash.jpg"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">Vuelos a Europa</h5>
                <p className="card-text">
                  Explora la belleza de Europa con nuestras ofertas de vuelo.
                  Desde la majestuosidad de París hasta la historia de Roma.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-dark">Reserva ahora</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src="../src/images/damir-babacic-72OkqJTLLA0-unsplash.jpg"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">Vuelos a Medio Oriente</h5>
                <p className="card-text">
                  Sumérgete en la fascinante cultura del Medio Oriente con
                  nuestras ofertas de vuelo. Desde los zocos de Marrakech hasta
                  los rascacielos de Dubai.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-dark">Reserva ahora</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src="../src/images/alain-bonnardeaux-tLxGw_ITs7k-unsplash.jpg"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">Vuelos a America</h5>
                <p className="card-text">
                  Descubre la diversidad de América con nuestras ofertas de
                  vuelo. Desde las playas de México hasta las selvas de Brasil.
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-dark">Reserva ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
