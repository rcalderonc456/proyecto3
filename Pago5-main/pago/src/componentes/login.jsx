import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("El nombre de usuario y la contraseña son obligatorios.");
      return;
    }

    //La S = Simulacion - ESTOS DATOS NO MODIFICAN LOS VALORES EN LA BASE DE DATOS, TRANQUILIDAD :D
    const SUserID = "0";
    const SRolID = "0";

    try {
      const response = await fetch("http://localhost:5194/api/Usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: SUserID,
          Username: username,
          Password: password,
          RolID: SRolID,
        }),
      });

      if (response.ok) {
        const data = await response.json();  
        console.log("Login Successful: ", data); 
        sessionStorage.setItem('UserID', data.userID); 
        sessionStorage.setItem('RolID', data.rolID);
  
        console.log("Stored UserID: ", sessionStorage.getItem('UserID'));
        console.log("Stored RolID: ", sessionStorage.getItem('RolID'));

        
        if (sessionStorage.getItem('RolID') === "R-1") {
          navigate("/InicioAdmin");
        } else {
          navigate("/inicio");
        }
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <img
          className="pt-5"
          src="../pictures/Screenshot_2024-02-15_155144-removebg-preview 1.png"
          alt=""
        />
      </div>
      <section style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
        <div className="container pt-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card text-white"
                style={{ borderRadius: "1rem", backgroundColor: "#002c6a" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-4 mt-md-2 pb-2">
                    <h2 className="fw-bold mb-2">Log-In</h2>
                    <div
                      data-mdb-input-init=""
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="text"
                        id="typeUsernameX"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuario"
                      />
                    </div>
                    <div
                      data-mdb-input-init=""
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                      />
                    </div>
                    <p className="small mb-4 pb-lg-2">
                      <a className="text-white-50" href="./cambioContra.html">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </p>
                    <button
                      className="btn btn-primary btn-lg px-5"
                      type="button"
                      onClick={handleLogin}
                    >
                      Ingresar
                    </button>
                    {error && <div className="text-danger mt-3">{error}</div>}
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      {/* Aquí puedes agregar los iconos de redes sociales si los tienes */}
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">
                      ¿No tenés cuenta?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Registrate aquí
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
