import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConections';
import { createUserWithEmailAndPassword } from  'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext( {} );/* Inicializando
 e exportando o contexto com objeto vazio */

/* component provedor de cotexto */
 function AuthProvider ( { children} ) {/* parâmetro filho para 
  repassar dados para todos os componentes */
  const [ user, setUser ] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);


  function signIn(email, password) {
    console.log(email);
    console.log(password);
    alert('LOGADO COM SUCESSO!')
  }

  /* Cadastro novo user */
  async function signUp(email, password, name) {//Param de retorno
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        nome: name,
        avatarUrl: null 
      })
      .then(() => {
        alert('Cadastrado com sucesso')
        setLoadingAuth(false);
      })

    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);

    })



  }

  return (
    /* provedor de contexto */
    <AuthContext.Provider
      value={{
        /* '!!' convert a state em boleano false */
        signed: !!user,
        user,
        /* export metodos para outros components */
        signIn,
        signUp

      }}    
    
    >
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;