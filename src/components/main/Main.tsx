import React from 'react';
import "./Main.css";
import Home from "../homeSections/Home";
import CarouselSection from "../homeSections/CarouselSection";
import StaffSection from "../homeSections/StaffSection";

const Main = () => {
    return (
        <div className="main">
            <Home/>
            <CarouselSection/>
            <StaffSection/>
        </div>
    );
};

export default Main;
