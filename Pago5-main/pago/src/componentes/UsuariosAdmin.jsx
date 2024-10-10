import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./tablas.css";

const Usuarios = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    rolID: ""
  });
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUltimoIdUsuario();
    obtenerUsuarios();
  }, []);

  const obtenerUltimoIdUsuario = async () => {
    try {
      const response = await fetch("http://localhost:5194/api/Usuario");
      if (response.ok) {
        const data = await response.json();
        const ultimoId = obtenerUltimoId(data);
        const nuevoId = generarSiguienteId(ultimoId);
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          userID: nuevoId
        }));
      } else {
        setError("Error al obtener el último ID de usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el último ID de usuario:", error);
      setError("Error al obtener el último ID de usuario.");
    }
  };

  const obtenerUltimoId = (usuarios) => {
    if (usuarios.length === 0) return "U-0";
    const ultimoUsuario = usuarios[usuarios.length - 1];
    return ultimoUsuario.userID;
  };

  const generarSiguienteId = (ultimoId) => {
    const numeroUltimoId = parseInt(ultimoId.slice(2));
    const nuevoNumeroId = numeroUltimoId + 1;
    return "U-" + nuevoNumeroId.toString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5194/api/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        navigate("/Inicio");
      } else {
        setError("Error al crear usuario. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setError("Error al crear usuario. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:5194/api/Usuario");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        setError("Error al obtener usuarios.");
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError("Error al obtener usuarios.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para cambiar la contraseña
    // Puedes enviar una solicitud PUT o POST a la API para actualizar la contraseña
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
          <li onClick={() => {
              navigate("/UsuariosAdmin");
            }}>
            <a href="#">Usuarios</a>
          </li>
          <li onClick={() => navigate("/Roles")}>
            <a href="#">Roles</a>
          </li>
          <li onClick={() => {
              navigate("/ConsecutivosAdmin");
            }}>
            <a href="#">Consecutivos</a>
          </li>
          <li onClick={() => navigate("/Pais")}>
            <a href="#">Paises</a>
          </li>
          <li onClick={() => {
              navigate("/AerolineasAdmin");
            }}>
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
      <div className="container accrd">
        <form onSubmit={handleSubmit}>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <strong>Crear Usuario</strong>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="mb-3 row">
                    <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername"
                        name="username"
                        value={usuario.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        name="password"
                        value={usuario.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputRolID" className="col-sm-2 col-form-label">Rol </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        id="inputRolID"
                        name="rolID"
                        value={usuario.rolID}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar Rol</option>
                        <option value="R-1">Administrador</option>
                        <option value="R-2">Cliente</option>
                        <option value="R-3">Consecutivo</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Crear Usuario</button>
                  {error && <div className="text-danger mt-3">{error}</div>}
                </div>
              </div>
            </div>
            {/* Ver Usuarios */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <strong>Ver Usuarios</strong>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((user) => (
                        <tr key={user.userID}>
                          <td>{user.userID}</td>
                          <td>{user.username}</td>
                          <td>{user.password}</td>
                          <td>{user.rolID}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Cambiar Contraseña */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <strong>Cambiar Contraseña</strong>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form onSubmit={handleChangePassword}>
                    <div className="mb-3 row">
                      <label htmlFor="inputUserId" className="col-sm-2 col-form-label">Id Usuario</label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          id="inputUserId"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputNewPassword" className="col-sm-2 col-form-label">Nueva Contraseña</label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          className="form-control"
                          id="inputNewPassword"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirmar Contraseña</label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          className="form-control"
                          id="inputConfirmPassword"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Usuarios;
