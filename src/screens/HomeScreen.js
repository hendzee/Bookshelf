import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Input, Icon } from '@ui-kitten/components';
import { CustomStatusBar } from '../components/general';
import { generalSty } from '../styles';
import { status, getLatestItem, getRecomendationItem, getRandomItem } from '../modules';

/** Homescreen substance components */
import { FirstContent, SecondContent, ThirdContent } from '../components/home_screens';

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstData: [],
            secondData: [],
            thirdData: []
        }
    }

    async componentDidMount () {
        var getFirstData = await getLatestItem();
        var getSecondData = await getRecomendationItem();
        var getThirdData = await getRandomItem();

        this.setState({
            firstData: getFirstData.status === status.OK ? getFirstData.data : [],
            secondData: getSecondData.status === status.OK ? getSecondData.data : [],
            thirdData: getThirdData.status === status.OK ? getThirdData.data : []
        })
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
                    
                    {/** Search box - start */}
                    <Layout style={ styles.searchBoxContainer }>
                        <Input 
                            placeholder='Search your book'
                            icon={ SearchIcon }
                            onFocus={ this.toSearchItem }
                        />
                    </Layout>
                    {/** Search box - end */}

                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <FirstContent 
                            data={ this.state.firstData }
                            navigation={ this.props.navigation } 
                        />
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