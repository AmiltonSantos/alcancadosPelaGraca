import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Header = ({ openModal, closeModal, modalIsOpen }) => {
  // set state to open/close modal
  const [isOpen, setIsOpen] = useState(false);


  function toggleModal() {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      //Link do grupo do whatsapp
      document.location.href = 'https://chat.whatsapp.com/GsXG9wJeSrY5xHcDDEW8EK';
    }
  }

  const numeroPix = '00184519000177';

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
    if (whatsapp.length < 11) {
      setError("Erro! São 11 números o WhatsApp");
      setWhatsapp("");
      return;
    }

    setError("");

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
      //         datainscricao: new Date().toLocaleString(),
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
          datainscricao: new Date().toLocaleString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {

        //setSuccessMessage(`${data.created === 1 ? 'Cadastrado com sucesso' : 'Error ao cadastrar'}`); //usado no https://sheetdb.io
        setSuccessMessage(data[0].name + ' Cadastrado com sucesso!'); //usado no https://sheet.best/api/sheets 
        setregisterMessage(
          `Cadastrado com sucesso!`
        );

        setTimeout(() => closeModal(), setTimeout(() => toggleModal(), 500));

      }
    } catch (error) {
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
                type="phone"
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
            <h3>Igreja Evangélica Assembleia de Deus Ministerio Missao</h3>

            <br></br>
            <div className="divPix">
              <h3> CNPJ Pix: 00.184.519/0001-77</h3>
              <ContentCopyIcon className="corIconPix" onClick={() => { navigator.clipboard.writeText(numeroPix) }} />
            </div>

            <br></br>
            <h3>Caixa Econômica</h3>

            <br></br>
            <button className="ctaButtonTaxa" onClick={toggleModal}>Entre no Grupo do WhatsApp</button>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default Header;
