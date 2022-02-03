import { ChakraProvider, theme, ThemeProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);