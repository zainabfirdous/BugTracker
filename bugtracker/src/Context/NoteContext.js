// import React from 'react'
// import { createContext } from 'react';

// const NoteContext = createContext();
// const NoteState = (props) =>{
//   const state = {
//     "token":"tokenmyToken",
//     "urole":"Admin",
//     "uid":101,
//     "uname" : "Sachin"
//   }
//   console.log("state ",state)
//   return (
//     <NoteContext.Provider value={state}>
//       {props.children}
//     </NoteContext.Provider>
//   )
// }
  

// export default NoteState;

import { createContext } from 'react';

const NoteContext = createContext();

export default NoteContext;
