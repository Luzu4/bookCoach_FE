import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


type SelectProps = {
    availableHours:string[]
    setLessonHours:any
}

const MultipleSelectCheckmarks: React.FC<SelectProps> = ({availableHours,setLessonHours})=> {
    const [singleHour, setSingleHour] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof singleHour>) => {
        const {
            target: { value },
        } = event;
        setSingleHour(
            typeof value === 'string' ? value.split(',') : value,

        );
        setLessonHours(typeof value === 'string' ? value.split(',') : value,)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Hours</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={singleHour}
                    onChange={handleChange}
                    input={<OutlinedInput label="Hours" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {availableHours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                            <Checkbox checked={singleHour.indexOf(hour) > -1} />
                            <ListItemText primary={hour} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelectCheckmarks;