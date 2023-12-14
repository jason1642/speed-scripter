import * as React from 'react';
import TextField from '@mui/material/TextField';

interface IUserInputProps {
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>any;
    value:string;
}

const UserInput: React.FunctionComponent<IUserInputProps> = ({onChange, value}) => {
  
  
  
    return (
    <TextField
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
