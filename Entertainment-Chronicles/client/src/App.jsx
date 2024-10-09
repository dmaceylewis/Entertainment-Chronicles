import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/nav/Header';
import { ApplicationViews } from "./components/auth/ApplicationViews";
import { Authorize } from './components/auth/Authorize';
import { useEffect } from 'react';
import { Login } from './components/auth/Login';

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("User")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              {/* <Route path="/register" element={<Register />} /> */}

              <Route path="*" element={
                  isLoggedIn ? <ApplicationViews /> 
                  : 
                  <Authorize setIsLoggedIn={setIsLoggedIn} />
              } />
          </Routes>
      </>
    );
}
