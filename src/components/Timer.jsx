import { useState, useEffect, useRef } from 'react';
import { LinearProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from './ActionButton';

export function Timer() {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('pause');
  const [secondsLeft, setSecondsLeft] = useState();
  const [percentage, setPersentage] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const stateApp = useSelector((state) => state);

  const totalSeconds = mode === 'work'
    ? stateApp.workTime * 60
    : stateApp.breakTime * 60;

  console.log('timer', stateApp, totalSeconds);
  function tick() {
    secondsLeftRef.current--;
    setPersentage(100 - Math.round(secondsLeftRef.current / totalSeconds * 100));
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? stateApp.workTime : stateApp.breakTime) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = stateApp.workTime * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
        setPersentage(0);
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [stateApp]);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  console.log(isPaused, percentage, totalSeconds, secondsLeftRef.current);
  if (seconds < 10) seconds = `0${seconds}`;
  return (
    <div>
      <span>{`${minutes}:${seconds}`}</span>
      <ActionButton onClick={() => { setIsPaused(!isPaused); isPausedRef.current = !isPaused; }} isPaused={isPaused} />
      <Box sx={{ width: '300px' }}>
        <LinearProgress variant="determinate" color="success" value={percentage} />
      </Box>
    </div>
  );
}
