import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { HomeScreen } from './screens';

/** Home icon */
const HomeIcon = (style) => (
    <Icon {...style} name='home-outline' />
)

/** Chat icon */
const ChatIcon = (style) => (
    <Icon {...style} name='message-square-outline' />
)

/** Chat icon */
const AddIcon = (style) => (
    <Icon {...style} name='plus-circle-outline' />
)

/** Inbox icon */
const InboxIcon = (style) => (
    <Icon {...style} name='email-outline' />
)

/** Account icon */
const AccountIcon = (style) => (
    <Icon {...style} name='person-outline' />
)

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabBar = ({ navigation, state }) => {
    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    }

    return (
        <SafeAreaView>
            <BottomNavigation appearance='noIndicator' selectedIndex={ state.index } onSelect={ onSelect }>
                <BottomNavigationTab title='Home' icon={ HomeIcon } />
                <BottomNavigationTab title='Chat' icon={ ChatIcon } />
                <BottomNavigationTab title='Add' icon={ AddIcon } />
                <BottomNavigationTab title='Inbox' icon={ InboxIcon } />
                <BottomNavigationTab title='Account' icon={ AccountIcon } />
            </BottomNavigation>
        </SafeAreaView>
    )
}

const TabBarNavigator = () => (
    <BottomTab.Navigator tabBar={ props => <BottomTabBar {...props} /> }>
        <BottomTab.Screen name='HOME' component={ HomeScreen } />
        <BottomTab.Screen name='CHAT' component={ HomeScreen } />
        <BottomTab.Screen name='ADD' component={ HomeScreen } />
        <BottomTab.Screen name='INBOX' component={ HomeScreen } />
        <BottomTab.Screen name='ACCOUNT' component={ HomeScreen } />
    </BottomTab.Navigator>
)

const AppStackNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='MAIN' component={ TabBarNavigator } />
    </Stack.Navigator>
)

const AppNavigator = () => (
    <NavigationContainer>
        <AppStackNavigator /> 
    </NavigationContainer>
)

export default AppNavigator;