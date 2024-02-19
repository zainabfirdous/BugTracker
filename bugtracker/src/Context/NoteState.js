import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    
    const [userInfo, setUserInfo] = useState({
        token: null,
        urole: 'null',
        uid: 0,
        user: 'null',
      });
  return (
    <NoteContext.Provider value={{ ...userInfo, setUserInfo }}>
    {props.children}
  </NoteContext.Provider>
  );
};

export default NoteState;