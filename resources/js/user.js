import React from 'react'
import ReactDOM from 'react-dom'
import UserPage from './pages/UserPage'
// to avoid  error : regeneratorRuntime from "regenerator-runtime"
// when using async, await 
import regeneratorRuntime from "regenerator-runtime";

ReactDOM.render(<UserPage />,
    document.getElementById('app')
);
