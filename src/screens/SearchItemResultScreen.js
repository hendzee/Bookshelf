import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Layout, Icon, TopNavigationAction, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { 
    CustomStatusBar, 
    CustomTouchableOpacity, 
    FLatlistLoading, 
    ListItem 
} from '../components/general';

/** Services */
import { searchItemDetail } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = () => (
    <Icon width={ 25 } height={ 25 } name='arrow-back-outline' />
);

const SettingIcon = () => (
    <Icon width={ 25 } height={ 25 } name='options-2-outline' />
);

class SearchItemResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], // Data items
            currentPage: 1,
            nextPage: null,
            isLoadMore: false,
            isEnd: false
        }
    }

    async componentDidMount() {
        searchItemDetail(
            this.props.route.params.title,
            this.state.currentPage, 
            this.props.auth.token
        )
        .then(response => {
            this.setState({ 
                items: response.data,
                currentPage: response.currentPage,
                nextPage: response.nextPage 
            });
        })
        .catch((_) => {
            alert('Something wrong.')
        });
    }

    /** Load more flatlist */
    loadMore = async () => {
        if (this.state.nextPage !== null) {
            this.setState({ isLoadMore: true }, () => {
                searchItemDetail(
                    this.props.route.params.title,
                    this.state.currentPage + 1, 
                    this.props.auth.token
                )
                .then(items => {
                    this.setState({  
                        items: [ ...this.state.items, ...items.data ],
                        currentPage: items.currentPage,
                        nextPage: items.nextPage,
                        isLoadMore: false
                    })
                })
            })
        }else {
            this.setState({ isEnd: true });
        }
    }

    /** Show bottom loading */
    bottomLoading = () => {
        if (this.state.isLoadMore) {
            return <FLatlistLoading />
        }

        return null;
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** To search filter */
    toSearchFilter = () => {
        this.props.navigation.navigate('SEARCH_ITEM_FILTER');
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
                        <Layout style={ styles.searchContainer }>
                            <Input 
                                placeholder='Search your book here'
                                value={ this.props.route.params.title }
                                onFocus={ this.handleBack }
                            />
                        </Layout>
                        <Layout>
                            <CustomTouchableOpacity onPress={ this.toSearchFilter }>
                                <SettingIcon />
                            </CustomTouchableOpacity>
                        </Layout>
                    </Layout>
                    {/* Top content - end */}

                    {/* Main content - start */}
                    <Layout>
                        <FlatList 
                            data={ this.state.items }
                            horizontal={ false }
                            numColumns={ 2 }
                            showsVerticalScrollIndicator={ false }
                            keyExtractor={(_, index) => index.toString()}
                            onEndReachedThreshold={ 0.001 }
                            onEndReached={ this.loadMore }
                            ListFooterComponent={ this.bottomLoading }
                            renderItem={({ item, index }) => (
                                <ListItem 
                                    dataLength={ this.state.items.length }
                                    index={ index }
                                    item={ item }
                                    navigation={ this.props.navigation }
                                />
                            )}
                        />
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

    backContainer: {
        ...generalSty.mlRight
    },

    searchContainer: {
        flexGrow: 1,
        ...generalSty.mlRight
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxSearchItemResultScreen = connect(mapStateToProps)(SearchItemResultScreen);

export { rdxSearchItemResultScreen as SearchItemResultScreen };