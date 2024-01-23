'use client'
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react'

interface IProgressBarProps {
    progressPercentage: number;
}

const ProgressBar: React.FunctionComponent<IProgressBarProps> = ({progressPercentage}) => {
    React.useEffect(()=>{
        console.log(progressPercentage)
    },[progressPercentage])
  return (
    <div className='py-4'>
        <LinearProgress 
           variant='determinate' 
           value={Math.floor(progressPercentage * 100)}
        />
    </div>
  );
};

export default ProgressBar;
