import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext( {} );/* Inicializando
o contexto com objeto vazio */

function AuthProvider ( { children} ) {/* parâmetro filho para 
  repassar dados para todos os componentes */
  const [ user, setUser ] = useState(null);

  return (
    /* provedor de contexto */
    <AuthContext.Provider
      value={{
        signed: !!user,/* '!!' convert a state em boleano */
        user,
      }}
    
    
    >
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;