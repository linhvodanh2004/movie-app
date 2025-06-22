import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appwrite';
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