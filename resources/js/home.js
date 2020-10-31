import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './pages/HomePage'
// to avoid  error : regeneratorRuntime from "regenerator-runtime"
import regeneratorRuntime from "regenerator-runtime";

ReactDOM.render(<HomePage />,
    document.getElementById('app')
);
