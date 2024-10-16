import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConections';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/* export para a exportanção do context para outros arquivos */
export const AuthContext = createContext( {} );/* Inicializando
 e exportando o contexto com objeto vazio */

/* component provedor de cotexto */
function AuthProvider ( { children } ) {/* parâmetro filho para 
  repassar dados para todos os componentes */
  const [ user, setUser ] = useState( null );
  const [ loadingAuth, setLoadingAuth ] = useState( false );
  const [ loading, setLoading ] = useState( true );

  const navigate = useNavigate();

  useEffect( () => {
    async function loadUser () {
      const storageUser = localStorage.getItem( '@ticketsPRO' )

      if ( storageUser ) {//Se localStorage possui dados...
        //Salva os dados na state setUser
        setUser( JSON.parse( storageUser ) )//Convertendo para objeto
        setLoading( false );
      }

      setLoading( false )//Caso não passe no if, será finalizado aqui


    }

    loadUser()
  }, [] )


  async function signIn ( email, password ) {
    setLoadingAuth( true );
    await signInWithEmailAndPassword( auth, email, password )
      .then( async ( value ) => {//value traz os dados do user
        let uid = value.user.uid;
        const docRef = doc( db, "users", uid );
        //Acessando os dados do user.
        const docSnap = await getDoc( docRef )

        let data = {//Criando objeto para obter os dados
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl
        }
        setUser( data );//Passando o objeto para o usuário que esta logando
        storageUser( data );//Salvando no localStorage
        setLoadingAuth( false );//Mudando para false
        toast.success( 'Bem-vindo(a) de volta!' )
        navigate( '/dashboard' )//Redirecionando para o dashboard
      } )
      .catch( ( error ) => {
        console.log( error );
        setLoadingAuth( false );
        toast.error( 'Ops, algo deu errado!' )

      } )


  }

  /* Cadastro de novo user */
  async function signUp ( email, password, name ) {//Param de retorno
    setLoadingAuth( true );/* Informa o início do cadastro */

    /* Criando novo usuário com email e senha no firebase */
    await createUserWithEmailAndPassword( auth, email, password )
      .then( async ( value ) => {//Retorna a promessa de um novo user
        let uid = value.user.uid

        await setDoc( doc( db, "users", uid ), {
          nome: name,
          avatarUrl: null
        } )
          .then( () => {

            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null,
            }
            setUser( data )//atribuindo os dados do novo user, para a state user.
            storageUser( data );//invocando o metodo
            setLoadingAuth( false );
            toast.success( "Seja bem-vindo ao sistema!" )
            navigate( '/dashboard' );/* Redirecionando para dashboard */

          } )

      } )
      .catch( ( error ) => {
        console.log( error );
        setLoadingAuth( false );
      } )
  }

  function storageUser ( data ) {
    localStorage.setItem( '@ticketsPRO', JSON.stringify( data ) );
  }

  async function logout() {//Metodo desloga e remove o localStorage
    await signOut(auth)
    localStorage.removeItem('@ticketsPRO')//remove storage
    setUser(null);//Será null,pois não teremos mais informações do usuário.
    
  }

  return (
    /* provedor de contexto */
    <AuthContext.Provider
      value={ {
        
        signed: !!user,/* '!!' convert a state no boleano atual, false ou true  */
        
          user,/* export metodos para outros components */        
        signIn,
        signUp,
        logout,
        loadingAuth,//exportando o loadingAuth para adicionar o efeito visual.
        loading,

      } }

    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;