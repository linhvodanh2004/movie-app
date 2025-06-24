// import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App