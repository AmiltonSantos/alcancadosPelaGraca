import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { IMaskInput } from "react-imask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ openModal, closeModal, modalIsOpen }) => {
  // set state to open/close modal
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      //Link do grupo do whatsapp
      document.location.href = 'https://chat.whatsapp.com/GsXG9wJeSrY5xHcDDEW8EK';
    }
  }

  const toastSuccess = () => toast.success('Pix cópiado com sucesso!');

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  `

  function LoadingComponent() {
    return <Container className="App">
      <h1>Enviando...</h1>
      <BeatLoader loading={setLoading} size={60} color={"#36d7b7"} />
    </Container>
  }

  const numeroPix = 'gerenciaferroeacoindiara@gmail.com';

  // set state to form data
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

    // Validar Whatsa
    if (whatsapp.length < 14) {
      setError("Erro! São 11 números o WhatsApp");
      setWhatsapp("");
      return;
    }

    setError("");
    setLoading(true);

    try {
      /* Usando o -> https://sheetdb.io */
      // const response = await fetch("https://sheetdb.io/api/v1/9i0ongodfdtta", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     data: [
      //       {
      //         id: "=ROW()-1",
      //         name,
      //         idade,
      //         whatsapp,
      //         igreja,
      //         datainscricao: (new Date().toLocaleString()).toString().replace(',', '')
      //       },
      //     ],
      //   }),
      // });

      /* Usando o -> https://sheet.best/api/sheets  */
      const response = await fetch("https://sheet.best/api/sheets/ee05e664-7147-42c3-9553-1452c08caf63", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: "=ROW()-1",
          name,
          idade,
          whatsapp,
          igreja,
          datainscricao: (new Date().toLocaleString()).toString().replace(',', '')
        }),
      });

      setLoading(false);

      const data = await response.json();

      if (response.ok) {

        // setSuccessMessage(`${data.created === 1 ? 'Cadastrado com sucesso' : 'Error ao cadastrar'}`); //usado no https://sheetdb.io
        setSuccessMessage(data[0].name + ' Cadastrado com sucesso!'); //usado no https://sheet.best/api/sheets 
        setregisterMessage(
          `Cadastrado com sucesso!`
        );

        setTimeout(() => closeModal(), setTimeout(() => toggleModal(), 200));

      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

    // clearing input data
    setName("");
    setIdade("");
    setWhatsapp("");
    setIgreja("");

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
          {loading && <LoadingComponent />}
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
              <IMaskInput
                mask="(00) 00000-0000"
                value={whatsapp}
                placeholder="(00) 00000-0000"
                onChange={(e) => setWhatsapp(e.target.value)}
              />

              <br />
              <label>Igreja / Congregação</label> <br />
              <input
                type="text"
                id="igreja"
                value={igreja}
                placeholder="Onde congrega"
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

            {error && <p className="errorMessage">{error}</p>}
            {successMessage && (
              <p className="welcomeMessage">{successMessage}</p>
            )}
          </div>
        </Modal>

        <Modal
          className="modal"
          isOpen={isOpen}
          onRequestClose={toggleModal}
          ariaHideApp={false}
        >
          <div className="modalContainer">
            <br></br>
            <img src="/taxaInscricao.png" className="taxa" alt="" />
            <hr />

            <br></br>
            <h3>Marcos Rodrigues dos Santos</h3>

            <br></br>
            <div className="divPix" onClick={toastSuccess}>
              <h3> Pix E-mail: gerenciaferroeacoindiara@gmail.com</h3>
              <ContentCopyIcon className="corIconPix" onClick={() => { navigator.clipboard.writeText(numeroPix) }} />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>

            <br></br>
            <h3>Banco BMG</h3>

            <br></br>
            <button className="ctaButtonTaxa" onClick={toggleModal}>Entre no Grupo do WhatsApp</button>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default Header;
