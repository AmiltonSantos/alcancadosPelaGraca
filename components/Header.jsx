import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";

const Header = ({ openModal, closeModal, modalIsOpen }) => {
  // set state to open/close modal
  const [isOpen, setIsOpen] = useState(false);

  // set state to form data
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [igreja, setIgreja] = useState("");

  // Success message
  const [successMessage, setSuccessMessage] = useState(null);
  const [registerMessage, setregisterMessage] = useState(null);

  // Error
  const [error, setError] = useState("");

  // Post request to local api which is then sent to the provided api on the server side

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform client-side validation
    // if (!username || !password) {
    //   setError("Email and password are required fields");
    //   return;
    // }

    // Validate email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(username)) {
    //   setError("Please enter a valid email address");
    //   return;
    // }

    // Validate password length
    // if (password.length < 8) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }

    setError("");

    try {
      const response = await fetch("/api/formSubmission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(`Welcome ${data.name}!`);

      if (response.ok) {
        
        // Print welcome message and close login modal after 2 seconds
        // Print register message and close register modal after 4 seconds
        setSuccessMessage(`Welcome back ${data.name}`);
        setregisterMessage(
          `Ainda está em desenlvimento por amilton.dev!`
        );
        setTimeout(() => setIsOpen(false), 2000);
        setTimeout(() => setSuccessMessage(""), 2000);
        setTimeout(() => closeModal(), 4000);
        setTimeout(() => setregisterMessage(""), 4000);
      }
    } catch (error) {
      console.error(error);
    }

    // clearing input data
    setName("");
    setIdade("");
    setWhatsapp("");
    setIgreja("");

    // setUsername("");
    // setPassword("");
  };

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <Link href="/">
          <img src="/logo.png" className="logo" alt="" />
        </Link>
      </div>
      <div className="CTA">
        <button className="signup" onClick={openModal}>
          Inscreva-se
        </button>
        <Modal
          className="modal"
          overlayClassName="Overlay"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <div className="modalContainer">
            <h3 className="loginHeader">Inscreva-se para o Evento</h3>
            <p className="newCustomer">
              Dia 15 de Novembro as 19:00 horas
            </p>
            <hr />
            <form className="loginForm" onSubmit={handleSubmit}>
              <label>Name</label> <br />
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Nome Completo"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label>Idade</label> <br />
              <input
                type="number"
                id="idade"
                value={idade}
                placeholder="0"
                required
                onChange={(e) => setIdade(e.target.value)}
              />
              <label>Whatsapp</label> <br />
              <input
                type="tel"
                id="whatsapp"
                value={whatsapp}
                placeholder="(00) 00000-0000"
                maxLength="11"
                required
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              <br />
              <label>Igreja / Congregação</label> <br />
              <input
                type="text"
                id="igreja"
                value={igreja}
                placeholder="igreja"
                required
                onChange={(e) => setIgreja(e.target.value)}
              />
              <button type="submit">Enviar</button>
            </form>
            <div className="closeModal" onClick={closeModal}>
              &#x2715;
            </div>
            {registerMessage && (
              <p className="welcomeMessage">{registerMessage}</p>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
