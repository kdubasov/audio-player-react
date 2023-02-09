import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Audio from "./pages/Audio/Audio.jsx";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/audio"} element={<Audio />} />
            </Routes>
        </div>
    );
};

export default Router;
