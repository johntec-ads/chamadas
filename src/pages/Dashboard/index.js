import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';//import do component Header
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import './dashboard.css';

export default function Dashboard () {
  const { logout } = useContext( AuthContext );

  async function handleLogout () {
    await logout()
  }


  return (
    <div>
      <Header />

      <div className='content' >
        <Title name="Tickets">
          <FiMessageSquare size={ 25 } />
        </Title>

        <>
          <Link to="/new" className='new'>
            <FiPlus color='#FFF' size={25} />
            Novo chamado
          </Link>
            <div className='container' >
              <h1>Teste</h1>
            </div>
        </>

      </div>

    </div>
  )
}