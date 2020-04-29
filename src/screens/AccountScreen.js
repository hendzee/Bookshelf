import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Avatar, Card, Icon } from '@ui-kitten/components';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';
import { generalSty } from '../styles'

const ChevronRight = () => (
    <Icon width={ 32 } height={ 32 } name='chevron-right-outline' />
);

const LogoutIcon = () => (
    <Icon width={ 32 } height={ 32 } name='log-out-outline' />
);

class AccountScreen extends Component {
    /** Handle navigation menu */
    handleNavigation = (selectedIndex) => {
        const pageList = [
            'EDIT_PROFILE', // 0
            'CHANGE_PASSWORD', // 1
            'SETTING_LANGUAGE', // 2
            'ABOUT_US', // 3
            'TERMS_SERVICE', // 4
            'POLICY', // 5
            'SUPPORT' // 6
        ];

        this.props.navigation.navigate(pageList[selectedIndex]);
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <Layout style={ styles.userInfoContainer }>
                            <Layout style={ styles.userInfoSubcontainer }>
                                <Text style={ styles.titleScreenStyle }>Account</Text>
                                <Avatar
                                    size='giant'
                                    style={ styles.userImage }
                                    source={ require('../images/users/user1.png') }
                                />
                                <Text style={ styles.userName }>Rachel Linda</Text>
                            </Layout>
                        </Layout>

                        <Layout style={ styles.cardsContainer }>
                            <Card style={ styles.card }>
                                <Layout style={ styles.cardUserInfo }>
                                    <Layout style={ styles.cardUserInfoChild }>
                                        <Text style={ styles.cardUserValue }>5.0</Text>
                                        <Text>Rating</Text>
                                    </Layout>
                                    <Layout style={ styles.cardUserInfoChild }>
                                        <Text style={ styles.cardUserValue }>02</Text>
                                        <Text>Borrow</Text>
                                    </Layout>
                                    <Layout style={ styles.cardUserInfoChild }>
                                        <Text style={ styles.cardUserValue }>15</Text>
                                        <Text>Borowed</Text>
                                    </Layout>
                                </Layout>
                            </Card>
                            
                            <Card
                                disabled
                                style={ styles.card }>

                                <Text style={ styles.cardTitle }>General Settings</Text>
                                <CustomTouchableOpacity 
                                    onPress={ () => this.handleNavigation(0) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Profile</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity 
                                    onPress={ () => this.handleNavigation(1) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Change Password</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>
                                
                                <CustomTouchableOpacity
                                    onPress={ () => this.handleNavigation(2) }
                                >
                                    <Layout style={ styles.itemMenuLast }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Language</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>
                            </Card>

                            <Card
                                disabled
                                style={ styles.card }>
                                    
                                <Text style={ styles.cardTitle }>More</Text>
                                <CustomTouchableOpacity>
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>About Us</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity>
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Term of Service</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity>
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Privacy Policy</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity>
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Supoport</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>
                                
                                <CustomTouchableOpacity>
                                    <Layout style={ styles.itemMenuLast }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text style={ styles.bold }>Sign Out</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { LogoutIcon() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>
                            </Card>
                        </Layout>
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        ...generalSty.full
    },

    mainContainer: {
        flex: 1
    },

    userInfoContainer: {
        height: 300,
        alignItems: 'center',
        ...generalSty.plTop,
        ...generalSty.primaryBackground
    },

    userInfoSubcontainer: {
        ...generalSty.primaryBackground,
        alignItems: 'center',
        position: 'relative',
        top: 15
    },

    titleScreenStyle: {
        fontWeight: 'bold',
        ...generalSty.white,
        ...generalSty.veryLargeText,
        ...generalSty.mlBottom
    },

    userImage: {
        ...generalSty.iconSizeLarge,
        ...generalSty.mlBottom
    },

    userName: {
        fontWeight: 'bold',
        ...generalSty.white,
        ...generalSty.veryLargeText
    },

    cardsContainer: {
        position: 'relative', 
        top: -50, 
        backgroundColor: 'transparent',
        ...generalSty.mlLeft,
        ...generalSty.mlRight
    },

    card: {
        ...generalSty.mlBottom
    },

    cardUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    cardUserInfoChild: {
        alignItems: 'center'
    },

    cardUserValue: {
        fontWeight: 'bold',
        ...generalSty.plTop,
        ...generalSty.superLargeText,
        ...generalSty.primaryColor
    },

    cardTitle: {
        ...generalSty.veryLargeText,
        ...generalSty.mlBottom,
        fontWeight: 'bold'
    },

    itemMenu: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    itemMenuLast: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemMenuName: {
        flex: 1
    },

    arrowIcon: {
        flex: 1,
        alignItems: 'flex-end'
    },

    bold: {
        fontWeight: 'bold'
    }
});

export { AccountScreen };