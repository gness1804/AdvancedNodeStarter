import * as React from 'react';
import { Link } from 'react-router-dom';

const RightLinks = () => {
  return [
    <li key="3" style={{ margin: '0 10px' }}>
      <Link to="/blogs" className="my-blogs-link">My Blogs</Link>
    </li>,
    <li key="2">
      <a href={'/auth/logout'} className="logout-button">Logout</a>
    </li>,
  ];
}

export default RightLinks;
