import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigationAction, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, ListItem } from '../components/general';

const BackIcon = () => (
    <Icon width={ 25 } height={ 25 } name='arrow-back-outline' />
);

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

class ItemsScreen extends Component {
    constructor(props) {
        super(props);
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** To search item screen */
    toSearchItem = () => {
        this.props.navigation.navigate('SEARCH_ITEM');
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    {/* Top content - start */}
                    <Layout style={ styles.topContainer }>
                        <Layout style={ styles.backContainer }>
                            <CustomTouchableOpacity onPress={ this.handleBack }>
                                <BackIcon />
                            </CustomTouchableOpacity>
                        </Layout>
                        <Layout style={ styles.searchBoxContainer }>
                            <Input 
                                placeholder='Search your book'
                                icon={ SearchIcon }
                                onFocus={ this.toSearchItem }
                            />
                        </Layout>
                    </Layout>
                    {/* Top content - end */}

                    {/* Main content - start */}
                    <Layout>
                        <ListItem navigation={ this.props.navigation } />
                    </Layout>
                    {/* Main content - end */}

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

    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        ...generalSty.mlBottom
    },

    searchBoxContainer: {
        flexGrow: 1,
    },

    backContainer: {
        ...generalSty.mlRight
    },
});

export { ItemsScreen };