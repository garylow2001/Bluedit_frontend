import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Threads from './pages/ThreadView';
import Posts from './pages/PostView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/threads" element={<Threads/>} />
          <Route path="/posts" element={<Posts/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
