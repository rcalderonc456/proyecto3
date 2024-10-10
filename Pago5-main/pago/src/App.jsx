import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./componentes/inicio";
import Compra from "./componentes/Compra";
import Confirmacion from "./componentes/Confirmacion";
import Login from "./componentes/login"; // Importa el componente de Login
import InicioAdmin from "./componentes/InicioAdmin";
import AerolineasAdmin from "./componentes/AerolineasAdmin";
import ConsecutivosAdmin from "./componentes/ConsecutivosAdmin";
import Reserva from "./componentes/Reservas";
import UsuariosAdmin from "./componentes/UsuariosAdmin";
import Vuelos from "./componentes/Vuelos";
import VuelosAdmin from "./componentes/VuelosAdmin";
import Pais from "./componentes/Pais";
import Roles from "./componentes/Roles";
import Puertas from "./componentes/Puertas";


function App() {
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = false; // Cambia esto según la lógica de autenticación de tu aplicación

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirige automáticamente a la página de inicio de sesión si el usuario no está autenticado */}
          <Route path="/" element={isAuthenticated ? <Inicio /> : <Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Compra" element={<Compra />} />
          <Route path="/Confirmacion" element={<Confirmacion />} />
          <Route path="/AerolineasAdmin" element={<AerolineasAdmin />} />
          <Route path="/ConsecutivosAdmin" element={<ConsecutivosAdmin />} />
          <Route path="/Reserva" element={<Reserva />} />
          <Route path="/UsuariosAdmin" element={<UsuariosAdmin />} />
          <Route path="/Vuelos" element={<Vuelos />} />
          <Route path="/VuelosAdmin" element={<VuelosAdmin />} />
          <Route path="/InicioAdmin" element={<InicioAdmin />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Pais" element={<Pais />} />
          <Route path="/Roles" element={<Roles />} />
          <Route path="/Puertas" element={<Puertas />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
