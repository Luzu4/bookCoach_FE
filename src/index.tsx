import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
        </LocalizationProvider>
    </Provider>
);
