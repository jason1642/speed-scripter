'use client'
import * as React from 'react';
import { ErrorTypes } from './types';

interface IUserInputProps {
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>any;
    value:string;
    errorState: ErrorTypes;
}




const UserInput: React.FunctionComponent<IUserInputProps> = ({onChange, value, errorState}) => {
  
  
  
    return (
    <input
        
        id=""
        value={value}
        className='w-full p-3 text-xl border-slate-100 border-2 rounded-lg'
        // label="outlined"
        // variant='outlined'
        placeholder='Start typing...'
        onChange={onChange}
    />
  );
};

export default UserInput;
