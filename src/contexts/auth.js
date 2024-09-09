import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConections';
import { createUserWithEmailAndPassword } from  'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext( {} );/* Inicializando
 e exportando o contexto com objeto vazio */

/* component provedor de cotexto */
 function AuthProvider ( { children} ) {/* parâmetro filho para 
  repassar dados para todos os componentes */
  const [ user, setUser ] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();


  function signIn(email, password) {
    console.log(email);
    console.log(password);
    alert('LOGADO COM SUCESSO!')
  }

  /* Cadastro de novo user */
  async function signUp(email, password, name) {//Param de retorno
    setLoadingAuth(true);/* Informa o início do cadastro */

    /* Criando novo usuário com email e senha no firebase */
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {//Retorna a promessa de um novo user
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        nome: name,
        avatarUrl: null 
      })
      .then(() => {
        
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null,
        }
        setUser(data)//obtendo os dados do novo user
        setLoadingAuth(false);
        navigate('/dashboard');/* Redirecionando para dashboard */
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
        signUp,
        loadingAuth,//exportando o loadingAuth para adicionar o efetio visual

      }}    
    
    >
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;