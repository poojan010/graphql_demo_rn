import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import client from './ApolloClient';
import Routers from './navigator';
import ThemeProvider from './theme/ThemeProvider';



const App = () => (
    <SafeAreaProvider>
        <Routers />
    </SafeAreaProvider>
);

export default () => (
    <ApolloProvider client={client}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </ApolloProvider>
);