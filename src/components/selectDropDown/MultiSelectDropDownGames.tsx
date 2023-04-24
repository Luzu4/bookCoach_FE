import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {Game} from "../../interfaces";

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
    availableGames:Game[]
    setGames:any,
    userGames:string[]
}

const MultiSelectDropDownGames: React.FC<SelectProps> = ({availableGames,setGames, userGames})=> {
    const [game, setGame] = React.useState<string[]>(userGames);

    const handleChange = (event: SelectChangeEvent<typeof game>) => {
        const {
            target: { value},
        } = event;
        setGame(
            typeof value === 'string' ? value.split(',') : value,

        );
        setGames(typeof value === 'string' ? value.split(',') : value,)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Games</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={game}
                    onChange={handleChange}
                    input={<OutlinedInput label="Games" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {availableGames.map((singleGame) => (
                        <MenuItem key={singleGame.id} value={singleGame.name}>

                            <Checkbox checked={game.indexOf(singleGame.name) > -1} />
                            <ListItemText primary={singleGame.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultiSelectDropDownGames;