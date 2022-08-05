import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import Timer from './components/Timer';
import { store } from './__data__/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Timer />
      </div>
    </Provider>
  );
}

export default App;
