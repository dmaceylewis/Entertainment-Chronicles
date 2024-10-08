import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/nav/Header';
import ApplicationViews from "./components/auth/ApplicationViews";
import Authorize from './components/auth/Authorize';
import { useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("Users")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;
