import logo from '../../assets/logo.png'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import './signup.css'


export default function SignUp () {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ name, setName ] = useState( '' );

  function hundleSubmit ( e ) {
    e.preventDefault()
    if ( name !== '' && email !== '' && password !== '' ) {
      alert('Fazer Cadastro')

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