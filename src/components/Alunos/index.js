
import Nome from '../Nome';

function Alunos ( { nome, mudaNome } ) {
  return (

    <div>
      <h2> Component Alunos </h2>
      <Nome nome={ nome } mudaNome={ mudaNome } />
    </div>
  );
}

export default Alunos;
