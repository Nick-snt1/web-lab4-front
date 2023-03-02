import React from "react";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import { changeIsLogged } from "../../api/authSlice";
import { clearStore }     from "../../api/apiSlice";


export const Navbar = (props) => {  
    const dispatch = useDispatch();

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(clearStore());
        dispatch(changeIsLogged(false));
    }

    const link = <Link onClick={handleLogOut} to="/">Logout</Link>
    
    return (
        <nav>
            <section>
                <h1 id="navHeader">
                    Vladimirov Nikita #512920
                </h1>
                <div className="navContent">
                    <div className="navLinks">
                        {props.isLoggedIn ? link : null}
                    </div>
                </div>
            </section>
        </nav>
    );
};