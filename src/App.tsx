import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import client from './ApolloClient';
import Routers from './navigator';
import ThemeProvider from './theme/ThemeProvider';

import { HelperButton } from './components';


const App = () => (
    <SafeAreaProvider>
        <Routers />
        <HelperButton />
    </SafeAreaProvider>
);

export default () => (
    <ApolloProvider client={client}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </ApolloProvider>
);