import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';//Lib de alert
/* Importando o contexto do arquivo auth.js*/
import AuthProvider from './contexts/auth'

function App () { 

  return (

    <BrowserRouter >
      <AuthProvider>{/* context api */}
        <ToastContainer autoClose={3000} />
        <RoutesApp />{/* roteando a páginas */}
      </AuthProvider>
    </BrowserRouter >

  );
}

export default App;


