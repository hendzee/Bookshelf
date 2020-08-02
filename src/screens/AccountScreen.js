import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Avatar, Card, Icon } from '@ui-kitten/components';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';
import { generalSty } from '../styles'

/** Redux */
import { connect } from 'react-redux';

/** Services and modulse */
import { getProfileData, removeUserData } from '../modules';

const ChevronRight = () => (
    <Icon width={ 32 } height={ 32 } name='chevron-right-outline' />
);

const LogoutIcon = () => (
    <Icon width={ 32 } height={ 32 } name='log-out-outline' />
);

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {
                first_name: 'Loading...',
                last_name: '',
                photo: '../images/profile_default.png'
            }
        }
    }

    componentDidMount() {
        this.setProfileData();
    }

    /** Handle navigation menu */
    handleNavigation = (selectedIndex) => {
        const pageList = [
            'EDIT_PROFILE', // 0
            'CHANGE_PASSWORD', // 1
            'SETTING_LANGUAGE', // 2
            'ABOUT', // 3
            'SERVICE', // 4
            'POLICY', // 5
            'SUPPORT', // 6
            'USER_ITEMS' // 7
        ];

        if (selectedIndex === 7) {
            this.props.navigation.navigate(pageList[selectedIndex], { userId: this.props.auth.id });
        }else if(selectedIndex === 0) {
            this.props.navigation.navigate(pageList[selectedIndex], { profileData: this.state.profileData });
        }else {
            this.props.navigation.navigate(pageList[selectedIndex]);
        }
    }

    /** Get profile data */
    setProfileData = () => {
        getProfileData(this.props.auth.id, this.props.auth.token)
        .then(response => {
            this.setState({ profileData: response.data })
        })
        .catch(error => {
            alert(error.message);
        })
    }

    /** Handle Sign Out */
    handleSignOut = () => {
        removeUserData()
        .then(_ => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'LOGIN' }]
            })
        })
        .catch(_ => {
            alert('Something wrong, try again later.')
        })
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
                                    source={{ uri: this.state.profileData.photo }}
                                />
                                <Text style={ styles.userName }>
                                    { 
                                        this.state.profileData.first_name 
                                        + ' ' + this.state.profileData.last_name 
                                    }
                                </Text>
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
                                <Text style={ styles.cardTitle }>My Library</Text>
                                <CustomTouchableOpacity 
                                    onPress={ () => this.handleNavigation(7) }
                                >
                                    <Layout style={ styles.itemMenuLast }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>My Library</Text>
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
                                <CustomTouchableOpacity
                                    onPress={ () => this.handleNavigation(3) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>About Us</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity
                                    onPress={ () => this.handleNavigation(4) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Terms of Service</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity
                                    onPress={ () => this.handleNavigation(5) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Privacy Policy</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>

                                <CustomTouchableOpacity
                                    onPress={ () => this.handleNavigation(6) }
                                >
                                    <Layout style={ styles.itemMenu }>
                                        <Layout style={ styles.itemMenuName }>
                                            <Text>Support</Text>
                                        </Layout>
                                        <Layout style={ styles.arrowIcon }>
                                            { ChevronRight() }
                                        </Layout>
                                    </Layout>
                                </CustomTouchableOpacity>
                                
                                <CustomTouchableOpacity onPress={ this.handleSignOut }>
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

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxAccountScreen = connect(mapStateToProps)(AccountScreen);

export { rdxAccountScreen as AccountScreen };