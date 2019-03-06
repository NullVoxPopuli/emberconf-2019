import React from 'react';
import { BrowserRouter as Router, NavLink as Link } from 'react-router-dom';

import RootRoute from './ui/routes/root';

export default function Application() {
  return (
    <Router>
      <>
        <div className='tabs'>
          <nav className='tabs-nav'>
            <Link exact to='/'>
              Home
            </Link>
            <Link to='/component-demo'>
              Component Demo
            </Link>
          </nav>
        </div>

        <hr />

        <div className='container'>
          <RootRoute />
        </div>
      </>
    </Router>
  );
}
