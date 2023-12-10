import * as React from 'react';

interface IChallengeDisplayProps {
    stringGoal: string;
    userInput: string;
}
type challengeTypes = Array< {
    id: number;
    character: string;
    element: React.ReactElement;
    

}>

type ErrorTypes = {
    hasError: boolean;
    message?: string;
    errorFirstIndex?: number;
}

const ChallengeDisplay: React.FunctionComponent<IChallengeDisplayProps> = ({stringGoal, userInput}) => {
    // This can be an array of spans where each span highlights green when correct and red when there is an error
    // The id=index will determine what to highlight if there is an error
    const [challenge, setChallenge] = React.useState<challengeTypes>(stringGoal.split('').map((e, i)=>{ return { id:i, character: e, element:<span>{e}</span> }}))
    const [error,setError ] = React.useState<ErrorTypes>({hasError: false, message: undefined, errorFirstIndex: undefined})
    const [errorMessage, setErrorMessage] = React.useState<string>('')




    const compareFunction = (challengeString: string, userInput:string) => {
        // Do not change userinput here
        //compare both strings, userinput should always be shorter than goal the string.
        // Whatever the size of the userinput is, check is all characters leading up to that last index of the userinput matches the goal string at the same index
        if(challengeString === userInput){
            alert('You have completed the race in # seconds')
            return
        }
        
        // let currentIndex = userInput.length
        console.log(challenge.slice(0, userInput.length))

        if(userInput === stringGoal.slice(0, userInput.length)){
            console.log('same as challenge')
            setChallenge(prev=>{
                if(userInput.length !== 0) {
                    prev[userInput.length ].element = <span style={{backgroundColor:"#12421074", textDecoration:'underline', color: 'white'}}>{challenge[userInput.length].character}</span>

                    // prev[userInput.length].element = <span style={{backgroundColor:"#124210", textDecoration:'underline', color: 'white'}}>{challenge[userInput.length].character}</span>

                }
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


    React.useEffect(()=>{
        compareFunction(stringGoal, userInput)
        console.log('running useeffect')
    },[userInput])

    // Display goal string with highlights depending on userinput progress
  return (<div>

        {/* On error, show where the error has occurred at first and highlight red. All other characters after error is wrong until it is fixed*/}
      <div style={{fontSize: '2em'}}>{challenge.map(item=>item.element)}</div>
      <div style={{color: "red"}}>{errorMessage ? `Message: ${errorMessage}` : ''}</div>
  </div>

  );
};

export default ChallengeDisplay;
