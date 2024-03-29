'use client'
import { useEffect,useState, FunctionComponent, Fragment } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, WordElementMapTypes, ErrorTypes, WordsTypes} from './types'
import useTimer from '../Timer'
import './letterHighlights.css'
import ProgressBar from "./ProgressBar";

const Container = styled.p`
/*  */
  /* padding: 1rem; */
    /* background-color: grey; */
  /* max-width: 1280px; */
  /* justify-content: center;
  align-items: center;
  margin: 0 auto; 
  font-size: 2em; */
`;


 
const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, clearUserInput, userInput, handleChangeErrorState}) => {
    const wordList = stringGoal.split(' ')
    const [progressState, setProgressState] = useState<IProgressStateProps>({ wordsPerMinute: 0, currentWord: 0, currentWordLetterIndex: 0, charactersCorrect: 0, resultString: ''})
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})
    const [timerState, setTimerState] = useState<ITimerProps>({totalSeconds: stringGoal.length * 8, status: 'stop', timeElapsed: 0, })
    const timeLeft = useTimer({seconds: 120, setTimeElapsed: (elapsedTime: number)=>{setTimerState(prev=>({...prev, timeElapsed: elapsedTime }))}})

    const [wordElementMap, setWordElementMap] = useState<WordElementMapTypes>( 
        wordList.map((e, i)=>
            ({ id:i,
                key:i,
                content: e, 
                elementArray: [
                    ...e.split('').map((item, index) => <span unselectable="on"key={item + index.toString()}>{item}</span>), 
                    (i !== wordList.length - 1 ? <span key={`${e}${e.length * i + 55}`}> </span> : <Fragment key={`${e}${e.length * i + 55}`}></Fragment>)
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
                console.log([...prev])
                return ([ ...prev ])
            })
     
    if(challengeString === progressState.resultString){
                alert('You have completed the race in # seconds')
                return
            }}

    useEffect(()=>{
            compareFunction(stringGoal, userInput)
            userInput && handleNextWordMove()
            // console.log('WPM:', progressState.wordsPerMinute)
            // console.log(Math.floor(progressState.resultString.length / stringGoal.length))
            console.log(progressState.resultString.length)
    },[userInput, stringGoal])


    useEffect(()=>{
        handleChangeErrorState(error)
        console.log('error in string, from useeffect')
    },[error])
  return  (<Container
            className=" p-4 items-center text-3xl justify-center"
  >
          <div >

        <div className="flex flex-row justify-around width-full">
            <p className="inline-block"> {timeLeft}</p>
            <p className='inline-block self-end'>WPM: {Math.floor(progressState.wordsPerMinute)}</p>

        </div>


                                <ProgressBar progressPercentage={progressState.resultString.length / stringGoal.length}/>
          </div>

          

        <div className="mt-4">
                 {
            wordElementMap.map(item=> (<span
            style={{borderBottom: progressState.currentWord === item.id ? '1px solid black' : 'none'}}
             key={item.id} 
             >
                {[...item.elementArray]}
                </span>)
                )
                }
        </div>
       

           
               


  </Container>
  )
}

export default ChallengeDisplay;