import { useState, useEffect, useContext } from 'react';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConections';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';

import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import './new.css';

const listRef = collection( db, 'customers' );

export default function New () {
  const { user } = useContext( AuthContext );
  const { id } = useParams();
  const navigate = useNavigate();

  const [ customers, setCustomers ] = useState( [] );/*Array p/ lista de cliêntes */
  const [ loadCustomer, setLoadCustomer ] = useState( true );
  const [ customerSelected, setCustomerSelected ] = useState( 0 );


  const [ complemento, setComplemento ] = useState( '' );
  const [ assunto, setAssunto ] = useState( 'Suporte' );
  const [ status, setStatus ] = useState( 'Aberto' );
  const [ idCustomer, setIdCustomer ] = useState( false );


  useEffect( ( ) => {

    async function loadCustomers () {
      const querySnapshot = await getDocs( listRef )
        .then( ( querySnapshot ) => {/* promisse caso de sucesso */
          /* percorre o docs buscando o id e ref, e adiciona para useState customers */
          let lista = [];

          querySnapshot.forEach( ( doc ) => {/*repassa todos os documentos*/
            lista.push( {
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            } )
          } )

          if ( querySnapshot.docs.size === 0 ) {/* verifica se esta vazio */
            console.log( 'NENHUMA EMPRESA ENCONTRADA' );
            /* se vazio, preenche com cliênte fictício */
            setCustomers( [ { id: '1', nomeFantasia: 'FREELA' } ] )
            setLoadCustomer( false );
            return;/* para o código. */
          }

          /* Encontrou os itens */
          setCustomers( lista );/* atualiza a lista */
          setLoadCustomer( false );/* para o código */

          if ( id ) {
            loadId( lista )
          }

        } )
        .catch( ( error ) => {/* caso de erro */
          console.log( "Erro ao buscar os clientes", error )
          setLoadCustomer( false );
          setCustomers(
            /* Em caso de erro, vamos criar um cliênte fictício */
            [ { id: '1', nomeFantasia: 'FREELA' } ]
          )
        } )
    }
    loadCustomers();    
  }, [id] );


  async function loadId ( lista ) {
    const docRef = doc( db, "chamados", id )/* Receber um único chamado ref ao id */
    await getDoc( docRef ) /* busca com getDoc, através da referência docRef  */
      .then( ( snapshot ) => {/* sucesso */
        setAssunto( snapshot.data().assunto )/* busca e atualiza */
        setStatus( snapshot.data().status )/* busca e atualiza */
        setComplemento( snapshot.data().complemento )/* busca e atualiza */

        /* Buscar e atualilzar o cliente */
        let index = lista.findIndex( item => item.id === snapshot.data().clienteId );
        setCustomerSelected( index );
        setIdCustomer( true );


      } )
      .catch( ( error ) => {/* falha */
        console.log( error );
        setIdCustomer( false );
      } )
  }

  function handleOptionChange ( e ) {
    setStatus( e.target.value )
  }

  function handleChangeSelect ( e ) {
    setAssunto( e.target.value );
  }

  function handleChangeCustomer ( e ) {
    setCustomerSelected( e.target.value )

  }

  async function handleRegister ( e ) {
    e.preventDefault();

    /* Se for editar o chamado, executa o bloco */
    if ( idCustomer ) {
      /* Atualizando chamado */
      const docRef = doc( db, "chamados", id )
      await updateDoc( docRef, {
        cliente: customers[ customerSelected ].nomeFantasia,
        clienteId: customers[ customerSelected ].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
      } )
      .then(() => {
        toast.info('Chamado atualizado com sucesso!')
        setCustomerSelected(0);
        setComplemento('');
        navigate('/dashboard');
      })
      .catch((error) => {
        toast.error('Ops! Erro ao atualizar este chamado.')
        console.log(error);
      })
      return;

    }

    /* Registrar chamado */
    await addDoc( collection( db, 'chamados' ), {/* criando nova coleção */
      create: new Date(),/* gera data de origem */
      cliente: customers[ customerSelected ].nomeFantasia,
      clienteId: customers[ customerSelected ].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    } )
      .then( () => {
        toast.success( 'Chamado registrado!' )
        setComplemento( '' )
        setCustomerSelected( 0 )
      } )
      .catch( ( error ) => {
        toast.error( 'Ops erro ao registrar, tente mais tarde.' )
        console.log( error )
      } )

  }


  return (
    <div>
      <Header />

      <div className='content'>
        <Title name={id ? 'Editando chamado' : 'Novo chamado'}>
          <FiPlusCircle size={ 25 } />
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={ handleRegister } >

            <label>Clientes</label>
            {
              /* Se loadCustomer estiver true, vai renderizar o input */
              loadCustomer ? (
                <input type='text' disabled={ true } value='Carregando...' />
              ) : (
                /* Se loadCustomer não estiver true */
                <select value={ customerSelected } onChange={ handleChangeCustomer } >
                  { customers.map( ( item, index ) => {
                    return (
                      <option key={ index } value={ index } >
                        { item.nomeFantasia }
                      </option>
                    )

                  } ) }
                </select>
              )
            }

            <label>Assunto</label>
            <select value={ assunto } onChange={ handleChangeSelect } >
              <option value='Suporte'>Suporte</option>
              <option value='Visita Tecnica'>Visita Tecnica</option>
              <option value='Financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className='status'>
              <input
                type='radio'
                name='radio'
                value='Aberto'
                onChange={ handleOptionChange }
                checked={ status === 'Aberto' }
              />
              <span>Em aberto</span>
              <input
                type='radio'
                name='radio'
                value='Progresso'
                onChange={ handleOptionChange }
                checked={ status === 'Progresso' }
              />
              <span>Progresso</span>
              <input
                type='radio'
                name='radio'
                value='Atendido'
                onChange={ handleOptionChange }
                checked={ status === 'Atendido' }
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type='text'
              placeholder='Descreva seu problema (opcional).'
              value={ complemento }
              onChange={ ( e ) => setComplemento( e.target.value ) }
            />

            <button type='submit'>Registrar</button>

          </form>
        </div>
      </div>
    </div>
  )
}