import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Paises = () => {
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const [nuevoPais, setNuevoPais] = useState({
    paisID: "",
    nombre: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5194/api/Paises")
      .then(response => response.json())
      .then(data => setPaises(data))
      .catch(error => console.error("Error al obtener los datos de la API:", error));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNuevoPais(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  const handleAddPais = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5194/api/Paises", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPais)
      });
      if (response.ok) {
        const addedPais = await response.json();
        setPaises([...paises, addedPais]);
        setNuevoPais({ paisID: "", nombre: "" }); // Limpiar formulario
        alert('País agregado exitosamente!');
      } else {
        throw new Error('Error al agregar el país');
      }
    } catch (error) {
      console.error("Error al agregar el país:", error);
    }
  };
  const handleUpdatePais = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5194/api/Paises/${encodeURIComponent(nuevoPais.paisID)}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPais)
      });
      if (response.ok) {
        const updatedPais = paises.map(pais => pais.paisID === editMode ? updatedPais : pais);
        setPaises(updatedPais);
        setNuevoPais({ paisID: "", nombre: "" });
        setEditMode(false);
        alert('País actualizado exitosamente!');
      } else {
        throw new Error('Error al actualizar el país');
      }
    } catch (error) {
      console.error("Error al actualizar el país:", error);
    }
  };
  

  const handleEdit = (pais) => {
    setNuevoPais(pais);
    setEditMode(true);
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
        <h2 className="titulo">Lista de Países</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paises.map(pais => (
              <tr key={pais.paisID}>
                <td>{pais.paisID}</td>
                <td>{pais.nombre}</td>
                <td>
                  <button className="btnEdit" onClick={() => handleEdit(pais)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={editMode ? handleUpdatePais : handleAddPais}>
  <input
    type="text"
    name="paisID"
    placeholder="ID del país"
    value={nuevoPais.paisID}
    onChange={handleChange}
    readOnly={editMode}
  />
  <input
    type="text"
    name="nombre"
    placeholder="Nombre del país"
    value={nuevoPais.nombre}
    onChange={handleChange}
  />
  <button type="submit" className="btnAdmn">
    {editMode ? "Actualizar País" : "Agregar País"}
  </button>
</form>
      </div>
    </>
  );
};

export default Paises;
