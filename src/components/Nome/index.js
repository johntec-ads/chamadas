import { useContext } from 'react';
import { userContext } from '../../context/user';

function Nome () {
const { alunos } = useContext( userContext )


  return (
    <div>
      <span style={ { color: '#FF0000' } } >Bem vindo: { alunos } </span>
      <br />

    </div>

  );
}

export default Nome;
