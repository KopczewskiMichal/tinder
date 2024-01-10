import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from './components/Login/LoginPage';
import Register from './components/Login/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage/>}
          ></Route>
          <Route
            path='/Register'
            element={<Register />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


