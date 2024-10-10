import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./login.css";

const Vuelos = () => {
  const navigate = useNavigate();
  const [vuelos, setVuelos] = useState([]);
  const [error, setError] = useState("");
  const [newVuelo, setNewVuelo] = useState({
    vueloID: "",
    aerolineaID: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaLlegada: "",
    puertaAeropuertoID: "",
    monto: "",
  });

  useEffect(() => {
    fetchVuelos().then((data) => {
      if (data.length > 0) {
        const ultimoId = data[data.length - 1].vueloID; // Asume que los datos están ordenados o el último es el más grande
        const nuevoId = generarSiguienteId(ultimoId);
        setNewVuelo((prev) => ({ ...prev, vueloID: nuevoId }));
      } else {
        setNewVuelo((prev) => ({ ...prev, vueloID: "VU-1" })); // Si no hay vuelos, empezamos desde 'VU-1'
      }
    });
  }, []);

  const generarSiguienteId = (ultimoId) => {
    const match = ultimoId.match(/VU-(\d+)$/);
    const numeroUltimoId = match ? parseInt(match[1], 10) : 0;
    const nuevoNumeroId = numeroUltimoId + 1;
    return `VU-${nuevoNumeroId}`;
  };

  const fetchVuelos = async () => {
    try {
        const response = await fetch("http://localhost:5194/api/Vuelo");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data && data.length > 0) {
          const ultimoId = data[data.length - 1].vueloID;
          const nuevoId = generarSiguienteId(ultimoId);
          setNewVuelo(prev => ({ ...prev, vueloID: nuevoId }));
        } else {
          setNewVuelo(prev => ({ ...prev, vueloID: "VU-1" }));
        }
        setVuelos(data);
      } catch (error) {
        setError("No se pudo cargar la lista de vuelos.");
        console.error("Fetch error: ", error);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVuelo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5194/api/Vuelo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVuelo),
      });

      if (response.ok) {
        const addedVuelo = await response.json();
        setVuelos([...vuelos, addedVuelo]);
        alert("Vuelo agregado exitosamente!");
        setNewVuelo({
          vueloID: "",
          aerolineaID: "",
          origen: "",
          destino: "",
          fechaSalida: "",
          fechaLlegada: "",
          puertaAeropuertoID: "",
          monto: "",
        });
      } else {
        throw new Error("Failed to add new vuelo");
      }
    } catch (error) {
      console.error("POST error: ", error);
      setError("Error al agregar vuelo.");
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li className="navbar-title" onClick={() => navigate("/InicioAdmin")}>
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
          <li onClick={() => navigate("/Puertas")}>
            <a href="#">Puertas</a>
          </li>
          <li>
            <a href="#">
              <i>Modo Admin</i>
            </a>
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
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
      
          <input
            type="text"
            name="aerolineaID"
            value={newVuelo.aerolineaID}
            onChange={handleChange}
            placeholder="ID de Aerolínea"
          />
          <input
            type="text"
            name="origen"
            value={newVuelo.origen}
            onChange={handleChange}
            placeholder="Origen"
          />
          <input
            type="text"
            name="destino"
            value={newVuelo.destino}
            onChange={handleChange}
            placeholder="Destino"
          />
          <input
            type="date"
            name="fechaSalida"
            value={newVuelo.fechaSalida}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fechaLlegada"
            value={newVuelo.fechaLlegada}
            onChange={handleChange}
          />
          <input
            type="text"
            name="puertaAeropuertoID"
            value={newVuelo.puertaAeropuertoID}
            onChange={handleChange}
            placeholder="ID de Puerta de Aeropuerto"
          />
          <input
            type="number"
            name="monto"
            value={newVuelo.monto}
            onChange={handleChange}
            placeholder="Monto"
          />
          <button type="submit" className="btnAdmn">Agregar Vuelo</button>
        </form>
      </div>
    </>
  );
};

export default Vuelos;
