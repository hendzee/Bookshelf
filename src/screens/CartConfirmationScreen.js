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
import { TopContent, MidContent, ListContent } from '../components/cart_confirmation_screen';

/** import CRUD function */
import { dummyFunctionData, addPeriod, showTransaction } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class CartConfirmationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {}, // general info of transaction
            relatedUsers: {}, // Borrower and owner user data
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
        this.setState({ isLoading: true, isSend: true }, () => {
            addPeriod(
                () => {
                    dummyFunctionData().then(response => {
                        this.setState({ 
                            isLoading: false, 
                            responseTitle: response.message,
                            isResponseError: false
                        });
                    }).catch(err => {
                        this.setState({ 
                            isLoading: false,
                            responseTitle: err.message,
                            isResponseError: true
                        });
                    })
                }
            )
        });
    }

    /** Handle modal success save function  */
    handleModalSend = () => {
        this.setState({ isSend: false }, () => {
            this.toSelectMap();
        });
    };

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
        this.props.navigation.navigate('SELECT_MAP');
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Confirmation'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <TopContent relatedUsers={ this.state.relatedUsers } />
                        <MidContent transaction={ this.state.transaction } />
                        <ListContent loans={ this.state.loans } />
                    </ScrollView>

                    <Layout style={ styles.bottomContent }>
                        <Button status='danger'>
                            REJECT REQUEST
                        </Button>
                        <Button onPress={ this.handleSend } style={ styles.mainButton }>
                            ACCEPT REQUEST
                        </Button>
                    </Layout>
                </Layout>
                
                {/* Modal when send request */}
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

    smallText: {
        ...generalSty.smallText
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
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

export { CartConfirmationScreen };