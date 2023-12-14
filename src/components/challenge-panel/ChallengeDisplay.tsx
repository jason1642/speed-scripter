'use client'
import { useEffect,useState, FunctionComponent } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, WordElementMapTypes, ErrorTypes, WordsTypes} from './types'
import useTimer from '../Timer'
import './letterHighlights.css'

const Container = styled.div`
  display:flex;
  padding: 1rem;
  border: 1px solid black;
  max-width: 1280px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ChallengeStringBox = styled.div`
  /* display:flex; */
    font-size: 2em;
`;

const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, clearUserInput, userInput}) => {
    const wordList = stringGoal.split(' ')
    const [progressState, setProgressState] = useState<IProgressStateProps>({ wordsPerMinute: 0, currentWord: 0, currentWordLetterIndex: 0, charactersCorrect: 0, resultString: ''})
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})
    const [timerState, setTimerState] = useState<ITimerProps>({totalSeconds: stringGoal.length * 8, status: 'stop', timeElapsed: 0, })
    const timeLeft = useTimer({seconds: 120, setTimeElapsed: (elapsedTime: number)=>{setTimerState(prev=>({...prev, timeElapsed: elapsedTime }))}})

    const [wordElementMap, setWordElementMap] = useState<WordElementMapTypes>( 
        wordList.map((e, i)=>
            ({ id:i,
                content: e, 
                elementArray: [
                    ...e.split('').map((item, index) => <span unselectable="on"key={item + index.toString()}>{item}</span>), 
                    (i !== wordList.length - 1 ? <span key={`${e}${e.length * i + 55}`}> </span> : <></>)
                    ]
                })))

    const handleNextWordMove = () =>{
        
        // Check if last word was correctly typed out. Then run something similar to this to update stats but remove the space at the last word 
        if (userInput.trim() === wordList[progressState.currentWord] && userInput.endsWith(' ') && userInput.length === wordList[progressState.currentWord].length + 1){
            clearUserInput()
            setProgressState(prev=>({
                ...prev,
                wordsPerMinute: ((prev.charactersCorrect + wordList[progressState.currentWord].length + 1) / 5) / (timerState.timeElapsed / 60),
                charactersCorrect: prev.charactersCorrect + wordList[progressState.currentWord].length + 1,
                resultString: prev.resultString + userInput,
                currentWordLetterIndex: 0,
                currentWord: prev.currentWord + 1,
            }))
            console.log((Math.round(progressState.charactersCorrect + wordList[progressState.currentWord].length + 1) / 5) / (timerState.timeElapsed / 60), timerState.timeElapsed)

        }
    }

    const compareFunction = async (challengeString: string, userInput:string) => {
         let spanElement =  (color:string, letter:string)=>
                     <span unselectable="on" style={{
                        color: color !== 'red' ? color : 'black',
                         backgroundColor: color === 'red' ? '#ff8a8a' : 'none',
                         borderLeft: userInput.length
                        }} key={Math.random()}>{letter}</span>

        setProgressState(prev=>({...prev, currentWordLetterIndex: userInput.length }))

            setWordElementMap(prev=>{
                let prevCharsInStringCorrect = true

                prev[progressState.currentWord].elementArray.forEach((ele, ind) => {
                    let currentLetter = prev[progressState.currentWord].content[ind]
                    if(userInput[ind] == prev[progressState.currentWord].content[ind] && prevCharsInStringCorrect && userInput.length >= ind){
                        prevCharsInStringCorrect = true
                        prev[progressState.currentWord].elementArray[ind] = spanElement('green', currentLetter)
                    } else if ( userInput.length > ind && userInput[ind] !== prev[progressState.currentWord].content[ind] ){
                        prevCharsInStringCorrect = false
                        prev[progressState.currentWord].elementArray[ind] = spanElement('red', currentLetter)
                    } else {
                        prev[progressState.currentWord].elementArray[ind] = spanElement('black', currentLetter)
                    }
                    
                })
                prev[progressState.currentWord].elementArray[prev[progressState.currentWord].elementArray.length] = 
                (<span unselectable="on"  key={Math.random()}> </span>) 
                return ([ ...prev ])
            })
     
    if(challengeString === progressState.resultString){
                alert('You have completed the race in # seconds')
                return
            }}

    useEffect(()=>{
            compareFunction(stringGoal, userInput)
            userInput && handleNextWordMove()
            console.log('WPM:', progressState.wordsPerMinute)
    },[userInput, stringGoal])

  return  (<Container>
          <ChallengeStringBox>

            {wordElementMap.map(item=> (<span
            style={{borderBottom: progressState.currentWord === item.id ? '1px solid black' : 'none'}}
             key={item.id} 
             >
                {[...item.elementArray]}
                </span>)
                )}

            </ChallengeStringBox> 
      <div style={{color: "red"}}>{error.hasError ? `Message: ${error.message}` : ''}</div>
                {timeLeft}
                

  </Container>
  )
}

export default ChallengeDisplay;