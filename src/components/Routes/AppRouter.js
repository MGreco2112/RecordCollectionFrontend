import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "../Auth/Login";
import Signup from "../Auth/Signup"
import Home from "../Home/Home";
import Navbar from '../navbar/Navbar';
import Records from "../Records/Records";
import DisplayRecord from "../Records/DisplayRecord";

const AppRouter = (props) => {
    return (
        // when NavBar is finished elements inside will go into Navbar
        <div style={{width: "100%", flexDirection: "column"}}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Signup/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route path="/records/:recId" element={<DisplayRecord/>}/>
            </Routes>
        </div>
    )
}


export default AppRouter;