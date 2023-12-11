import { useEffect, useMemo, useState, FunctionComponent } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, WordElementMapTypes, ErrorTypes, WordsTypes} from './types'
import './letterHighlights.css'

const Container = styled.div`
  display:flex;
`;

const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, clearUserInput, userInput}) => {
    const wordList = stringGoal.split(' ')
    const [progressState, setProgressState] = useState<IProgressStateProps>({ wordsPerMinute: 0, currentWord: 0, charactersCorrect: 0, resultString: ''})
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})

    // const [timer, setTimer] = useState<ITimerProps>({timeElapsed: 0, state: 'paused'})
    const [wordElementMap, setWordElementMap] = useState<WordElementMapTypes>( 
        wordList.map((e, i)=>
            ({
                id:i,
                content: e, 
                element: <><span unselectable="on"
                className={`word word${i}`}
                >
                {e.split('').map((item, index)=>
                                    <span 
                                    unselectable="on"
                                    // className={`word${i}character${index} ${progressState.currentWord === i && userInput[index] === e ? 'correct-input' : userInput.length < index ? 'nuetral-input' : 'incorrect-input'}`}
                                    key={(item + index.toString())}
                                    >
                                        {item}
                                    </span>)}
                </span><span> </span> </>
                }))
            )
    


    const wordTracker = ()=>{

    }


    const handleNextWordMove = ()=>{ 
        if (userInput === wordList[progressState.currentWord] + ' '){
            clearUserInput()
            setProgressState(prev=>({
                ...prev,
                resultString: prev.resultString + userInput,
                currentWord: prev.currentWord + 1,
            }))
            console.log('You successfully typed the entire word withe a space')
        }


    }
    

    const compareFunction = (challengeString: string, userInput:string) => {
        console.log('last letter ' + userInput[userInput.length - 1] ,  wordList[progressState.currentWord][userInput.length - 1])
        console.log(wordList[progressState.currentWord][userInput.length - 1])
        if(userInput[userInput.length - 1] === wordList[progressState.currentWord][userInput.length - 1]){
            console.log('That is the correct letter!!')

        }
     
        if(userInput === wordList[progressState.currentWord]){
            
            setProgressState(prev=>({...prev, currentWord: prev.currentWord + 1, resultString: prev.resultString + wordList[progressState.currentWord]}))
  
            setError(prev=>({...prev, message: '', hasError: false}))
        } else if(error.hasError === true) {
            // Highlight red 
            return 
        }else if (userInput.length === 0){
            // setError({hasError: true, message: 'There is an error', errorFirstIndex: userInput.length})
        } else {
            console.log('nothing')
        }

    if(challengeString === progressState.resultString){
                alert('You have completed the race in # seconds')
                return
            }
        console.log('User Input: ' + userInput)
    }


    useEffect(()=>{
        compareFunction(stringGoal, userInput)
        handleNextWordMove()
        console.log('This is the current word index: ' +progressState.currentWord)
        // console.log('running use effect')
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