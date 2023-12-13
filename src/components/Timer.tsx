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

  const convertTimeToString: () => string = ()=> {
    const hoursTime = Math.floor(timeLeft / 3600)
    const minutesTime = Math.floor((timeLeft - (hoursTime * 3600) )/ 60) 
    const secondsTime = timeLeft - (hoursTime * 3600 ) - (minutesTime * 60)
    // console.log(timeLeft)
    // console.log(minutesTime, secondsTime)
    return `${minutesTime}:${secondsTime}${secondsTime === 0 ? '0' : ''}`
    }

  useEffect(()=>{
    intervalRef.current = setInterval(()=>{
        setTimeLeft((t:number)=>t - 1)
    }, 1000)

    return ()=> clearInterval(intervalRef.current)

  },[])
  
 // Add a listener to `timeLeft`
 useEffect(() => {
    console.log()

    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
    convertTimeToString()
  }, [timeLeft]);

    return (convertTimeToString());
};

export default useTimer;