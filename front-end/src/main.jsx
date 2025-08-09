import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'



/**
 * @file main.jsx
 * @description The main entry point of the React application. This file is responsible for
 * mounting the root component into the DOM and wrapping the application
 * with necessary providers.
 */

/**
 * Renders the entire React application into the DOM.
 * * This is the first file to be executed. It uses `ReactDOM.createRoot` to create
 * a new React 18+ root in the HTML element with the ID 'root'.
 * * The application is wrapped in:
 * - `<React.StrictMode>`: A development tool that helps identify potential problems
 * in the application, such as unwanted side effects.
 * - `<AuthProvider>`: A provider that makes the authentication state and its functions
 * available to all components throughout the application.
 * - `<App />`: The main component of the application, which contains all the
 * routing and UI logic.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
