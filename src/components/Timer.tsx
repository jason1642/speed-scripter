import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

const Container = styled.span`
  
`;

interface ITimerProps {
    seconds: number;
}


// WPM? 
const useTimer: React.FunctionComponent<ITimerProps> = ({seconds}) => {
  
  const [timeLeft, setTimeLeft ] = useState(seconds)
  const intervalRef:any = useRef()


  useEffect(()=>{
    intervalRef.current = setInterval(()=>{
        setTimeLeft((t:number)=>t - 1)

    }, 1000)

    return ()=> clearInterval(intervalRef.current)

  },[])
  
 // Add a listener to `timeLeft`
 useEffect(() => {
    console.log(~~((timeLeft % 3600) / 60).toFixed(5))

    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

    return (`${~~((timeLeft % 3600) / 60).toFixed(2)}`);
};

export default useTimer;
