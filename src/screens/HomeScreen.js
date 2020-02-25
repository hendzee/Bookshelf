import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout, Text, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={ generalSty.full }>
                <Layout style={ generalSty.mainContainer }>
                    
                    {/** Search box */}
                    <Layout style={{ marginBottom: 15 }}>
                        <Input 
                            placeholder='Search your book'
                            value={ this.state.searchValue }
                        />
                    </Layout>

                    {/** First slide  */}
                    <Layout style={{ alignItems: 'baseline' }}>
                        <Layout style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Layout style={{ flex: 1 }}>
                                <Text>On Your Hand</Text>
                            </Layout>
                            <Layout style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text>See All</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </SafeAreaView>            
        );
    }
}

export { HomeScreen };