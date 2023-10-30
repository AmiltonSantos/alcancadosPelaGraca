import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

const Grupowhatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      //Link do grupo do whatsapp
      document.location.href = 'https://chat.whatsapp.com/GsXG9wJeSrY5xHcDDEW8EK';
    }
  }

  return (
    <div className="whatsappContainer">
      <br></br>

      <h3>ENTRE NO GRUPO DO WHATSAPP DO ALCANÇADOS PELA GRAÇA</h3>

      <br></br>
      <hr />
      <p className="newCustomer">
        Clique no botão abaixo
      </p>

      <button className="ctaButtonTaxa" onClick={toggleModal}>Entre no Grupo do WhatsApp</button>
    </div>
  );
};

export default Grupowhatsapp;

