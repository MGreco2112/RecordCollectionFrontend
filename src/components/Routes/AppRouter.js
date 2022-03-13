import React from "react";
import {Route, Routes} from 'react-router-dom';

const AppRouter = (props) => {
    return (
        // when NavBar is finished elements inside will go into Navbar
        <div>
            <Routes>
                <Route path="/" element={"Hello"}/>
            </Routes>
        </div>
    )
}


export default AppRouter;