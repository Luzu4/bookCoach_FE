import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type SelectProps = {
    register: {},
    id: string,
    handleChange: () => void,
    values: [{ id: number, nickName: string }]
}

const SelectDropDown: React.FC<SelectProps> = ({register, id, handleChange, values}) => {
    return (
        <Select
            {...register("coachId")}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
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
                <MenuItem key={value.id} value={value.id}>{value.nickName}</MenuItem>
            ))}
        </Select>
    );
};

export default SelectDropDown;
