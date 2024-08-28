import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext( {} );/* Inicializando
o contexto com objeto vazio */

function AuthProvider ( { children} ) {/* parâmetro filho para 
  repassar dados para todos os componentes */
  const [ user, setUser ] = useState(null);

  function signIn(email, password) {
    console.log(email);
    console.log(password);
    alert('LOGADO COM SUCESSO!')
  }


  return (
    /* provedor de contexto */
    <AuthContext.Provider
      value={{
        signed: !!user,/* '!!' convert a state em boleano */
        user,
        signIn /* exportando a function para outros components */
      }}    
    
    >
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;