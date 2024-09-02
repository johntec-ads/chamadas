import { useState, useContext } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

import './signup.css'


export default function SignUp () {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ name, setName ] = useState( '' );
  

/* Obtendo e importando o signUp do auth.js */
  const { signUp } = useContext( AuthContext )

  function hundleSubmit ( e ) {
    e.preventDefault()
    if ( name !== '' && email !== '' && password !== '' ) {
      signUp(email, password, name)

    }

  }

  return (
    <div className='container-center' >
      <div className='login'>
        <div className='login-area' >
          <img src={ logo } alt='Logo do sistema de chamadas' />
        </div>

        <form onSubmit={ hundleSubmit } >
          <h1> Nova conta </h1>

          <input
            type='text'
            placeholder='Nome'
            value={ name }
            onChange={ ( e ) => setName( e.target.value ) }
          />
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
          <button type='submit'>Cadastrar</button>
        </form>
        <Link to='/' >Já possui uma conta ? Faça login.</Link>
      </div>
    </div>
  )
}