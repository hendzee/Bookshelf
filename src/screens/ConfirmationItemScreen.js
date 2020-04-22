import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class ConfirmationItemScreen extends Component {
    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Confirmation Book'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <Text>This is confirmation screen</Text>
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
});

export { ConfirmationItemScreen };