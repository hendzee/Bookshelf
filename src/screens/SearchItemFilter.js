import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Button, 
    Text 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** Redux */
import { connect } from 'react-redux';
import { rdxSetSearchFilter } from '../store/actions';

const CloseIcon = (style) => (
    <Icon { ...style } name='close-outline' />
)

class SearchItemFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption1: 1, // Selected option index of option 1
            selectedOption2: 1, // Selected option index of option 1
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
            isLoading: false // Loading state
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setInitialState();
        })
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ CloseIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Initial state option 1 and 2 */
    setInitialState = () => {
        let option1 = 1;
        let option2 = 1;

        if (this.props.searchFilter.orderBy === 'ORDER_BY_TITLE') {
            option1 = 1;
        }else {
            option1 = 2;
        }
        
        if (this.props.searchFilter.ASC === 'ASC') {
            option2 = 1;
        }else {
            option2 = 2;
        }

        this.setState({ 
            selectedOption1: option1,
            selectedOption2: option2
         })
    }

    /** Handle save data */
    handleSave = () => {
        let orderBy = '';
        let asc = '';

        if (this.state.selectedOption1 === 1) {
            orderBy = 'ORDER_BY_TITLE'
        }else {
            orderBy = 'ORDER_BY_DATE'
        }

        if (this.state.selectedOption2 === 1) {
            asc = 'ASC'
        }else {
            asc = 'DESC'
        }

        let data = {
            orderBy: orderBy,
            ASC: asc
        }

        this.props.onRdxSetSearchFilter(data)
        this.handleBack();
    };

    /** Handle option 1 */
    handleOption1 = (option) => {
        this.setState({ selectedOption1: option });
    }

    /** Handle option 2 */
    handleOption2 = (option) => {
        this.setState({ selectedOption2: option });
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Filter'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Filter list content - start */}
                    <Layout>
                        <Layout style={ styles.subtitleContainer }>
                            <Text style={ styles.bold }>Order By:</Text>
                        </Layout>
                        <Layout style={ styles.itemGroupContainer }>
                            <Button 
                                appearance={ this.state.selectedOption1 === 1 ? 'filled' : 'ghost' }
                                status={ this.state.selectedOption1 === 1 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption1(1) }
                            >
                                Title
                            </Button>
                            <Button 
                                appearance={ this.state.selectedOption1 === 2 ? 'filled' : 'ghost' } 
                                status={ this.state.selectedOption1 === 2 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption1(2) }
                            >
                                Publish Date
                            </Button>
                        </Layout>
                        
                        <Layout style={ styles.subtitleContainer }>
                            <Text style={ styles.bold }>Sorting:</Text>
                        </Layout>
                        <Layout style={ styles.itemGroupContainer }>
                            <Button 
                                appearance={ this.state.selectedOption2 === 1 ? 'filled' : 'ghost' }
                                status={ this.state.selectedOption2 === 1 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption2(1) }
                            >
                                ASC
                            </Button>
                            <Button 
                                appearance={ this.state.selectedOption2 === 2 ? 'filled' : 'ghost' } 
                                status={ this.state.selectedOption2 === 2 ? 'primary' : 'basic' }
                                style={ styles.itemContainer }
                                onPress={ () => this.handleOption2(2) }
                            >
                                DESC
                            </Button>
                        </Layout>
                    </Layout>
                    {/* Filter list content - end */}

                    {/* Bottom container - start */}
                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSave } status='primary'>
                            SAVE
                        </Button>
                    </Layout>
                    {/* Bottom container - end */}
                </Layout>

                {/* Modal when save complete */}
                <SmallModal
                    title={ this.state.responseTitle }
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSave } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSaved } 
                />

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

    subtitleContainer: {
        ...generalSty.mlBottom
    },

    bold: {
        fontWeight: 'bold'
    },

    itemGroupContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },

    itemContainer: {
        ...generalSty.allRadius,
        ...generalSty.plAll,
        ...generalSty.mmRight
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },
});

const mapStateToProps = state => {
    return {
        searchFilter: state.searchFilter.filterData
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onRdxSetSearchFilter : (data) => dispatch(rdxSetSearchFilter(data))
    }
}

const rdxSearchItemFilter = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SearchItemFilter)

export { rdxSearchItemFilter as SearchItemFilter };