import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Input, Icon } from '@ui-kitten/components';
import { CustomStatusBar } from '../components/general';
import { generalSty } from '../styles';

/** Homescreen substance components */
import { FirstContent, SecondContent, ThirdContent } from '../components/home_screens';

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <Layout style={ styles.mainContainer }>
                    
                    {/** Search box - start */}
                    <Layout style={ styles.searchBoxContainer }>
                        <Input 
                            placeholder='Search your book'
                            icon={ SearchIcon }
                            value={ this.state.searchValue }
                            onChange={ searchValue => this.setState({ searchValue }) }

                        />
                    </Layout>
                    {/** Search box - end */}

                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <FirstContent navigation={ this.props.navigation } />
                        <SecondContent />
                        <ThirdContent />
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
});

export { HomeScreen };