import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Signup from "../Auth/Signup"
import Home from "../Home/Home";
import Navbar from '../navbar/Navbar';
import Records from "../Records/Records";
import Artists from "../Artist/Artists";
import DisplayRecord from "../Records/DisplayRecord";
import DisplayArtist from "../Artist/DisplayArtist";
import NavCollector from "../Collector/NavCollector";
import DisplayCollector from "../Collector/DisplayCollector";
import Search from "../Search/Search";
import NewRecord from "../Posting/NewRecord";
import NewArtist from "../Posting/NewArtist";
import EditRecord from "../Records/EditRecord";
import EditArtist from "../Artist/EditArtist";
import EditCollector from "../Collector/EditCollector";
import DeleteRecord from "../Records/DeleteRecord";
import AdminRegister from "../Auth/AdminRegister";
import Test from "../discogsAPI/test";

const AppRouter = (props) => {
    return (
        // when NavBar is finished elements inside will go into Navbar
        <div style={{width: "100%", flexDirection: "column"}}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="logout" element={<Logout/>}/>
                <Route path="/register" element={<Signup/>}/>
                <Route path="/admin/create_access_account" element={<AdminRegister/>}/>
                <Route path="/newRecord" element={<NewRecord/>}/>
                <Route path="newArtist/:recordId" element={<NewArtist/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route path="/records/:nameFormatted" element={<DisplayRecord/>}/>
                <Route path="/records/editRecord/:editRecord" element={<EditRecord/>}/>
                <Route path="/records/delete/:recId" element={<DeleteRecord/>}/>
                <Route path="/artists" element={<Artists/>}/>
                <Route path="/artists/:artistNameFormatted" element={<DisplayArtist/>}/>
                <Route path="/artists/editArtist/:editArtist" element={<EditArtist/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/collector" element={<NavCollector/>}/>
                <Route path="/collector/:username" element={<DisplayCollector/>}/>
                <Route path="/collector/edit/" element={<EditCollector/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </div>
    )
}


export default AppRouter;