import * as React from 'react';
import TextField from '@mui/material/TextField';

interface IUserInputProps {
}

const UserInput: React.FunctionComponent<IUserInputProps> = (props) => {
  
  
  
    return (
    <TextField
        id=""
        label="outlined"
        variant='outlined'
        placeholder='Start typing...'
    />
  );
};

export default UserInput;
