import React from 'react';
import {FormHelperText} from "@mui/material";

type props = {
    message:string;
    isError:boolean
}
const FormHelperError:React.FC<props> = ({message, isError}) => {
    return (
        <div>
            {isError && <FormHelperText style={{color:"red"}} id="component-error-text"> {message}</FormHelperText>}
        </div>
    );
};

export default FormHelperError;
