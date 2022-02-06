import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';

const AuthRoutes: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </HashRouter>
    );
}

export default AuthRoutes;