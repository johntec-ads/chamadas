import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi';


export default function Customers () {
  const [ nome, setNome ] = useState('');
  const [ cnpj, setCnpj ] = useState('');
  const [ endereco, setEndereco ] = useState('');

  return(
    <div>
    <Header/>

    <div className='content'>

      <Title name='Clientes'>
        <FiUser size={25} />
      </Title>

      <div className='container' >
        <form className='form-profile' >
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

        </form>
      </div>

    </div>    

    </div>
  )
}