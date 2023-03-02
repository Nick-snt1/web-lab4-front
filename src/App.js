import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { MainPage } from './components/main/MainPage';
import { SignInPage } from './components/auth/SignInPage'
import { RegisterPage } from './components/auth/RegisterPage'
import './App.css';



//<MainContainer/>
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
