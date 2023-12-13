import { useEffect,useState, FunctionComponent } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, WordElementMapTypes, ErrorTypes, WordsTypes} from './types'
import './letterHighlights.css'

const Container = styled.div`
  display:flex;
`;

const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, clearUserInput, userInput}) => {
    const wordList = stringGoal.split(' ')
    const [progressState, setProgressState] = useState<IProgressStateProps>({ wordsPerMinute: 0, currentWord: 0, currentWordLetterIndex: 0, charactersCorrect: 0, resultString: ''})
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: 'There is an error in your input', errorFirstIndex: undefined})
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
        if (userInput.trim() === wordList[progressState.currentWord] && userInput.endsWith(' ') && userInput.length === wordList[progressState.currentWord].length + 1){
            clearUserInput()
            setProgressState(prev=>({
                ...prev,
                resultString: prev.resultString + userInput,
                currentWordLetterIndex: 0,
                currentWord: prev.currentWord + 1,
            }))
        }
    }
    
    const compareFunction = async (challengeString: string, userInput:string) => {
        
        setProgressState(prev=>({...prev, currentWordLetterIndex: userInput.length }))
        
            setWordElementMap(prev=>{
                let prevCharsInStringCorrect = true
                prev[progressState.currentWord].elementArray.forEach((ele, ind) => {
                

                    let spanElement =  (color:string, letter:string)=>
                     <span unselectable="on" style={{
                        color: color !== 'red' ? color : 'black',
                         backgroundColor: color === 'red' ? '#ff8a8a' : 'none',
                         borderLeft: userInput.length
                        }} key={Math.random()}>{letter}</span>

                    if(userInput[ind] == prev[progressState.currentWord].content[ind] && prevCharsInStringCorrect && userInput.length >= ind){
                       prevCharsInStringCorrect = true
                        prev[progressState.currentWord].elementArray[ind] = spanElement('green', prev[progressState.currentWord].content[ind])
                    } else if ( userInput.length > ind && userInput[ind] !== prev[progressState.currentWord].content[ind] ){
                       prevCharsInStringCorrect = false
                        prev[progressState.currentWord].elementArray[ind] = spanElement('red', prev[progressState.currentWord].content[ind])
                    } else {
                        prev[progressState.currentWord].elementArray[ind] = spanElement('black', prev[progressState.currentWord].content[ind])
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
            console.log('input changed')
    },[userInput, stringGoal])

  return  (<Container>
          <div style={{fontSize: '2em'}}>

            {wordElementMap.map(item=> (<span
            style={{borderBottom: progressState.currentWord === item.id ? '1px solid black' : 'none'}}
             key={item.id} 
             >
                {[...item.elementArray]}
                </span>)
                )}

            </div> 
      <div style={{color: "red"}}>{error.hasError ? `Message: ${error.message}` : ''}</div>

  </Container>
  )
}

export default ChallengeDisplay;