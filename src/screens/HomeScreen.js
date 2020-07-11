import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, Input, Icon } from '@ui-kitten/components';
import { CustomStatusBar } from '../components/general';
import { generalSty } from '../styles';
import { status, getLatestItem, getRecomendationItem, getRandomItem } from '../modules';

/** Homescreen substance components */
import { FirstContent, SecondContent, ThirdContent } from '../components/home_screens';

/** Redux */
import { connect } from 'react-redux';

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstData: [],
            secondData: {},
            thirdData: {}
        }
    }

    async componentDidMount () {
        let getFirstData = await getLatestItem(this.props.userData.token);
        let getSecondData = await getRecomendationItem(this.props.userData.token);
        let getThirdData = await getRandomItem(this.props.userData.token);

        this.setState({
            firstData: getFirstData.status === status.OK ? getFirstData.data : [],
            secondData: getSecondData.status === status.OK ? getSecondData.data : {},
            thirdData: getThirdData.status === status.OK ? getThirdData.data : {}
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
                        <SecondContent 
                            data={ this.state.secondData }
                            navigation={ this.props.navigation }
                        />
                        <ThirdContent 
                            data={ this.state.thirdData }
                            navigation={ this.props.navigation }
                        />
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

const mapStateToProps = state => {
    return {
        userData: state.auth.userData
    }
}

const rdxHomeScreen = connect(mapStateToProps)(HomeScreen);

export { rdxHomeScreen as HomeScreen };