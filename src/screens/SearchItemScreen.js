import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigationAction, Autocomplete } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const BackIcon = () => (
    <Icon width={ 25 } height={ 25 } name='arrow-back-outline' />
);

const RemoveIcon = (style) => (
    <Icon { ...style } name='close-circle-outline' />
);

class SearchItemScreen extends Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.state = {
            /** Data search dummy */
            dataSearch: [
                {
                    id: 1,
                    title: 'Winnie the Pooh'
                },
                {
                    id: 2, 
                    title: 'Harry Potter'
                }
            ],
            selectedData: null // Selected data
        }
    }

    /** Set autocomplete */
    setAutocomplete = () => {
        if (this.state.dataSearch.length > 0) {
            this.searchRef.show();
        }else {
            this.searchRef.blur();
        }
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Handle on select */
    handleOnSelect = ({ title }) => {
        this.setState({ selectedData: title }, () => {
            this.toResult();
        });
    }

    /** Remove selected data */
    removeSelectedData = () => {
        this.setState({ selectedData: '' })
    }

    /** Handle on change data */
    handleOnChangeData = ({ text }) => {
        this.setState({ selectedData: text });
    }

    /** To search item result screem */
    toResult = () => {
        this.searchRef.current.hide();
        this.props.navigation.navigate('SEARCH_ITEM_RESULT');
    }

    /** Handle search */
    handleSearch = () => {
        this.toResult();
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    <Layout style={ styles.topContainer }>
                        <Layout style={ styles.backContainer }>
                            <CustomTouchableOpacity onPress={ this.handleBack }>
                                <BackIcon />
                            </CustomTouchableOpacity>
                        </Layout>
                        <Layout style={ styles.searchContainer }>
                            <Autocomplete 
                                ref={ this.searchRef }
                                icon={ RemoveIcon }
                                onIconPress={ this.removeSelectedData }
                                placeholder='Search your book here'
                                data={ this.state.dataSearch }
                                value={ this.state.selectedData }
                                onChangeText={ this.handleOnChangeData }
                                onSelect={ this.handleOnSelect }
                                returnKeyType='search'
                                autoFocus={ true }
                                blurOnSubmit={ true }
                                onSubmitEditing={ this.handleSearch }
                            />
                        </Layout>
                    </Layout>
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
    },

    backContainer: {
        ...generalSty.mlRight
    },

    searchContainer: {
        flexGrow: 1,
    }
});

export { SearchItemScreen };