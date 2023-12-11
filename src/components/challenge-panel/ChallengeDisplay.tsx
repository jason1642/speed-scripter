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

    // const [timer, setTimer] = useState<ITimerProps>({timeElapsed: 0, state: 'paused'})
    const [wordElementMap, setWordElementMap] = useState<WordElementMapTypes>( 
        wordList.map((e, i)=>
            ({
                id:i,
                content: e, 
                elementArray: [...e.split('').map((item, index) =>
                                    <span 
                                    unselectable="on"
                                    style={{
                                        // borderBottom: progressState.currentWord === i ? '1px solid black' : 'none'
                                    }}
                                    // className={`word${i}character${index} ${progressState.currentWord === i && userInput[index] === e ? 'correct-input' : userInput.length < index ? 'nuetral-input' : 'incorrect-input'}`}
                                    key={item + index.toString()}
                                    >
                                        {item}
                                    </span>), 
                                    (i !== wordList.length - 1 ? <span key={`${e}${e.length * i + 55}`}> </span> : <></>)
                                   
                                ]
            
                }))
            )

    const wordTracker = ()=>{

    }


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
        // console.log('last letter ' + userInput[userInput.length - 1] ,  wordList[progressState.currentWord][userInput.length - 1])
        // console.log(wordList[progressState.currentWord][userInput.length - 1])
        if(userInput[userInput.length - 1] === wordList[progressState.currentWord][userInput.length - 1]){
            // console.log('That is the correct letter!!')
            setProgressState(prev=>({...prev, currentWordLetterIndex: prev.currentWordLetterIndex + 1}))

            setWordElementMap(prev=>{
                let tempArr = prev
                // console.log(prev[progressState.currentWord].elementArray)
                tempArr[progressState.currentWord].elementArray[progressState.currentWordLetterIndex] =
                    (<span unselectable="on" style={{color: 'green'}} className='.correct-input' key={Math.random()}>
                        {prev[progressState.currentWord].content[progressState.currentWordLetterIndex]}
                        </span>)
                return ([
                    ...prev
                ])
            })

        }
     
    if(challengeString === progressState.resultString){
                alert('You have completed the race in # seconds')
                return
            }
        console.log('User Input: ' + userInput)
    }

  
    

    useEffect(()=>{
        // if(userInput){
            userInput && compareFunction(stringGoal, userInput)
            userInput && handleNextWordMove()
        // console.log(userInput)
        // console.log('This is the current word index: ' +progressState.currentWord)
        // console.log('running use effect')
        // }

    },[userInput, stringGoal])


    useEffect(()=>{
        console.log(wordElementMap)
    },[wordElementMap])

  return  (<Container>


          <div style={{fontSize: '2em'}}>{
           
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