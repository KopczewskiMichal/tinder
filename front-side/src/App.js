import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from './components/Login/LoginPage';
import Register from './components/Login/Register';
import MainPage from './components/mainPage/mainPage';
import EditProfilePage from './components/EditProfile/EditProfilePage';

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
          <Route
          path='/MainPage/:userID'
          element={<MainPage />}
          ></Route>
          <Route
          path='/edit-profile/:userID'
          element={<EditProfilePage />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


