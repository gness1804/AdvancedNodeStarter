import * as React from 'react';

const LoggedInAsElem = ({name}) => {
  return (
    <p className="logged-in-as-elem" style={{ position: 'absolute', left: '300px' }}>Logged is as: {name}</p>
  );
}

export default LoggedInAsElem;
