import './confirmacion.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Confirmacion = () => {
    const [numeroConfirmacion, setNumeroConfirmacion] = useState('');
    const [loading, setLoading] = useState(true); // Estado para controlar el loader

    useEffect(() => {
        confirmarCompra();
        setTimeout(() => {
            setLoading(false); // Oculta el loader después de 3 segundos
        }, 3000);
    }, []);

    const confirmarCompra = async () => {
        const numeroConfirmacion = Math.floor(10000 + Math.random() * 90000).toString();
        setNumeroConfirmacion(numeroConfirmacion);

        const URL = "http://localhost:5194/api/ConfirmacionCompra";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ NumeroConfirmacion: numeroConfirmacion })
        };

        try {
            const response = await fetch(URL, requestOptions);
            if (!response.ok) throw new Error("No se pudo confirmar la compra");
        } catch (error) {
            console.error("Error al confirmar la compra:", error);
        }
    };

    return (
        <div>
            <header>
                <div className="container">
                    <div className="logo">
                        <Link to="/Inicio"><img src="../src/images/PuenteGlobal.png" alt="Logo Puente Global" /></Link>
                    </div>
                    <div className="navegacion">
                        <ul>
                            <li><Link to="/Reservas">Reservas</Link></li>
                            <li><Link to="/Boletos">Boletos</Link></li>
                            <li><Link to="/Vuelos">Vuelos</Link></li>
                        </ul>
                    </div>
                    <div className="usuario">
                        <p>Hola, Usuario</p>
                    </div>
                </div>
            </header>
            {loading && <span className="loader"></span>}
            <div className="mensajes-debajo">
            {!loading && numeroConfirmacion && (
                    <>
                        <div className="compra-confirmada">Compra Realizada</div>
                        <div className="numero-confirmacion">Número de Confirmación: {numeroConfirmacion}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Confirmacion;
