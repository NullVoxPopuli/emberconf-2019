import React from 'react';
import { BrowserRouter as Router, NavLink as Link } from 'react-router-dom';

import RootRoute from './ui/routes/root';

export default function Application() {
  return (
    <Router>
      <>
        <div className='container'>
          <RootRoute />
        </div>
      </>
    </Router>
  );
}
