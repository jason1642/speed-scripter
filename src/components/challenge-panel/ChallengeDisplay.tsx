import { useEffect, useMemo, useState, FunctionComponent } from "react";
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
            ({
                id:i,
                content: e, 
                elementArray: [...e.split('').map((item, index) =>
                                    <span 
                                    unselectable="on"
                                    key={item + index.toString()}
                                    >{item}
                                    </span>), 
                                    (i !== wordList.length - 1 ? <span key={`${e}${e.length * i + 55}`}> </span> : <></>)
                                ]
                })))

    const handleNextWordMove = ()=>{ 
        console.log('userinput' + userInput + 'endofuserinput')
        if (userInput.trim() === wordList[progressState.currentWord] && userInput.endsWith(' ') && userInput.length === wordList[progressState.currentWord].length + 1){
            clearUserInput()
            setProgressState(prev=>({
                ...prev,
                resultString: prev.resultString + userInput,
                currentWordLetterIndex: 0,
                currentWord: prev.currentWord + 1,
            }))
            console.log('You successfully typed the entire word withe a space')
        }
    }
    

    const compareFunction = async (challengeString: string, userInput:string) => {
       
        setProgressState(prev=>({...prev, currentWordLetterIndex: userInput.length }))
        if(userInput[userInput.length - 1] === wordList[progressState.currentWord][0 | userInput.length - 1]){
            console.log('This input matches the goal word: ' +  userInput[userInput.length - 1])
            console.log(userInput.length)
            // setProgressState(prev=>({...prev, currentWordLetterIndex: userInput.length }))
            setWordElementMap(prev=>{

                prev[progressState.currentWord].elementArray.forEach((ele, ind) => {
                    if(userInput[ind] == prev[progressState.currentWord].content[ind]){
                        prev[progressState.currentWord].elementArray[ind] =
                    (<span unselectable="on" style={{color: 'green'}} className='.correct-input' key={Math.random()}>
                        {prev[progressState.currentWord].content[ind]}
                        </span>) 
                    }else {
                        prev[progressState.currentWord].elementArray[ind] =
                    (<span unselectable="on" className='.nuetral-input' key={Math.random()}>
                        {prev[progressState.currentWord].content[ind]}
                        </span>) 
                    }
                    
                })
               
                      
                    // prev[progressState.currentWord].elementArray[progressState.currentWordLetterIndex + 1] =
                    // (<span unselectable="on"  className='.nuetral-input' key={Math.random()}>
                    //     {prev[progressState.currentWord].content[progressState.currentWordLetterIndex + 1]}
                    //     </span>)
                return ([ ...prev ])
            })
        }
     
    if(challengeString === progressState.resultString){
                alert('You have completed the race in # seconds')
                return
            }
    }

    useEffect(()=>{
            userInput && compareFunction(stringGoal, userInput)
            userInput && handleNextWordMove()
    },[userInput, stringGoal])

  return  (<Container>


          <div style={{fontSize: '2em'}}>
            {
            wordElementMap.map(item=> (<span
            style={{borderBottom: progressState.currentWord === item.id ? '1px solid black' : 'none'}}
             key={item.id} 
             >
                {[...item.elementArray]}
                </span>)
                )
            }</div> 
    
      <div style={{color: "red"}}>{error.hasError ? `Message: ${error.message}` : ''}</div>

  </Container>
  )
}

export default ChallengeDisplay;