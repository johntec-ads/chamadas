import { useState, useEffect, useContext } from 'react';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConections';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import './new.css';

const listRef = collection( db, 'customers' );

export default function New () {
  const { user } = useContext( AuthContext );

  const [ customers, setCustomers ] = useState( [] );/*Array p/ lista de cliêntes */
  const [ loadCustomer, setLoadCustomer ] = useState( true );
  const [ customerSelected, setCustomerSelected ] = useState( 0 );


  const [ complemento, setComplemento ] = useState( '' );
  const [ assunto, setAssunto ] = useState( 'Suporte' );
  const [ status, setStatus ] = useState( 'Aberto' );

  useEffect( () => {
    async function loadCustomers () {
      const querySnapshot = await getDocs( listRef )
        .then( ( snapshot ) => {/* promisse caso de sucesso */
          /* percorre o docs buscando o id e ref, e adiciona para useState customers */
          let lista = [];

          snapshot.forEach( ( doc ) => {/*repassa todos os documentos*/
            lista.push( {
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            } )
          } )

          if ( snapshot.docs.size === 0 ) {/* verifica se esta vazio */
            console.log( 'NENHUMA EMPRESA ENCONTRADA' );
            /* se vazio, preenche com cliênte fictício */
            setCustomers( [ { id: '1', nomeFantasia: 'FREELA' } ] )
            setLoadCustomer( false );
            return;/* para o código. */
          }

          /* Encontrou os itens */
          setCustomers( lista );/* lista atualizada */
          setLoadCustomer( false );/* para o código */

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

  }, []/* array de dependencias */ )

  function handleOptionChange ( e ) {
    setStatus( e.target.value )
  }

  function handleChangeSelect ( e ) {
    setAssunto( e.target.value );
  }

  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value)

  }


  return (
    <div>
      <Header />

      <div className='content'>
        <Title name='Novo chamado'>
          <FiPlusCircle size={ 25 } />
        </Title>

        <div className='container'>
          <form className='form-profile'>

            <label>Clientes</label>
            {
              /* Se loadCustomer estiver true, vai renderizar o input */
              loadCustomer ? (
                <input type='text' disabled={ true } value='Carregando...' />
              ) : (
                /* Se loadCustomer não estiver true */
                <select value={ customerSelected } onChange={handleChangeCustomer} >

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