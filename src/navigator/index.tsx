import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import constants from "constants/index";
import { setNavigator } from "./navHelper";

import Home from "containers/Home";
import AnimeDetails from "containers/AnimeDetails";

const { screens } = constants

const Stack = createNativeStackNavigator()

const Routers = () => {

    return (
        <NavigationContainer
            ref={(ref) => setNavigator(ref)}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen name={screens.home} component={Home} />
                <Stack.Screen name={screens.animeDetails} component={AnimeDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routers