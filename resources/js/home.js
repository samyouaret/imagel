import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// to avoid  error : regeneratorRuntime from "regenerator-runtime"
import regeneratorRuntime from "regenerator-runtime";

ReactDOM.render(<App />,
    document.getElementById('app')
);
