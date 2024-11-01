import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi';

import { db } from '../../services/firebaseConections';
import { addDoc, collection } from 'firebase/firestore';

import { toast } from 'react-toastify';


export default function Customers () {
  const [ nome, setNome ] = useState('');
  const [ cnpj, setCnpj ] = useState('');
  const [ endereco, setEndereco ] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    if(nome !== '' && cnpj !== '' && endereco !== '') {
      /* Adiciona um documento, gerando um id único e aponta para a coleção */
      await addDoc(collection(db, "customers"), {
        /* declara o objeto referenciando as useState */
        nomeFantasia: nome,
        cnpj: cnpj,
        endereco: endereco,
      })
      .then(()=> {/* promisse caso de sucesso */
      setNome('')
      setCnpj('')
      setEndereco('')
      toast.success('Empresa registrada!')
      })
      .catch(( error ) => {/* promisse caso de error */
        console.log(error);
        toast.error('Erro ao fazer o cadastro.')
      })
    }else {
      toast.error('Preencha todos os campos!')
    }

  }

  return(
    <div>
    <Header/>

    <div className='content'>

      <Title name='Clientes'>
        <FiUser size={25} />
      </Title>

      <div className='container' >
        <form className='form-profile' onSubmit={handleRegister} >
          <label>Nome fantasia</label>
          <input 
            type='text'
            placeholder='Nome da empresa'
            value={nome}
            onChange={ (e) => setNome(e.target.value) }
          />

          <label>CNPJ</label>
          <input 
            type='text'
            placeholder='Digite o  cnpj'
            value={cnpj}
            onChange={ (e) => setCnpj(e.target.value) }
          />

          <label>Endereço</label>
          <input 
            type='text'
            placeholder='Digite seu endereço'
            value={endereco}
            onChange={ (e) => setEndereco(e.target.value) }
          />
          <button type="submit" >
            Salvar
          </button>

        </form>
      </div>

    </div>    

    </div>
  )
}