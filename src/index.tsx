import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {render} from "react-dom";


const root =document.getElementById('root');
render(
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </LocalizationProvider>
    </Provider>
, root);
