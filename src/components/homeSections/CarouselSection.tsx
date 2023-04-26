import React from 'react';
import {Grid} from "@mui/material";
import CarouselTextAndPhoto from "../carousel/CarouselTextAndPhoto";

const CarouselSection = () => {
    return (
        <div>
            <Grid

                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                item xs={12}
                style={{color:"#E9B872"}}>
                <h1>OUR HAPPY STUDENTS</h1>
            </Grid>

            <Grid

                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                item xs={12}>
                <CarouselTextAndPhoto/>
            </Grid>
        </div>
    );
};

export default CarouselSection;
