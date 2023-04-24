import React from 'react';
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import {FormControl} from "@mui/material";


type SelectProps = {
    id: string,
    handleChange: (event: SelectChangeEvent) => void,
    roles: string[],
    initialValue:string,

}

const SelectDropDownEnum: React.FC<SelectProps> = ({id, handleChange, roles,initialValue}) => {
    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id}
                onChange={handleChange}
                autoWidth
                label="gameName"
                input={<OutlinedInput label="Role" />}
                sx={{
                    background: "white"
                }}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
            </Select>
            </FormControl>
        </>
    );
};

export default SelectDropDownEnum;
