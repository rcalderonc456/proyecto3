import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Puertas = () => {
  const navigate = useNavigate();
  const [puertas, setPuertas] = useState([]);
  const [nuevaPuerta, setNuevaPuerta] = useState({
    puertaID: "",
    numero: "",
    estado: "Activo"
  });
  const [editingPuertaID, setEditingPuertaID] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5194/api/PuertaAeropuerto")
      .then(response => response.json())
      .then(data => setPuertas(data))
      .catch(error => console.error("Error al obtener los datos de la API:", error));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevaPuerta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingPuertaID) {
        const response = await fetch(`http://localhost:5194/api/PuertaAeropuerto?id=${editingPuertaID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevaPuerta)
        });
        if (response.ok) {
          const updatedPuertas = puertas.map(puerta => {
            if (puerta.puertaID === editingPuertaID) {
              return nuevaPuerta;
            }
            return puerta;
          });
          setPuertas(updatedPuertas);
          setNuevaPuerta({
            puertaID: "",
            numero: "",
            estado: "Activo"
          });
          setEditingPuertaID(null);
        } else {
          console.error("Error al editar la puerta:", response.statusText);
        }
      } else {
        const response = await fetch("http://localhost:5194/api/PuertaAeropuerto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevaPuerta)
        });
        if (response.ok) {
          const data = await response.json();
          setPuertas(prevState => [...prevState, data]);
          setNuevaPuerta({
            puertaID: "",
            numero: "",
            estado: "Activo"
          });
        } else {
          console.error("Error al agregar nueva puerta:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error al agregar nueva puerta:", error);
    }
  };

  const handleEditar = puerta => {
    setEditingPuertaID(puerta.puertaID);
    setNuevaPuerta(puerta);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5194/api/PuertaAeropuerto?id=${editingPuertaID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaPuerta)
      });
      if (response.ok) {
        const updatedPuertas = puertas.map(puerta => {
          if (puerta.puertaID === editingPuertaID) {
            return nuevaPuerta;
          }
          return puerta;
        });
        setPuertas(updatedPuertas);
        setNuevaPuerta({
          puertaID: "",
          numero: "",
          estado: "Activo"
        });
        setEditingPuertaID(null);
      } else {
        console.error("Error al editar la puerta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar la puerta:", error);
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
          <li onClick={() => navigate("/UsuariosAdmin")}>
            <a href="#">Usuarios</a>
          </li>
          <li onClick={() => navigate("/Roles")}>
            <a href="#">Roles</a>
          </li>
          <li onClick={() => navigate("/ConsecutivosAdmin")}>
            <a href="#">Consecutivos</a>
          </li>
          <li onClick={() => navigate("/Paises")}>
            <a href="#">Paises</a>
          </li>
          <li onClick={() => navigate("/AerolineasAdmin")}>
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
        <h2 className="titulo">Lista de Puertas</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Estado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {puertas.map(puerta => (
              <tr key={puerta.puertaID}>
                <td>{puerta.puertaID}</td>
                <td>{puerta.numero}</td>
                <td>{puerta.estado}</td>
                <td>
                  <button className="btnEdit" onClick={() => handleEditar(puerta)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="puertaID"
            placeholder="ID de la puerta"
            value={nuevaPuerta.puertaID}
            onChange={handleChange}
          />
          <input
            type="text"
            name="numero"
            placeholder="Número de la puerta"
            value={nuevaPuerta.numero}
            onChange={handleChange}
          />
          <select
            name="estado"
            value={nuevaPuerta.estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <button type="submit" className="btnAdmn">
            {editingPuertaID ? "Actualizar Puerta" : "Agregar Puerta"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Puertas;
