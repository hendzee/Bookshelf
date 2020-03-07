import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Text, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { CustomStatusBar } from '../components/general';
import { generalSty } from '../styles';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class ChatDetailScreen extends Component {
    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Left chat content */
    leftChatContent = () => (
        <Layout style={ styles.leftChatContainer }>
            <Layout style={ styles.leftChatTextContainer }>
                <Text style={ styles.leftChatText }>Hello, can i borrow your book for tomorow ?</Text>
            </Layout>
            <Text style={ styles.chatTimeLeft }>07:05</Text>
        </Layout>
    );

    /** Right chat content */
    rightChatContent = () => (
        <Layout style={ styles.rightChatContainer }>
            <Layout style={ styles.rightChatTextContainer }>
                <Text>Yes of course.</Text>
            </Layout>
            <Text style={ styles.chatTimeRight }>07:45</Text>
        </Layout>
    )

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation 
                    title='Sarah Johnson'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    { this.leftChatContent() }
                    { this.rightChatContent() }
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

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    /** Right chat container */
    rightChatContainer: {
        alignSelf: 'flex-end',
        ...generalSty.mlBottom
    },

    rightChatTextContainer: {
        ...generalSty.greyBackground,
        ...generalSty.pmAll,
        ...generalSty.w230,
        ...generalSty.bottomLeftRadius
    },

    chatTimeRight: {
        ...generalSty.smallText,
        ...generalSty.greyText,
        textAlign: 'right'
    },

    /** Ledt chat content sytle */
    leftChatContainer: {
        alignSelf: 'flex-start',
        ...generalSty.mlBottom
    },

    leftChatTextContainer: {
        ...generalSty.primaryBackground,
        ...generalSty.pmAll,
        ...generalSty.w230,
        ...generalSty.bottomRightRadius
    },

    leftChatText: {
        ...generalSty.white,
    },

    chatTimeLeft: {
        ...generalSty.smallText,
        ...generalSty.greyText
    }
})

export { ChatDetailScreen };