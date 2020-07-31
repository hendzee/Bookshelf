import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigationAction, Autocomplete } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

/** Search services */
import { userSearhItem } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = () => (
    <Icon width={ 25 } height={ 25 } name='arrow-back-outline' />
);

const RemoveIcon = (style) => (
    <Icon { ...style } name='close-circle-outline' />
);

class UserSearchItemScreen extends Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.state = {
            /** Data search dummy */
            dataSearch: [],
            selectedData: '' // Selected data
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
    handleOnChangeData = ( text ) => {
        this.setState({ selectedData: text }, () => {
            let data = {
                userId: this.props.auth.id,
                text: this.state.selectedData
            }

            userSearhItem(data, this.props.auth.token)
            .then(response => {
                this.setState({ dataSearch: response.data });
            })
            .catch(error => {
                alert(error.message)
            })
        });
    }

    /** To search item result screen */
    toResult = () => {
        this.props.navigation.navigate(
            'USER_SEARCH_RESULT',
            { title: this.state.selectedData } 
        );
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
                                onChangeText={(text) => this.handleOnChangeData(text) }
                                onSelect={ this.handleOnSelect }
                                returnKeyType='search'
                                autoFocus={ true }
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

const mapStateToProps = state => {
    return { 
        auth: state.auth.userData
    }
}

const rdxUserSearchItemScreen = connect(mapStateToProps)(UserSearchItemScreen);

export { rdxUserSearchItemScreen as UserSearchItemScreen };