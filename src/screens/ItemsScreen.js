import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigationAction, 
    Input,
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { 
    CustomStatusBar, 
    CustomTouchableOpacity, 
    ListItem,
    FLatlistLoading 
} from '../components/general';
import { getItem } from '../modules';

const BackIcon = () => (
    <Icon width={ 25 } height={ 25 } name='arrow-back-outline' />
);

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

class ItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], // Data items
            currentPage: 1, // Curent page of flatlist
            nextPage: null, // Next page of flatlist
            isLoadMore: false, // Loading flatlist
            isEnd: false // Content reach end
        }
    }

    async componentDidMount() {
        let items = await getItem(this.state.currentPage);

        this.setState({ 
            items: items.data,
            currentPage: items.currentPage,
            nextPage: items.nextPage 
        });
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

    /** Load more flatlist */
    loadMore = async () => {
        if (this.state.nextPage !== null) {
            this.setState({ isLoadMore: true }, () => {
                getItem(this.state.currentPage + 1)
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

    searchBoxContainer: {
        flexGrow: 1,
    },

    backContainer: {
        ...generalSty.mlRight
    },
});

export { ItemsScreen };