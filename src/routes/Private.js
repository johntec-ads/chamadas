import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function Private({children}) {
  const { signed, loading } = useContext(AuthContext);

  if ( loading ) {
    return(
      <div></div> /* Div em branco */
    )
  }
  
  if ( !signed ) {//Se não estiver logado...
    return <Navigate to="/" /> /* Retorna o user para a tela login */

  }

  return children;

}