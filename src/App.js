import React, { createContext, useEffect } from 'react';
import LoginManager from './Manager/LoginManager';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { Router } from 'react-router-dom';
import Meetings from './Manager/Meetings';
import Services from './general/Services';
import Home from './Home';


export const KindOfUser = createContext();
export default function App() {
    const initialIsAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;
    const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
    const kindOfUser = { isAdmin, setIsAdmin };
    useEffect(() => {
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }, [isAdmin]);

    return (
        <div className='App'>
            <KindOfUser.Provider value={kindOfUser}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} >
                            <Route path='/meeting' element={<Meetings />} />
                            <Route path="/service" element={<Services />} />
                        </Route>
                        <Route path='/admin' element={<LoginManager />} />
                    </Routes>
                    <Outlet />
                </BrowserRouter>
            </KindOfUser.Provider>
        </div>
    );
}