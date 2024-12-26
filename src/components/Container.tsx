import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Timer from './Timer';

const MainContainer: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container 
            sx={{
                width: '600px', // Фиксированная ширина
                height: '600px', // Высота равна ширине
                borderRadius: '50%', // Закругление до круга
                backgroundColor: 'lightblue', // Цвет фона
                display: 'flex', // Центровка содержимого
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}
            >
                <Box>
                    <Timer></Timer>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default MainContainer;