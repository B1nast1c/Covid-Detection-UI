import { useState } from 'react';
import './App.css';
import React from 'react';
import Home from "./components/Home/Home";
import Uploading from "./components/Uploading/Uploading";
import UploadSuccess from "./components/UploadSuccess/UploadSuccess";
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar/Nabvar';

function App() {
    const [loading, setLoading] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <div className = "parent-container" > {
                loading === 0 ? ( <
                    Home setLoading = { setLoading }
                    setImgUrl = { setImgUrl }
                    />
                ) : null
            } { loading === 1 ? <Uploading /> : null } {
                loading === 2 ? <UploadSuccess imgUrl = { imgUrl }/> : null} </div >
            </>
        );
    }

    export default App;