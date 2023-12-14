'use client'
import * as React from 'react';
import ChallengeDisplay from '../../components/challenge-panel/ChallengeDisplay';
import UserInput from '@/components/challenge-panel/UserInput';
import { ErrorTypes } from '@/components/challenge-panel/types';
import ErrorMessage from '@/components/challenge-panel/ErrorMessage'
import styled from 'styled-components';

interface IAppProps {

}
const Container = styled.div`
   display:flex;
   flex-direction: column;
  padding: 1rem;
  border: 1px solid black;
  max-width: 1280px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

// type challengeTypes = Array< {
//     id: number;
//     character: string;
//     element: React.ReactElement;
    

// }>

const practiceString: string = 'This is the practice string from this challenge. @-#$ Your input should be identical to this!'

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
    <Container>

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

    </Container>
  );
};

export default Practice;
