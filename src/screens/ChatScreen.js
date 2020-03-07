import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar } from '../components/general';

/** ChatScreen substance components */
import { ChatCard } from '../components/chat_screens';

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

const PlusIcon = (style) => (
    <Icon {...style } name='plus-circle-outline' />
);

class ChatScreen extends Component {

    /** Show search action */
    showSearchButton = () => (
        <TopNavigationAction icon={ SearchIcon } />
    );

    /** Show add button */
    showAddButton = () => (
        <TopNavigationAction icon={ PlusIcon } />
    );
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Chat'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showSearchButton() }
                    rightControls={ this.showAddButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <ChatCard navigation={ this.props.navigation } />
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

    navigationICon: {
        ...generalSty.navigationIcon
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },
})

export { ChatScreen };