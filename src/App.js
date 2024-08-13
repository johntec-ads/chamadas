import { useState } from 'react';
import Alunos from './components/Alunos';

import UserProvider from './context/user';

function App () {
  


  return (

    <UserProvider>
      <div>
        <h1> Escola </h1>

        <hr />
        <Alunos />

      </div>
    </UserProvider>


  );
}

export default App;


