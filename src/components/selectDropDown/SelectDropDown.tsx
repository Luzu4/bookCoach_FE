import React from 'react';
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {InputLabel} from "@mui/material";


type SelectProps = {
    id: string,
    handleChange: (event: SelectChangeEvent) => void,
    values: {
        id: number;
        nickName?: string;
        name?: string;
    }[],

}

const SelectDropDown: React.FC<SelectProps> = ({id, handleChange, values}) => {
    return (
        <>

        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id}
            onChange={handleChange}
            autoWidth
            label="gameName"
            sx={{
                background: "white"
            }}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {values.map((value) => (
                <MenuItem key={value.id} value={value.id}>{value.nickName || value.name}</MenuItem>
            ))}
        </Select>
        </>
    );
};

export default SelectDropDown;
