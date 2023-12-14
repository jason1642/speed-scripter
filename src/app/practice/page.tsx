'use client'
import * as React from 'react';
import ChallengeDisplay from '../../components/challenge-panel/ChallengeDisplay';
import UserInput from '@/components/challenge-panel/UserInput';

interface IAppProps {

}

// type challengeTypes = Array< {
//     id: number;
//     character: string;
//     element: React.ReactElement;
    

// }>

const practiceString: string = 'This is the practice string from this challenge. @-#$ Your input should be identical to this!'

const Practice: React.FunctionComponent<IAppProps> = () => {


    const [userInput, setUserInput] = React.useState<string>('')
    const clearUserInput = ()=> {
        setUserInput('')
    }
  return(
    <p>

    <ChallengeDisplay clearUserInput={clearUserInput} stringGoal={practiceString} userInput={userInput}/>
        
        <input
        style={{width: '900px'}}
         onChange={(e)=>{setUserInput(e.target.value)}} 
         value={userInput}
         placeholder='Start typing...'
          />

          <UserInput />

    </p>
  );
};

export default Practice;
