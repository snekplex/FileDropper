import React from 'react';

import AppHeader from './components/AppHeader';
import AppContainer from './components/AppContainer';

import './scss/App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <AppContainer/>
    </div>
  );
}

export default App;
