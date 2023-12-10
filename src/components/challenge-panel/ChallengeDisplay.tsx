import { useEffect, useMemo, useState, FunctionComponent } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, WordElementMapTypes, ErrorTypes, WordsTypes} from './types'
import './letterHighlights.css'

const Container = styled.div`
  display:flex;
`;

const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, userInput}) => {
    const wordList = stringGoal.split(' ')
    const [progressState, setProgressState] = useState<IProgressStateProps>({ wordsPerMinute: 0, currentWord: 0, resultString: ''})
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})

    // const [timer, setTimer] = useState<ITimerProps>({timeElapsed: 0, state: 'paused'})
    const wordElementMap = useMemo<WordElementMapTypes>(()  =>
        wordList.map((e, i)=>
            ({
                id:i,
                content: e, 
                element:<span unselectable="on"
                className={`word word${i}`}
                >
                {e.split('').map((item, index)=>
                                    <span 
                                    unselectable="on"
                                    className={`word${i}character${index} ${userInput[index] === e && error.hasError === false ? 'correct-input' : userInput.length < index ? 'nuetral-input' : 'incorrect-input'}`}
                                    key={(item + index.toString())}
                                    >
                                        {item}
                                    </span>)}
                </span> })),
            []
            )
    
    // const [errorMessage, setErrorMessage] = useState<string>('')
    // Compare the user input to the current word
    const wordTracker = ()=>{

    }

    const handleNextWordMove = ()=>{ 
        if (userInput === wordList[progressState.currentWord] + ' '){
            setProgressState(prev=>({
                ...prev,
                resultString: prev.resultString + userInput,
                currentWord: prev.currentWord + 1,
            }))
            console.log('You successfully typed the entire word withe a space')
        }


    }
    
    const compareFunction = (challengeString: string, userInput:string) => {
      
     
        if(userInput === wordList[progressState.currentWord]){
   
            setProgressState(prev=>({...prev, resultString: prev.resultString + userInput}))
  
            setError(prev=>({...prev, hasError: false}))
        } else if(error.hasError === true) {
            // Highlight red 
            return 
        }else {
            setError({hasError: true, errorFirstIndex: userInput.length})
        }
    if(challengeString === wordList.join(' ') + userInput){
                alert('You have completed the race in # seconds')
                return
            }
        console.log('User Input: ' + userInput)
    }

    useEffect(()=>{
        compareFunction(stringGoal, userInput)
        handleNextWordMove()
        console.log('running use effect')
    },[userInput])

    // Display goal string with highlights depending on userinput progress
  return (<Container>

        {/* On error, show where the error has occurred at first and highlight red. All other characters after error is wrong until it is fixed*/}
      <div style={{fontSize: '2em'}}>{wordElementMap.map(item=>item.element)}</div>
      <div style={{color: "red"}}>{error.hasError ? `Message: ${error.message}` : ''}</div>
  </Container>

  );
};

export default ChallengeDisplay;