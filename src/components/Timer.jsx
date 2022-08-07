import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import SettingsButtons from './Buttons/SettingsButtons';
import {ButtonStyled} from './Buttons/ButtonStyled';

const ButtonGroupWrapper = styled.div(css`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 20px;
    margin: 0 5px;
  }
`);
const TimerWrapper = styled.div(css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`);
const TimerTextStyled = styled.div(css`
  font-size: 50px;
`);

function Timer() {
    const stateApp = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('pause');
    const [secondsLeft, setSecondsLeft] = useState(stateApp.workTime * 60);
    const [timerTitle, setTimerTitle] = useState('Session');
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const isBeepRef = useRef(null);
    const modeRef = useRef(mode);
    const [workTime, setWorkTime] = useState(25)
    const [breakTime, setBreakTime] = useState(25)

    function tick() {
        secondsLeftRef.current -= 1;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? stateApp.workTime : stateApp.breakTime) * 60;

            setMode(nextMode);
            modeRef.current = nextMode;
            modeRef.current === 'work' ? setTimerTitle('Session') : setTimerTitle('Break');
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = stateApp.workTime * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                isBeepRef.current.pause();
                return;
            }
            if (secondsLeftRef.current === 0) {
                isBeepRef.current.play();
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [stateApp]);

    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return (
        <TimerWrapper>
            <span id="timer-label">{timerTitle}</span>
            <TimerTextStyled id="time-left">{`${minutes}:${seconds}`}</TimerTextStyled>
            <audio
                id="beep"
                preload="auto"
                ref={isBeepRef}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
            <SettingsButtons/>
            <ButtonGroupWrapper>
                <ButtonStyled
                    id="start_stop"
                    color="blue"
                    type="button"
                    onClick={() => {
                        isPausedRef.current = !isPaused;
                        setIsPaused(isPausedRef.current);

                    }}
                >
                    {isPaused ? 'Start' : 'Pause'}
                </ButtonStyled>
                <ButtonStyled
                    id="reset"
                    color="red"
                    type="button"
                    onClick={() => {
                        dispatch({type: 'RESET'});
                        setIsPaused(true);
                        isPausedRef.current = true;
                        isBeepRef.current.pause();
                        isBeepRef.currentTime = 0;
                        setTimerTitle('Session');
                    }}
                >
                    Reset
                </ButtonStyled>
            </ButtonGroupWrapper>
        </TimerWrapper>

    );
}

export default Timer;
