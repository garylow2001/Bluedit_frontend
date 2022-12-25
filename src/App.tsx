import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import Threads from './pages/ThreadView';
import Posts from './pages/PostView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppState } from './AppState';

const App = (props:any) => {
  return (
    <AppState>
      <main className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth/>} />
              <Route path="/threads" element={<Threads/>} />
              <Route path="/post/:id" element={<Posts/>} />
            </Routes>
          </BrowserRouter>
      </main>
    </AppState>
  );
}

export default App;
