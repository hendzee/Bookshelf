import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    BottomNavigation, 
    BottomNavigationTab, 
    Icon, 
} from '@ui-kitten/components';
import { 
    HomeScreen, 
    ChatScreen, 
    ChatDetailScreen, 
    ContactScreen, 
    AddScreen,
    InboxScreen,
    AccountScreen,
    AddItemScreen,
    ItemDetailScreen,
    CartScreen,
    CartConfirmationScreen,
    SelectMapScreen,
    CartConfirmedScreen,
    ConfirmationItemScreen,
    EditProfileScreen,
    ChangePasswordScreen,
    SettingLanguageScreen,
    AboutScreen,
    ServiceScreen,
    PolicyScreen,
    SupportScreen,
    SearchItemScreen,
} from './screens';

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
        <BottomTab.Screen name='CHAT' component={ ChatScreen } />
        <BottomTab.Screen 
            name='ADD' 
            component={ AddScreen }
            options={{
                tabBarVisible: false
            }}
        />
        <BottomTab.Screen name='INBOX' component={ InboxScreen } />
        <BottomTab.Screen name='ACCOUNT' component={ AccountScreen } />
    </BottomTab.Navigator>
)

const AppStackNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='MAIN' component={ TabBarNavigator } />
        <Stack.Screen name='CHAT_DETAIL' component={ ChatDetailScreen } />
        <Stack.Screen name='CONTACT' component={ ContactScreen } />
        <Stack.Screen name='ADD_ITEM' component={ AddItemScreen } />
        <Stack.Screen name='ITEM_DETAIL' component={ ItemDetailScreen } />
        <Stack.Screen name='CART' component={ CartScreen } />
        <Stack.Screen name='CART_CONFIRMATION' component={ CartConfirmationScreen } />
        <Stack.Screen name='SELECT_MAP' component={ SelectMapScreen } />
        <Stack.Screen name='CART_CONFIRMED' component={ CartConfirmedScreen } />
        <Stack.Screen name='CONFIRMATION_ITEM' component={ ConfirmationItemScreen } />
        <Stack.Screen name='EDIT_PROFILE' component={ EditProfileScreen } />
        <Stack.Screen name='CHANGE_PASSWORD' component={ ChangePasswordScreen } />
        <Stack.Screen name='SETTING_LANGUAGE' component={ SettingLanguageScreen } />
        <Stack.Screen name='ABOUT' component={ AboutScreen } />
        <Stack.Screen name='SERVICE' component={ ServiceScreen } />
        <Stack.Screen name='POLICY' component={ PolicyScreen } />
        <Stack.Screen name='SUPPORT' component={ SupportScreen } />
        <Stack.Screen name='SEARCH_ITEM' component={ SearchItemScreen } />
    </Stack.Navigator>
)

const AppNavigator = () => (
    <NavigationContainer>
        <AppStackNavigator /> 
    </NavigationContainer>
)

export default AppNavigator;