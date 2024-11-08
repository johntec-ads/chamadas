import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';//import do component Header
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter } from 'firebase/firestore'

import './dashboard.css';

export default function Dashboard () {
  const { logout } = useContext( AuthContext );

  const [ chamados, setChamados ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  useEffect(() => {
    async function loadChamados() {
      
    }
    loadChamados()
  }, [])

  return (
    <div>
      <Header />

      <div className='content' >
        <Title name="Tickets">
          <FiMessageSquare size={ 25 } />
        </Title>

        <>

          { chamados.length === 0 ? (/* Se for igual a 0, não tem chamados*/
            <div className='container dashboard' >
              <span>Nehum chamado encontado... </span>
              <Link to="/new" className='new'>
                <FiPlus color='#FFF' size={ 25 } />
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className='new'>
                <FiPlus color='#FFF' size={ 25 } />
                Novo chamado
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope='col' >Cliente</th>
                    <th scope='col' >Assunto</th>
                    <th scope='col' >Status</th>
                    <th scope='col' >Cadastrado em</th>
                    <th scope='col' >#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label='Cliente' >Mercado Rocha</td>
                    <td data-label='Assunto' >Suporte</td>
                    <td data-label='Status' >
                      <span className='badge' style={ { backgroundColor: '#999' } } >
                        Em Aberto
                      </span>
                    </td>
                    <td data-label='Cadastrado' >12/05/2024</td>
                    <td data-label='#' >
                      <button className='action' style={ { backgroundColor: '#3583f6' } } >
                        <FiSearch color='#FFF' size={ 17 } />
                      </button>
                      <button className='action' style={ { backgroundColor: '#f6a935' } } >
                        <FiEdit2 color='#FFF' size={ 17 } />
                      </button>
                    </td>
                  </tr>


                </tbody>
              </table>
            </>
          ) }


        </>

      </div>

    </div>
  )
}