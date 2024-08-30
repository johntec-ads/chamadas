import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
/* import { RoutesApp } from './routes'; */

/* Importando o contexto do arquivo auth.js*/
import AuthProvider from './contexts/auth'

function App () { 

  return (

    <BrowserRouter >
      <AuthProvider>{/* context api */}
        <RoutesApp />{/* roteando a páginas */}
      </AuthProvider>
    </BrowserRouter >

  );
}

export default App;


