import { useState, createContext } from 'react';

export const UserContext = createContext( {} );

function UserProvider ( { children } ) {
  const [ alunos, setAlunos ] = useState('johntec.ads');


  return (
    <UserContext.Provider value={{ alunos }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider;