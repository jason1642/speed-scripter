'use client'
import * as React from 'react';
import ChallengeDisplay from '../../components/challenge-panel/ChallengeDisplay';
import UserInput from '@/components/challenge-panel/UserInput';
import { ErrorTypes } from '@/components/challenge-panel/types';
import ErrorMessage from '@/components/challenge-panel/ErrorMessage'

interface IAppProps {

}


const practiceString: string = 'This is the practice string for this challenge. Your input should be identical to this.'

const Practice: React.FunctionComponent<IAppProps> = () => {


    const [userInput, setUserInput] = React.useState<string>('')
    const [errorState, setErrorState] = React.useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})

    
    const clearUserInput = ()=> {
        setUserInput('')
    }
    const handleChangeErrorState = (err: ErrorTypes)=>{
        setErrorState(err)
    }

  return(
    <div 
    style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
      className='flex-1 flex-col p-4 border max-w-[950px] my-4 mx-auto align-center justify-center'>

    <ChallengeDisplay
     handleChangeErrorState={handleChangeErrorState}
      clearUserInput={clearUserInput}
       stringGoal={practiceString} 
       userInput={userInput}
       />
    
        <ErrorMessage errorState={errorState} />
          <UserInput
          errorState={errorState}
                   onChange={(e)=>{setUserInput(e.target.value)}} 
            value={userInput}
           />

    </div>
  );
};

export default Practice;