import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Icon, TopNavigation, TopNavigationAction, Avatar } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const MoreIcon = (style) => (
    <Icon { ...style } name='more-vertical-outline' />
);

class ContactScreen extends Component {
    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );
        
    /** Show more icon */
    showMoreIcon = () => (
        <TopNavigationAction icon={ MoreIcon } onPress={ null } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation 
                    title='Select Contact'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                    rightControls={ this.showMoreIcon() }
                />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <CustomTouchableOpacity>
                            <Layout style={ styles.contactCardContainer }>
                                <Layout style={ styles.contactCardImageContainer }>
                                    <Avatar 
                                        size='giant'
                                        source={ require('../images/users/user1.png') } 
                                    />
                                </Layout>
                                <Layout style={ styles.contactCardContentContainer }>
                                    <Text style={ styles.userName } >Sarah Johnson</Text>
                                    <Text style={ styles.contactContent }>+6287655437902</Text>
                                </Layout>
                            </Layout>
                        </CustomTouchableOpacity>
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
        ...generalSty.mainContainer
    },

    searchBoxContainer: {
        ...generalSty.mlBottom,
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    contactCardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    contactCardImageContainer: {
        flex: 2
    },

    contactCardContentContainer: {
        flex: 7,
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    userName: {
        fontWeight: 'bold'
    },

    contactContent: {
        ...generalSty.smallText
    },
});

export { ContactScreen };