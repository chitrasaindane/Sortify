// # Main Component # 

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // # Importing App Component
import './index.css'  // # Importing Index CSS
import * as ServiceWorker from './Components/Common/ServiceWorker.js';
// # Importing Service Worker
import 'bootstrap/dist/css/bootstrap.css'  // # Importing Bootstrap CSS

// # Creating Root Element
const root = createRoot(document.getElementById('root'))

// # Rendering App Component
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// # Service Worker
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister(); // # Service Worker Unregister