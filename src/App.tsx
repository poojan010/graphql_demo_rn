import React from 'react';
import { LogBox } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import client from './ApolloClient';
import Routers from './navigator';
import ThemeProvider from './theme/ThemeProvider';

import { HelperButton } from './components';


const victoryNativeWarning = "Require cycle: node_modules/victory"

LogBox.ignoreLogs([victoryNativeWarning]);


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