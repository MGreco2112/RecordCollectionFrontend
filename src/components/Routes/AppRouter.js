import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "../Auth/Login";
import Signup from "../Auth/Signup"
import Home from "../Home/Home";
import Navbar from '../navbar/Navbar';
import Records from "../Records/Records";
import Artists from "../Artist/Artists";
import DisplayRecord from "../Records/DisplayRecord";
import SearchRecords from "../Records/SearchRecords"
import DisplayArtist from "../Artist/DisplayArtist";
import SearchArtists from "../Artist/SearchArtists";
import DisplayCollector from "../Collector/DisplayCollector";
import Search from "../Search/Search";

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
                <Route path="/records/:nameFormatted" element={<DisplayRecord/>}/>
                <Route path="/records/record_search" element={<SearchRecords/>}/>
                <Route path="/artists" element={<Artists/>}/>
                <Route path="/artists/:artistNameFormatted" element={<DisplayArtist/>}/>
                <Route path="/artists/artist_search" element={<SearchArtists/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/collector" element={<DisplayCollector/>}/>
            </Routes>
        </div>
    )
}


export default AppRouter;