import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux-stuff";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
