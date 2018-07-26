import * as React from 'react';
import { Link } from 'react-router-dom';

const RightLinks = () => {
  return [
    <li key="3" style={{ margin: '0 10px' }}>
      <Link to="/blogs">My Blogs</Link>
    </li>,
    <li key="2">
      <a href={'/auth/logout'}>Logout</a>
    </li>,
  ];
}

export default RightLinks;
