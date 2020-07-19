import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction,
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** Substance of cart confirmation page */
import { TopContent, MidContent, ListContent, BottomContent } from '../components/detail_transaction_screen';

/** import CRUD function */
import { 
    updateToAppointment, 
    updateToBorrowed, 
    updateToReturned, 
    updateToCancel, 
    showTransaction 
} from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const modalType = {
    REQUEST: 'REQUEST',
    CANCEL: 'CANCEL',
}

class DetailTransactionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {}, // general info of transaction
            relatedUsers: {}, // Borrower and owner user data
            modalType: modalType.REQUEST, // Set modal for
            loans: [], // List of loan items
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSend: false, // Send state
            isLoading: false // Loading state
        }
    }

    async componentDidMount() {
        let getTransactionData = await showTransaction(
            this.props.route.params.transactionId,
            this.props.auth.token
        );

        this.setState({
            transaction: getTransactionData.data.transaction,
            loans: getTransactionData.data.transaction.loans,
            relatedUsers: getTransactionData.data.user
        })
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle send */
    handleSend = () => {
        this.setState({ isSend: true, isLoading: true, modalType: modalType.REQUEST }, () => {
            updateToAppointment(
                this.state.transaction.id,
                this.props.auth.token
            )
                .then(response => {
                    this.setState({
                        isResponseError: response.status,
                        responseTitle: response.message,
                        isResponseError: false
                    })
                }).catch(error => {
                    this.setState({
                        isResponseError: error.status,
                        responseTitle: error.message,
                        isResponseError: true
                    })
                }).finally(() => {
                    this.setState({ isLoading: false })
                })
        })
    }

    /** Handle modal submit  */
    handleModalSubmit = () => {
        this.setState({ isSend: false })
    };

    /** Handle cancel */
    handleCancel = () => {
        this.setState({ isSend: true, isLoading: true, modalType: modalType.CANCEL }, () => {
            updateToCancel(
                this.state.transaction.id,
                this.props.auth.token
            )
                .then(response => {
                    this.setState(prevState => ({
                        ...prevState,
                        transaction: {
                            ...prevState.transaction,
                            status: 'CANCEL'
                        }
                    }), () => {
                        this.setState({
                            responseTitle: response.message,
                            isResponseError: false
                        })
                    })
                }).catch(error => {
                    this.setState({
                        responseTitle: error.message,
                        isResponseError: true
                    })
                }).finally(() => {
                    this.setState({ isLoading: false })
                })
        })
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Navigate to select map screen */
    toSelectMap = () => {
        this.props.navigation.navigate('SELECT_MAP', { transactionId: this.state.transaction.id });
    }

    /** Navigate to show map */
    toShowMap = () => {
        this.props.navigation.navigate('SHOW_MAP', { transaction: this.state.transaction });
    }

    /** Navigate to confirmation item */
    toConfirmationItem = () => {
        this.props.navigation.navigate('CONFIRMATION_ITEM', { loans: this.state.loans });
    }

    /** Confirmation borrow */
    handleConfirmationBorrowed = () => {
        let data = '';

        if (this.state.transaction.id === this.props.auth.id) {
            data = 'OWNER'
        }else {
            data = 'BORROWER'
        }

        this.setState({ isSend: true, isLoading: true, modalType: modalType.REQUEST }, () => {
            updateToBorrowed(
                this.state.transaction.id, 
                data, 
                this.props.auth.token
            )
            .then(response => {
                this.setState({
                    isLoading: false,
                    responseTitle: response.message,
                    isResponseError: false
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    responseTitle: error.message,
                    isResponseError: true
                })
            })
        })
    }

    /** Handle confirmation return */
    handleConfirmationReturned = () => {
        let data = '';

        if (this.state.transaction.id === this.props.auth.id) {
            data = 'OWNER'
        }else {
            data = 'BORROWER'
        }

        this.setState({ isSend: true, isLoading: true, modalType: modalType.REQUEST }, () => {
            updateToReturned(
                this.state.transaction.id, 
                data, 
                this.props.auth.token
            )
            .then(response => {
                this.setState({
                    isLoading: false,
                    responseTitle: response.message,
                    isResponseError: false
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    responseTitle: error.message,
                    isResponseError: true
                })
            })
        })
    }

    /** Set bottom content */
    setBottomContent = () => {
        if (Object.keys(this.state.transaction).length > 0) {
            return(
                <BottomContent
                    isOwner={ this.state.transaction.owner_id === this.props.auth.id }
                    transaction={ this.state.transaction } 
                    handleCancel={ this.handleCancel }
                    handleSend={ this.handleSend }
                    handleConfirmationBorrowed={ this.handleConfirmationBorrowed }
                    handleConfirmationReturned={ this.handleConfirmationReturned }
                />
            );
        }

        return null;
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Transaction'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <TopContent
                            userId={ this.props.auth.id }
                            transaction={ this.state.transaction } 
                            relatedUsers={ this.state.relatedUsers } 
                        />
                        <MidContent 
                            transaction={ this.state.transaction }
                            toSelectMap={ this.toSelectMap }
                            toShowMap={ this.toShowMap }
                            isMapEditable={ this.props.auth.id === this.state.transaction.owner_id }
                        />
                        <ListContent loans={ this.state.loans } />
                        { this.setBottomContent() }
                    </ScrollView>
                </Layout>
                
                {/* Modal when send request */}
                <SmallModal
                    title={ this.state.responseTitle } 
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSubmit } 
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
        ...generalSty.mainContainer,
    },

    smallText: {
        ...generalSty.smallText
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxDetailTransactionScreen = connect(mapStateToProps)(DetailTransactionScreen)

export { rdxDetailTransactionScreen as DetailTransactionScreen };