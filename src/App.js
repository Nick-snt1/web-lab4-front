import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { MainPage } from './components/main/MainPage';
import { RegisterPage } from './components/auth/RegisterPage'
import './App.css';

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<MainPage />}/>
                    <Route path='/reg'  element={<RegisterPage />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
