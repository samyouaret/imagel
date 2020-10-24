import React from 'react'
import Home from './pages/Home'
import ImageList from './components/ImageList'

function App() {
    return (
        <div>
            <h1 className="text-center text-gray-700 text-3xl">Welcome</h1>
            <ImageList params={{ owner: 10 }}></ImageList>
        </div>
    )
}

export default App;