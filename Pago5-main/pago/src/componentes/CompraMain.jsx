import './stylecompra.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompraMain = ( ) => {
  const navigate = useNavigate();
  const [paypalVisible, setPaypalVisible] = useState(false);
  const [walletVisible, setWalletVisible] = useState(false);
  const [botonVisible, setBotonVisible] = useState(false);
  const [paypalSelected, setPaypalSelected] = useState(false); 
  const [walletSelected, setWalletSelected] = useState(false); 
  //const [compras, setCompras] = useState([]);

  const formatNumeroTarjeta = (input) => {
    var numero = input.value.replace(/\D/g, '');
    numero = numero.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (numero.length > 19) {
      numero = numero.substring(0, 19);
    }
    input.value = numero;
  }

  const toggleMostrarCVV = () => {
    var cvvInput = document.getElementById('cvv');
    var mostrarButton = document.getElementById('mostrar-cvv');
    if (cvvInput.type === 'password') {
      cvvInput.type = 'text';
      mostrarButton.textContent = 'Ocultar';
    } else {
      cvvInput.type = 'password';
      mostrarButton.textContent = 'Ver';
    }
  }
  const toggleMostrarContraseña= () => {
    var passwordInput = document.getElementById('password');
    var mostrarButton = document.getElementById('mostrar-contra');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      mostrarButton.textContent = 'Ocultar';
    } else {
      passwordInput.type = 'password';
      mostrarButton.textContent = 'Ver';
    }
  }
  // Genera un ID de tarjeta aleatorio entre 1 y 1000
const generarIDTarjeta = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

// Genera un saldo aleatorio entre 10000 y 1000000
const generarSaldoAleatorio = () => {
  return Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000;
};


  const handlePaypalClick = () => {
    setPaypalVisible(true);
    setWalletVisible(false);
    setBotonVisible(true);
    setPaypalSelected(true); 
    setWalletSelected(false); 
  };

  const handleWalletClick = () => {
    setWalletVisible(true);
    setPaypalVisible(false);
    setBotonVisible(true);
    setWalletSelected(true); 
    setPaypalSelected(false); 
  };

  const handleAceptarClick = async (event) => {
    event.preventDefault(); 
    if (paypalSelected) {
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('password').value;
        //const saldo = generarSaldoAleatorio();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ CorreoPayPal: correo, ContrasenaPayPal: contraseña }) 
        };
        
        try {
            const response = await fetch("http://localhost:5194/api/PayPal", requestOptions);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
              if (data.saldoSuficiente) { // Asegúrate de que el nombre de la propiedad es correcto
                  console.log('Redireccionando a confirmación...');
                  navigate('/confirmacion');
                  alert("Aceptado. Su saldo es suficiente.");
              } else {
                  alert(data.Mensaje || "Saldo insuficiente"); 
              }
          } else {
              if (response.status === 404) {
                  alert('Usuario o contraseña incorrectos.');
              } else {
                  alert('Error desconocido. Por favor intente de nuevo.');
              }
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
          alert('Error al procesar la solicitud.');
      }
  } else if (walletSelected) {
      guardar();
  }
};


  const URL = "http://localhost:5194/api/TarjetaCredito";

  const guardar = async () => {
    const numeroTarjeta = document.getElementById('numero-tarjeta').value.replace(/\s+/g, ''); 
    const nombre = document.getElementById('nombre-tarjeta').value;
    const mes = document.getElementById('valido-hasta-dia').value;
    const anio = document.getElementById('valido-hasta-ano').value;
    const cvv = document.getElementById('cvv').value;
    

    const IDTarjeta = generarIDTarjeta();
    const saldo = generarSaldoAleatorio();


    const walletData = {
      TarjetaID: IDTarjeta.toString(),
      UserID: nombre,
      NumeroTarjetaCredito: numeroTarjeta,
      Mes: mes,
      Anio: anio,
      CVV: cvv,
      Saldo: saldo
    };
 
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(walletData)
    };
  
    try {
      const response = await fetch(URL, requestOptions);
      const data = await response.json();
      if (response.ok) {
          navigate('/confirmacion');
          alert("Transacción exitosa");
      } else {
          alert(data.Message || "Error al procesar la solicitud.");
      }
  } catch (error) {
      console.error("Error en la solicitud:", error);
      alert('Error al procesar la solicitud.');
  }
};
  

  return (
    <main>
      <section className="compras">
        <div className="pago">
          <a href="#" id="paypal-check" className={`metodo-pago ${paypalSelected ? 'selected' : ''}`} onClick={handlePaypalClick}>
            <span className="check"></span>
            <label htmlFor="paypal-check">PayPal</label>
          </a>
          <a href="#" id="wallet-check" className={`metodo-pago ${walletSelected ? 'selected' : ''}`} onClick={handleWalletClick}>
            <span className="check"></span>
            <label htmlFor="wallet-check">Wallet</label>
          </a>
        </div>
        {paypalVisible && (
          <div className="paypal">
            <div className="input-container">
              <label htmlFor="correo">Digite el correo electrónico de PayPal</label>
              <input type="text" id="correo" placeholder="Correo PayPal" />
              <label htmlFor="password">Digite la contraseña</label>
              <input type="password" id="password" placeholder="Contraseña" />
              <button id="mostrar-contra" onClick={() => toggleMostrarContraseña()}>Ver</button>
            </div>
          </div>
        )}
        {walletVisible && (
          <div className="wallet">
            <div className="input-container">
              <label htmlFor="numero-tarjeta">Número de tarjeta</label>
              <input type="text" id="numero-tarjeta" maxLength="19" onInput={(e) => formatNumeroTarjeta(e.target)} placeholder="**** **** **** ****" />
            </div>
            <div className="input-container valido-hasta-container">
              <label htmlFor="valido-hasta-dia">Válido hasta (Mes)</label>
              <input type="text" id="valido-hasta-dia" maxLength="2" placeholder="Mes" />
            </div>
            <div className="input-container valido-hasta-container">
              <label htmlFor="valido-hasta-ano">Válido hasta (Año)</label>
              <input type="text" id="valido-hasta-ano" maxLength="4" placeholder="Año" />
            </div>
            <div className="input-container cvv">
              <label htmlFor="cvv">CVV</label>
              <input type="password" id="cvv" maxLength="3" placeholder="***" />
              <button id="mostrar-cvv" onClick={() => toggleMostrarCVV()}>Ver</button>
            </div>
            <div className="input-container">
              <label htmlFor="nombre-tarjeta">Nombre del tarjeta habitante</label>
              <input type="text" id="nombre-tarjeta" placeholder="Nombre completo" />
            </div>
          </div>
        )}
        {botonVisible && (
          <div id="boton-aceptar">
      <form onSubmit={handleAceptarClick}>
  <button type="submit" id="aceptar-btn">Aceptar</button>
</form>
          </div>
        )}
      </section>
    </main>
  );
};




export default CompraMain;
