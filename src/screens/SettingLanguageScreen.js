import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { generalSty, PRIMARY } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const CheckIcon = () => (
    <Icon width={ 25 } height={ 25 } fill={ PRIMARY } name='checkmark-outline' />
);

class SettingLanguageScreen extends Component {
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
                    title='Language'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Language list item - start */}
                    <CustomTouchableOpacity>
                        <Layout style={ styles.itemListContainer }>
                            <Text>Bahasa Indonesia</Text>
                            <CheckIcon />
                        </Layout>
                    </CustomTouchableOpacity>
                    <Layout style={ styles.itemListContainer }>
                        <Text>Bahasa Melayu</Text>
                    </Layout>
                    <Layout style={ styles.itemListContainer }>
                        <Text>English</Text>
                    </Layout>
                    <Layout style={ styles.itemListContainer }>
                        <Text>Arab</Text>
                    </Layout>
                    {/* Language list item - end */}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export { SettingLanguageScreen };