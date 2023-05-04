import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
    Grid,
    Stack,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import {Dayjs} from "dayjs";
import MultiSelectDropDown from "../selectDropDown/MultiSelectDropDown";
import {
    useAddNewLessonsMutation,
    useGetGamesByUserQuery,
    useGetLessonsByUserIdAndDateQuery,
} from "../../store/bookCoachApi";
import {Game, Lesson} from "../../interfaces";
import SelectDropDown from "../selectDropDown/SelectDropDown";
import {SelectChangeEvent} from "@mui/material/Select";
import FormHelperError from "../FormHelperError";


const boxContainerStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type props = {
    refetchTable: any;
}

const LoginModal: React.FC<props> = ({refetchTable}) => {
    const allHours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [lessonHours, setLessonHours] = useState<string[]>([])
    const [availableHours, setAvailableHours] = useState<string[]>([])

    const [lessonAlreadyAdded, setLessonAlreadyAdded] = useState<Lesson[] | undefined>();

    const [dateToAddLesson, setDateToAddLesson] = useState<Dayjs | null>(null)

    const [games, setGames] = useState<Game[]>([]);
    const {data: userGamesFetch} = useGetGamesByUserQuery("");
    const [gameId, setGameId] = useState<string>("");

    const handleChangeGameName = (event: SelectChangeEvent) => {
        setGameId(event.target.value);
    };

    useEffect(() => {
        if (userGamesFetch) {
            setGames(userGamesFetch)
        }
    }, [userGamesFetch])

    const {
        data: lessonAlreadyAddedFetch,
        refetch
    } = useGetLessonsByUserIdAndDateQuery(dateToAddLesson?.format("YYYY-MM-DD") + "", {skip: !dateToAddLesson})
    const [addNewLessons] = useAddNewLessonsMutation();

    const [selectGameError, setSelectGameError] = useState(false)
    const [selectDateError, setSelectDateError] = useState(false)
    const [selectHoursError, setSelectHoursError] = useState(false)

    const handleAddButtonClick = () => {
        if (lessonHours.length > 0 && dateToAddLesson && gameId) {
            let lessonsDataToSave = {
                "date": dateToAddLesson.format("YYYY-MM-DD"),
                "gameId": gameId,
                "hours": lessonHours.toString()
            }
            addNewLessons(lessonsDataToSave).unwrap()
                .then(() => {
                })
            refetchTable();
            refetch();
            setSelectGameError(false)
            setSelectDateError(false)
            setSelectHoursError(false)
            setDateToAddLesson(null)

        } else if (!gameId) {
            setSelectGameError(true)
        } else if (!dateToAddLesson) {
            setSelectDateError(true)
        } else if (lessonHours.length < 1) {
            setSelectHoursError(true)
        }
    }

    const handleDateChange = (newDateToAddLesson: any) => {
        setDateToAddLesson(newDateToAddLesson);
        setAvailableHours(allHours);
    }


    useEffect(() => {
        if (lessonAlreadyAddedFetch) {
            const hours = lessonAlreadyAddedFetch.map(lesson => lesson.time.substring(0, 5));

            // @ts-ignore
            setLessonAlreadyAdded(hours)
            const filteredHours = allHours.filter(hour => !hours.includes(hour))
            setAvailableHours(filteredHours)
        } else {
            setLessonAlreadyAdded([])
            setAvailableHours(allHours)
        }
    }, [lessonAlreadyAddedFetch, dateToAddLesson])


    useEffect(() => {
        setLessonAlreadyAdded([])
        setLessonAlreadyAdded(lessonAlreadyAddedFetch);
    }, [lessonAlreadyAddedFetch, lessonAlreadyAdded])

    return (
        <div>
            <Button style={{marginTop: "30px"}} color="error" variant="outlined" onClick={handleOpen}>Add New
                Lesson</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={boxContainerStyle}>
                    <Grid container spacing={2}
                          justifyContent="center"
                          alignItems="center">
                        <Stack direction="column" spacing={2}>
                            <SelectDropDown id={gameId} handleChange={handleChangeGameName} values={games}/>
                            <FormHelperError message={"First select Game"} isError={selectGameError}/>
                            <DatePicker disablePast label="Lesson Date" value={dateToAddLesson}
                                        onChange={(newDateToAddLesson) => handleDateChange(newDateToAddLesson)}/>
                            <FormHelperError message={"First Select date!"} isError={selectDateError}/>
                            {dateToAddLesson ? <MultiSelectDropDown availableHours={availableHours}
                                                                    setLessonHours={setLessonHours}/> : ""}
                            <FormHelperError message={'Select hours of lessons'} isError={selectHoursError}/>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={handleClose} variant="contained">Cancel</Button>
                            <Button onClick={handleAddButtonClick} variant="contained">Add</Button>
                        </Stack>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal