import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const AppStackNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' component={ HomeScreen } />
    </Stack.Navigator>
)

const AppNavigator = () => (
    <NavigationContainer>
        <AppStackNavigator /> 
    </NavigationContainer>
)

export default AppNavigator;