import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from './pages/IndexPage'
// to avoid  error : regeneratorRuntime from "regenerator-runtime"
// when using async, await 
import regeneratorRuntime from "regenerator-runtime";

ReactDOM.render(<IndexPage />,
    document.getElementById('app')
);
