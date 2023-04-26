import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useGetHappyStudentsQuery} from "../../store/bookCoachApi";
import {useEffect, useState} from "react";
import {HappyStudent} from "../../interfaces";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function CarouselTextAndPhoto() {

    const {data:happyStudentsDataFetch} = useGetHappyStudentsQuery("");
    const [happyStudents, setHappyStudents] = useState<HappyStudent[]>();

    useEffect(()=>{
        setHappyStudents(happyStudentsDataFetch)
    },[happyStudentsDataFetch])


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let maxSteps = 0

    if(happyStudents){
        maxSteps = happyStudents?.length;
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box  sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                variant="elevation"
                elevation={24}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: '#A63D40',
                    color:"#E9B872",
                }}
            >
                {happyStudents ? <Typography>{happyStudents[activeStep].name} - {happyStudents[activeStep]?.description}</Typography>: ""}

            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {happyStudents ? happyStudents?.map((step, index) => (
                    <div key={step.id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imageUrl}
                                alt={step.description}
                                title={"HEJ"}
                            />
                        ) : null}
                    </div>
                )): <></>}

            </AutoPlaySwipeableViews>

            <MobileStepper
                style={{backgroundColor:"#A63D40"}}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        color="warning"
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button color="warning" size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default CarouselTextAndPhoto;