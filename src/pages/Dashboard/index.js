import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';//import do component Header
import Title from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConections';

import { format } from 'date-fns';
import Modal from '../../components/Modal';

import './dashboard.css';

const listRef = collection( db, 'chamados' );

export default function Dashboard () {
  /* const { logout } = */ useContext( AuthContext );

  const [ chamados, setChamados ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  const [ isEmpty, setIsEmpty ] = useState( false );
  const [ lastDoc, setLastDoc ] = useState();
  const [ loadingMore, setLoadingMore ] = useState( false );

  const [ showPostModal, setShowPostModal ] = useState( false );
  const [ detail, setDeatail ] = useState();


  useEffect( () => {
    async function loadChamados () {
      try {

        /* Busca de lista por ordem e com limite em quantidade */
        const q = query( listRef, orderBy( 'create', 'desc' ), limit( 5 ) );

        /* Recebendo todos os docs */
        const querySnapshot = await getDocs( q )
        setChamados( [] );

        await updateState( querySnapshot )

        setLoading( false )/* Passa a state para false */
      } catch ( error ) {
        console.log( 'Erro ao carregar chamados', error );
      }

    }

    loadChamados();

    return () => { }
  }, [] )

  async function updateState ( querySnapshot ) {

    const isCollectionEmpty = querySnapshot.size === 0;/* recebe true caso  esteja vazia */

    if ( !isCollectionEmpty ) {/* Se não estiver vazia, segue o bloco do if */
      let lista = [];

      querySnapshot.forEach( ( doc ) => {
        lista.push( {
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          create: doc.data().create,
          createdFormat: format( doc.data().create.toDate(), 'dd/MM/yyyy' ),
          status: doc.data().status,
          complemento: doc.data().complemento,
        } )
      } )

      /* Pegando o último item. */
      const lastDoc = querySnapshot.docs[ querySnapshot.docs.length - 1 ];


      /* Buscando os chamados existentes e adicinando os novos chamados da lista */
      setChamados( chamados => [ ...chamados, ...lista ] );
      setLastDoc( lastDoc );

    } else {/* Se a lista esiver vazia, cai no else */
      setIsEmpty( true )
    }

    setLoadingMore( false );
  }

  if ( loading ) {
    return (
      <div>
        <Header />

        <div className='content'>
          <Title name="Tickets">
            <FiMessageSquare size={ 25 } />
          </Title>

          <div className='container dashboard'>
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>

    )
  }

  async function handleMore () {
    setLoadingMore( true )

    /* Busca de lista por ordem e com limite em quantidade */
    const q = query( listRef, orderBy( 'create', 'desc' ), startAfter( lastDoc ), limit( 5 ) );
    const querySnapshot = await getDocs( q );
    await updateState( querySnapshot );
  }

  function toggleModal ( item ) {
    setShowPostModal( !showPostModal )/* se estiver true torne-se false e vice-versa */
    setDeatail( item )
  }

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
              <span>Nehum chamado encontrado... </span>
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
                  { chamados.map( ( item, index ) => {
                    return (
                      <tr key={ index }>
                        <td data-label='Cliente' > { item.cliente } </td>
                        <td data-label='Assunto' > { item.assunto } </td>
                        <td data-label='Status' >
                          <span className='badge' style={ { backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' } } >
                            { item.status }
                          </span>
                        </td>
                        <td data-label='Cadastrado'> { item.createdFormat } </td>
                        <td data-label='#' >
                          <button className='action' style={ { backgroundColor: '#3583f6' } } onClick={ () => toggleModal( item ) } >
                            <FiSearch color='#FFF' size={ 17 } />
                          </button>
                          <Link to={ `/new/${ item.id }` } className='action' style={ { backgroundColor: '#f6a935' } } >
                            <FiEdit2 color='#FFF' size={ 17 } />
                          </Link>
                        </td>
                      </tr>
                    )
                  } ) }
                </tbody>
              </table>

              {/* Condição: Se lodingMore estiver true, renderiza o h3 */ }
              { loadingMore && <h3>Buscando mais chamados...</h3> }
              {/* Se loadingMore true e isEmpty estiver oposto de false, renderiza o botão */ }
              { !loadingMore && !isEmpty && <button className='btn-more' onClick={ handleMore }>Buscar mais</button> }

            </>
          ) }
        </>
      </div>

      { showPostModal && (
        <Modal
          conteudo={ detail }/* recebe o conteúdo */
          close={ () => setShowPostModal( !showPostModal ) }/* Se estiver aberto vai para fechado, e vice-versa */

        />
      ) }

    </div>
  )
}