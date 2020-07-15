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
    RegisterScreen,
    LoginScreen,
    HomeScreen, 
    ChatScreen, 
    ChatDetailScreen, 
    ContactScreen, 
    TransactionMenuScreen,
    InboxScreen,
    AccountScreen,
    AddItemScreen,
    EditItemScreen,
    ItemDetailScreen,
    CartScreen,
    DetailTransactionScreen,
    SelectMapScreen,
    ConfirmationItemScreen,
    EditProfileScreen,
    ChangePasswordScreen,
    SettingLanguageScreen,
    AboutScreen,
    ServiceScreen,
    PolicyScreen,
    SupportScreen,
    SearchItemScreen,
    SearchItemResultScreen,
    SearchItemFilter,
    ItemsScreen,
    TransactionScreen,
} from './screens';

/** Home icon */
const HomeIcon = (style) => (
    <Icon {...style} name='home-outline' />
)

/** Home icon active */
const ActiveHomeIcon = (style) => (
    <Icon {...style} name='home' />
)

/** Chat icon */
const ChatIcon = (style) => (
    <Icon {...style} name='message-square-outline' />
)

/** Chat icon active */
const ActiveChatIcon = (style) => (
    <Icon {...style} name='message-square' />
)

/** Chat icon */
const MenuIcon = (style) => (
    <Icon {...style} name='clipboard-outline' />
)

/** Inbox icon */
const InboxIcon = (style) => (
    <Icon {...style} name='bell-outline' />
)

/** Inbox icon active */
const ActiveInboxIcon = (style) => (
    <Icon {...style} name='bell' />
)

/** Account icon */
const AccountIcon = (style) => (
    <Icon {...style} name='person-outline' />
)

/** Account icon */
const ActiveAccountIcon = (style) => (
    <Icon {...style} name='person' />
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
                <BottomNavigationTab title='Home' icon={ state.index === 0 ? ActiveHomeIcon : HomeIcon } />
                <BottomNavigationTab title='Chat' icon={ state.index === 1 ? ActiveChatIcon : ChatIcon } />
                <BottomNavigationTab title='Transaction' icon={ MenuIcon } />
                <BottomNavigationTab title='Inbox' icon={ state.index === 3 ? ActiveInboxIcon : InboxIcon } />
                <BottomNavigationTab title='Account' icon={ state.index === 4 ? ActiveAccountIcon : AccountIcon } />
            </BottomNavigation>
        </SafeAreaView>
    )
}

const TabBarNavigator = () => (
    <BottomTab.Navigator tabBar={ props => <BottomTabBar {...props} /> }>
        <BottomTab.Screen name='HOME' component={ HomeScreen } />
        <BottomTab.Screen name='CHAT' component={ ChatScreen } />
        <BottomTab.Screen 
            name='TRANSACTION' 
            component={ TransactionMenuScreen }
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
        <Stack.Screen name='LOGIN' component={ LoginScreen } />
        <Stack.Screen name='REGISTER' component={ RegisterScreen } />
        <Stack.Screen name='MAIN' component={ TabBarNavigator } />
        <Stack.Screen name='CHAT_DETAIL' component={ ChatDetailScreen } />
        <Stack.Screen name='CONTACT' component={ ContactScreen } />
        <Stack.Screen name='ADD_ITEM' component={ AddItemScreen } />
        <Stack.Screen name='EDIT_ITEM' component={ EditItemScreen } />
        <Stack.Screen name='ITEM_DETAIL' component={ ItemDetailScreen } />
        <Stack.Screen name='CART' component={ CartScreen } />
        <Stack.Screen name='DETAIL_TRANSACTION' component={ DetailTransactionScreen } />
        <Stack.Screen name='SELECT_MAP' component={ SelectMapScreen } />
        <Stack.Screen name='CONFIRMATION_ITEM' component={ ConfirmationItemScreen } />
        <Stack.Screen name='EDIT_PROFILE' component={ EditProfileScreen } />
        <Stack.Screen name='CHANGE_PASSWORD' component={ ChangePasswordScreen } />
        <Stack.Screen name='SETTING_LANGUAGE' component={ SettingLanguageScreen } />
        <Stack.Screen name='ABOUT' component={ AboutScreen } />
        <Stack.Screen name='SERVICE' component={ ServiceScreen } />
        <Stack.Screen name='POLICY' component={ PolicyScreen } />
        <Stack.Screen name='SUPPORT' component={ SupportScreen } />
        <Stack.Screen name='SEARCH_ITEM' component={ SearchItemScreen } />
        <Stack.Screen name='SEARCH_ITEM_RESULT' component={ SearchItemResultScreen } />
        <Stack.Screen name='SEARCH_ITEM_FILTER' component={ SearchItemFilter } />
        <Stack.Screen name='ITEMS' component={ ItemsScreen } />
        <Stack.Screen name='TRANSACTION' component={ TransactionScreen } />
    </Stack.Navigator>
)

const AppNavigator = () => (
    <NavigationContainer>
        <AppStackNavigator /> 
    </NavigationContainer>
)

export default AppNavigator;