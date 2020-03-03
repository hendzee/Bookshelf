import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { FirstContent, SecondContent, ThirdContent } from '../components/home_screens';

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
                <Layout style={ styles.mainContainer }>
                    
                    {/** Search box - start */}
                    <Layout style={ styles.searchBoxContainer }>
                        <Input 
                            placeholder='Search your book'
                            value={ this.state.searchValue }
                        />
                    </Layout>
                    {/** Search box - end */}

                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <FirstContent />
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
})

export { HomeScreen };