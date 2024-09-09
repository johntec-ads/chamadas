/* useContext : Hook usado para consumo de contexto */
import { useState, useContext } from 'react';
import './signin.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth' /* Import do contextApi */


export default function SignIn () {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const { signIn, loadingAuth } = useContext( AuthContext )/* import da function signIn */

  async function handleSignIn (e) {
    e.preventDefault()    

    if(email !== ''  && password !== '' ) {/* Condição para dados preenchidos */
     await signIn( email, password   );

    }

  }

  return (
    <div className='container-center' >
      <div className='login'>
        <div className='login-area' >
          <img src={ logo } alt='Logo do sistema de chamadas' />
        </div>

        <form onSubmit={handleSignIn} >
          <h1> Entrar </h1>
          <input
            type='text'
            placeholder='email@email.com'
            value={ email }
            onChange={ ( e ) => setEmail( e.target.value ) }
          />
          <input
            type='password'
            placeholder='digite sua senha'
            value={ password }
            onChange={ ( e ) => setPassword( e.target.value ) }
          />
          <button type='submit'>
            { loadingAuth ? "Carregando..." : "Acessar" }
          </button>
        </form>
        <Link to='/register' >Criar uma conta </Link>
      </div>
    </div>
  )
}