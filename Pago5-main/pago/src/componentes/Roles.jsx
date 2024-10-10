import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Roles = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState({ rolID: "", rolName: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5194/api/Rols")
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error al obtener los datos de la API:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRol((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5194/api/Rols", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoRol),
      });
      if (response.ok) {
        const data = await response.json();
        setRoles([...roles, data]);
        setNuevoRol({ rolID: "", rolName: "" });
        alert('Rol agregado exitosamente!');
      } else {
        throw new Error('Error al agregar el rol');
      }
    } catch (error) {
      console.error("Error al agregar el rol:", error);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5194/api/Rols/${nuevoRol.rolID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoRol),
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(roles.map(rol => rol.rolID === nuevoRol.rolID ? data : rol));
        setNuevoRol({ rolID: "", rolName: "" });
        setIsEditing(false);
        alert('Rol actualizado exitosamente!');
      } else {
        throw new Error('Error al actualizar el rol');
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  const handleEdit = (rol) => {
    setNuevoRol(rol);
    setIsEditing(true);
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
      <nav>{/* Navigation code here */}</nav>
      <div className="container table-responsive">
        <h2 className="titulo">Lista de Roles</h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.rolID}>
                <td>{rol.rolID}</td>
                <td>{rol.rolName}</td>
                <td>
                  <button className="btnEdit" onClick={() => handleEdit(rol)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={isEditing ? handleUpdateRole : handleAddRole}>
          <input type="text" name="rolID" placeholder="ID del rol" value={nuevoRol.rolID} onChange={handleChange} readOnly={isEditing} />
          <input type="text" name="rolName" placeholder="Nombre del rol" value={nuevoRol.rolName} onChange={handleChange} />
          {isEditing ? (
            <button type="submit" className="btnAdmn">Guardar Cambios</button>
          ) : (
            <button type="submit" className="btnAdmn">Agregar Rol</button>
          )}
        </form>
      </div>
    </>
  );
};

export default Roles;
