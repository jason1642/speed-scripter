import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

const Container = styled.div`
  
`;

interface ITimerProps {
    seconds: number;
}

const Timer: React.FunctionComponent<ITimerProps> = ({seconds}) => {
  
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
    console.log(timeLeft)

    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

    return (
    <Container>

    </Container>
  );
};

export default Timer;
