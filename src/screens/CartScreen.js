import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Select, 
    Button 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** CartScreen substance components */
import { ItemList } from '../components/cart_screens';

/** import CRUD function */
import { showTransaction, durationToDate, updateToWaiting } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

/** Duration string constant */
const durations = {
    ONE_DAY: 'One Day',
    ONE_WEEKS: 'One Weeks',
    THREE_WEEKS: 'Three Weeks'
};

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loans: [], // List of loan items
            duration: {}, // Selected duration
            durationDate: '', // Converted duration value to date
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isLoading: false, // Loading state
            isSend: false // Send state
        }
    }

    async componentDidMount () {
        let getLoansData = await showTransaction(this.props.route.params.transactionId, this.props.auth.token);

        this.setState({ loans: getLoansData.data.transaction.loans });
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Handle send request */
    handleSend = () => {
        this.setState({ isLoading: true, isSend: true }, () => {
            updateToWaiting(this.props.route.params.transactionId, this.props.auth.token)
                .then(response => {
                    this.setState({ 
                        isLoading: false,
                        responseTitle: response.message,
                        isResponseError: false
                    });
                })
                .catch(error => {
                    this.setState({ 
                        isLoading: false,
                        responseTitle: error.message,
                        isResponseError: true
                    });
                })
        });
    }

    /** To main pages */
    toMain = () => {
        this.props.navigation.navigate('MAIN');
    }

    /** Handle sending modal button */
    handleModalSend = () => {
        this.setState({ isSend: false, isLoading: false }, () => {
            if (!this.state.isResponseError) {
                this.toMain();
            }
        });
    }

    /** Handle duration */
    handleDuration = (selected) => {
        switch (selected.text) {
            case durations.ONE_DAY:
                this.setState({
                    duration: selected,
                    durationDate: durationToDate(1)
                })
                break;

            case durations.ONE_WEEKS:
                this.setState({
                    duration: selected,
                    durationDate: durationToDate(7)
                })
                break;

            case durations.THREE_WEEKS:
                this.setState({
                    duration: selected,
                    durationDate: durationToDate(21)
                })    
                break;
        
            default:
                break;
        }
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Request List'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Duration content - start */}
                    <Layout style={ styles.durationContainer }>
                        <Select
                            label='Duration'
                            labelStyle={ styles.inputTextStyle }
                            data={[
                                { text: durations.ONE_DAY },
                                { text: durations.ONE_WEEKS },
                                { text: durations.THREE_WEEKS }
                            ]}
                            selectedOption={ this.state.duration }
                            onSelect={(selected) => this.handleDuration(selected)}
                            style={ styles.input }
                        />
                    </Layout>
                    {/* Duration content - end */}
                    
                    {/* List item - start */}
                    <Layout style={ styles.listCardContainer }>
                        <ItemList loans={ this.state.loans } />
                    </Layout>
                    {/* List item - end */}
                    
                    <Layout style={ styles.bottomContent }>
                        <Button status='basic'>
                            ADD LIST MORE
                        </Button>
                        <Button onPress={ this.handleSend } style={ styles.mainButton }>
                            SEND REQUEST
                        </Button>
                    </Layout>
                </Layout>

                {/* Modal when save complete */}
                <SmallModal
                    title={ this.state.responseTitle } 
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSend } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSend } 
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

    topInfoContainer: {
        ...generalSty.mlBottom
    },

    durationContainer: {
        ...generalSty.mlBottom
    },

    listCardContainer: {
        ...generalSty.mlTop,
        ...generalSty.mlBottom,
        height: 460
    },

    highlightText: {
        fontWeight: 'bold',
    },

    greyText: {
        ...generalSty.smallText,
        ...generalSty.greyText
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },

    cardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },

    mainButton: {
        ...generalSty.mlTop
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxCartScreen = connect(mapStateToProps)(CartScreen);

export { rdxCartScreen as CartScreen };