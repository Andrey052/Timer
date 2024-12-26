import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { TimerProps } from '../types/TimerProps';
import { TimerState } from '../types/TimerState';

const Timer: React.FC<TimerProps> = ({ initialTime = 0 }) => {
    const [timing, setTiming] = useState<TimerState>({
        isRunning: false,
        time: initialTime,
    });

    const [resetPending, setResetPending] = useState(false);

    const startPauseResumeTimer = useCallback(() => {
        setTiming(prevState => ({ ...prevState, isRunning: !prevState.isRunning }));
        setResetPending(false);
    }, []);

    const resetTimer = useCallback(() => {
        if (timing.isRunning) {
            setTiming(prevState => ({ ...prevState, isRunning: false }));
            setResetPending(true);
        } else if (resetPending) {
            setTiming({ isRunning: false, time: 0 });
            setResetPending(false);
        } else {
            setTiming({ isRunning: false, time: 0 });
        }
    }, [timing.isRunning, resetPending]);

    const formatTime = useMemo(() => {
        const minutes = Math.floor(timing.time / 60000);
        const seconds = Math.floor((timing.time % 60000) / 1000);
        const milliseconds = Math.floor((timing.time % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:
        ${String(seconds).padStart(2, '0')}:
        ${String(milliseconds).padStart(2, '0')}`;
    }, [timing.time]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timing.isRunning) {
            interval = setInterval(() => {
                setTiming(prevState => ({ ...prevState, time: prevState.time + 10 }));
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timing.isRunning]);

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography 
            variant='h3' 
            component='h3' 
            sx={{
                marginBottom: 10,
            }} 
            >
                Timer
            </Typography>
            <Box
                height={40}
                width={120}
                my={2}
                mx='auto'
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ border: '2px solid magenta', 
                    backgroundColor: 'lightgrey', 
                    borderRadius: 50 
                }}
            >
                {formatTime}
            </Box>
            <div style = {{
                marginTop: 30,
            }}
            >
            <Button variant='contained' color='primary' onClick={startPauseResumeTimer} style={{ marginRight: 30 }}>
                {timing.isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={resetTimer}>
                Reset
            </Button>
            </div>
        </div>
    );
};

export default Timer;