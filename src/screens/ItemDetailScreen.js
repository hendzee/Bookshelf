import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, FloatingButton } from '../components/general';
import { MainInfo, ItemInfo } from '../components/item_detail_screen';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const EditIcon = (style) => (
    <Icon {...style } name='edit-2-outline' />
);

class ItemDetailScreen extends Component {
    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Show edit icon */
    showEditIcon = () => (
        <TopNavigationAction icon={ EditIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Navigate to detail chat screen */
    toChatDetailScreen = () => {
        this.props.navigation.navigate('CHAT_DETAIL');
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Book Detail'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                    rightControls={ this.showEditIcon() }
                />

                <ScrollView>
                    <Layout style={ styles.mainContainer }>
                        <MainInfo />
                        <ItemInfo />
                    </Layout>
                </ScrollView>
                <FloatingButton icon='message-circle' onPress={ this.toChatDetailScreen } />
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

export { ItemDetailScreen };