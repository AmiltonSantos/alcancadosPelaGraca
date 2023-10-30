import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pix = () => {
  
  const numeroPix = 'gerenciaferroeacoindiara@gmail.com';

  const toastSuccess = () => toast.success('Pix cópiado com sucesso!');

  return (
    <div className="pixContainer">
            <br></br>
            <img src="/taxaInscricao.png" className="taxa" alt="" />
            <hr />

            <br></br>
            <h3>Marcos Rodrigues dos Santos</h3>

            <br></br>
            <div className="divPix" onClick={toastSuccess}>
              <p>Cópiar pix...</p>
              <ContentCopyIcon className="corIconPix" onClick={() => { navigator.clipboard.writeText(numeroPix) }} />
            </div>
            <h3> Pix E-mail: gerenciaferroeacoindiara@gmail.com</h3>
            <ToastContainer
              position="bottom-left"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            

            <br></br>
            <h3>Banco BMG</h3>

            <br></br>

          </div>
  );
};

export default Pix;

