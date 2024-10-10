import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Aerolineas = () => {
  const navigate = useNavigate();
  const [aerolineas, setAerolineas] = useState([]);
  const [nuevaAerolinea, setNuevaAerolinea] = useState({
    aerolineaID: "",
    nombre: "",
    paisID: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5194/api/Aerolinea")
      .then(response => response.json())
      .then(data => setAerolineas(data))
      .catch(error => console.error("Error al obtener los datos de la API:", error));
  }, []);

  const handleEdit = (aerolinea) => {
    setNuevaAerolinea(aerolinea);
    setEditMode(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevaAerolinea(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5194/api/Aerolinea", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaAerolinea)
      });
      if (response.ok) {
        const addedAerolinea = await response.json();
        setAerolineas([...aerolineas, addedAerolinea]);
        setNuevaAerolinea({ aerolineaID: "", nombre: "", paisID: "" }); // Limpiar formulario
      } else {
        console.error("Error al agregar nueva aerolínea:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar nueva aerolínea:", error);
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5194/api/Aerolinea?id=${encodeURIComponent(nuevaAerolinea.aerolineaID)}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaAerolinea)
      });
      if (response.ok) {
        const updatedList = aerolineas.map(aerolinea =>
          aerolinea.aerolineaID === nuevaAerolinea.aerolineaID ? nuevaAerolinea : aerolinea
        );
        setAerolineas(updatedList);
        setNuevaAerolinea({ aerolineaID: "", nombre: "", paisID: "" });
        setEditMode(false);
      } else {
        console.error("Error en la petición:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la operación:", error);
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
          <li onClick={() => navigate("/Pais")}>
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
        <h2 className="titulo">Lista de Aerolíneas</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Código</th>
              <th>Aerolínea</th>
              <th>País ID</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {aerolineas.map(aerolinea => (
              <tr key={aerolinea.aerolineaID}>
                <td>{aerolinea.aerolineaID}</td>
                <td>{aerolinea.nombre}</td>
                <td>{aerolinea.paisID}</td>
                <td>
                  <button onClick={() => handleEdit(aerolinea)} className="btnEdit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
  <input
    type="text"
    name="aerolineaID"
    placeholder="Código"
    value={nuevaAerolinea.aerolineaID}
    onChange={handleChange}
    readOnly={editMode}
  />
  <input
    type="text"
    name="nombre"
    placeholder="Nombre de la Aerolínea"
    value={nuevaAerolinea.nombre}
    onChange={handleChange}
  />
  <input
    type="text"
    name="paisID"
    placeholder="País ID"
    value={nuevaAerolinea.paisID}
    onChange={handleChange}
  />
  <button type="submit" className="btnAdmn">{editMode ? 'Actualizar' : 'Agregar'} Aerolínea</button>
</form>
      </div>
    </>
  );
};

export default Aerolineas;
