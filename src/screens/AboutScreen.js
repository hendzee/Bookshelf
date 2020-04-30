import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar } from '../components/general';
import { version } from '../../package.json';
const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class AboutScreen extends Component {
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
                    title='About US'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <Layout style={ styles.itemListContainer }>
                        <Text style={ styles.bold }>Version</Text>
                        <Text>{ version }</Text>
                    </Layout>
                    <Layout style={ styles.itemListContainer }>
                        <Text style={ styles.bold }>About</Text>
                        <Text>This app is for help people borrowing books each other.</Text>
                    </Layout>
                    <Layout style={ styles.itemListContainer }>
                        <Text style={ styles.bold }>Developer and Designer</Text>
                        <Text>Salis Fachrudin as Designer</Text>
                        <Text>Virginia Hendras as Developer</Text>
                    </Layout>
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

    itemListContainer: {
        ...generalSty.plBottom,
        ...generalSty.mlBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
    },

    bold: {
        fontWeight: 'bold'
    }
});

export { AboutScreen };