import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pix = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      //Link do grupo do whatsapp
      document.location.href = 'https://chat.whatsapp.com/GsXG9wJeSrY5xHcDDEW8EK';
    }
  }

  const numeroPix = 'gerenciaferroeacoindiara@gmail.com';

  const toastSuccess = () => toast.success('Pix oópiado com sucesso!');

  return (
    <div className="pixContainer">
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
                autoClose={4000}
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
  );
};

export default Pix;

