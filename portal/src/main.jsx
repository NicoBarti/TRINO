import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Only configure Amplify if the outputs object is not empty (e.g. not in raw local mock mode)
if (Object.keys(outputs).length > 0) {
  Amplify.configure(outputs);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
