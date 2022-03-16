import React from "react";
import {Route, Routes} from 'react-router-dom';
import Home from "../Home/Home";
import Navbar from '../navbar/Navbar';

const AppRouter = (props) => {
    return (
        // when NavBar is finished elements inside will go into Navbar
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    )
}


export default AppRouter;