import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from "./Router.jsx";
import {BrowserRouter} from "react-router-dom";

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.css";
import {Provider} from "react-redux";
import {reduxStore} from "./redux-state/reduxStore.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={reduxStore}>
        <BrowserRouter basename='/audio-player-react'>
            <React.StrictMode>
                <Router />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)
