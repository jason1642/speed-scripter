import { useEffect, useState, FunctionComponent } from "react";
import styled from 'styled-components';
import {IChallengeDisplayProps, IProgressStateProps, ITimerProps, challengeTypes, ErrorTypes} from './types'


const Container = styled.div`
  display:flex;
`;


 
const ChallengeDisplay: FunctionComponent<IChallengeDisplayProps> = ({stringGoal, userInput}) => {
    // This can be an array of spans where each span highlights green when correct and red when there is an error
    // The id=index will determine what to highlight if there is an error
    const [progressState, setProgressState] = useState<IProgressStateProps>({currentIndex: 0, wordsPerMinute: 0})
    // Count down timer
    const [words, setWords] = useState()
    const [timer, setTimer] = useState<ITimerProps>({timeElapsed: 0, state: 'paused'})
    const [challenge, setChallenge] = useState<challengeTypes>(stringGoal.split('').map((e, i)=>{ return { id:i, character: e, element:<span unselectable="on">{e}</span> }}))
    const [error,setError ] = useState<ErrorTypes>({hasError: false, message: undefined, errorFirstIndex: undefined})
    const [errorMessage, setErrorMessage] = useState<string>('')

    const compareFunction = (challengeString: string, userInput:string) => {
        // Do not change userinput here
        //compare both strings, userinput should always be shorter than goal the string.
        // Whatever the size of the userinput is, check is all characters leading up to that last index of the userinput matches the goal string at the same index
        if(challengeString === userInput){
            alert('You have completed the race in # seconds')
            return
        }
        setProgressState(prev=>({
            ...prev,
            currentIndex: userInput.length
        }))
        // let currentIndex = userInput.length
        // console.log(challenge.slice(0, userInput.length))

        if(userInput === stringGoal.slice(0, userInput.length)){
            console.log('same as challenge')
            console.log(challenge)
            setProgressState(prev=>({...prev, currentIndex: userInput.length}))
            setChallenge(prev=>{
                    prev[progressState.currentIndex].element = <span unselectable="on" style={{ textDecoration:'underline', borderLeft: '1px solid black', color: 'green'}}>{challenge[progressState.currentIndex].character}</span>
                    // prev[progressState.currentIndex + 1].element = <span unselectable="on" style={{  borderLeft: '1px solid black'}}>{challenge[progressState.currentIndex + 1].character}</span>

                return [...prev]
            })
            setErrorMessage('')
            setError(prev=>({...prev, hasError: false}))
        } else if(error.hasError === true) {
            // Highlight red 
            return 
        }else {
            setError({hasError: true, errorFirstIndex: userInput.length})
            setChallenge(prev=>([...prev, ]))
            setErrorMessage(`Error at index: ${userInput.length}`)
        }

        console.log('User Input: ' + userInput)
    }

    useEffect(()=>{
        compareFunction(stringGoal, userInput)
        console.log('running useeffect')
    },[userInput])

    // Display goal string with highlights depending on userinput progress
  return (<Container>

        {/* On error, show where the error has occurred at first and highlight red. All other characters after error is wrong until it is fixed*/}
      <div style={{fontSize: '2em'}}>{challenge.map(item=>item.element)}</div>
      <div style={{color: "red"}}>{errorMessage ? `Message: ${errorMessage}` : ''}</div>
  </Container>

  );
};

export default ChallengeDisplay;