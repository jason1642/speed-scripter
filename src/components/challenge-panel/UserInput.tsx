import * as React from 'react';
import TextField from '@mui/material/TextField';
import { ErrorTypes } from './types';

interface IUserInputProps {
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>any;
    value:string;
    errorState: ErrorTypes;
}

const styles = {
    width: '100%'
}


const UserInput: React.FunctionComponent<IUserInputProps> = ({onChange, value, errorState}) => {
  
  
  
    return (
    <TextField
    sx={styles}
        id=""
        value={value}
        label="outlined"
        variant='outlined'
        placeholder='Start typing...'
        onChange={onChange}
    />
  );
};

export default UserInput;
