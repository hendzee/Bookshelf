import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Button, 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** Substance of cart confirmation page */
import { TopContent, MidContent, ListContent, BottomContent } from '../components/detail_transaction_screen';

/** import CRUD function */
import { updateToAppointment, updateToCancel, showTransaction } from '../modules';

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
        let getTransactionData = await showTransaction(15);

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
            updateToAppointment(15)
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
        if (this.state.modalType === modalType.REQUEST) {
            this.setState({ isSend: false }, () => {
                this.toSelectMap();
            });
        }else {
            this.setState({ isSend: false })
        }
    };

    /** Handle cancel */
    handleCancel = () => {
        this.setState({ isSend: true, isLoading: true, modalType: modalType.CANCEL }, () => {
            updateToCancel(15)
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

    /** Navigate to confirmation item */
    toConfirmationItem = () => {
        this.props.navigation.navigate('CONFIRMATION_ITEM', { loans: this.state.loans });
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
                        <TopContent relatedUsers={ this.state.relatedUsers } />
                        <MidContent 
                            transaction={ this.state.transaction }
                            toSelectMap={ this.toSelectMap } 
                        />
                        <ListContent loans={ this.state.loans } />
                    </ScrollView>
                    <BottomContent
                        transaction={ this.state.transaction } 
                        handleCancel={ this.handleCancel }
                        handleSend={ this.handleSend }
                        toConfirmationItem={ this.toConfirmationItem }
                    />
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
        ...generalSty.mainContainer
    },

    smallText: {
        ...generalSty.smallText
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },
});

export { DetailTransactionScreen };