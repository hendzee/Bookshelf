import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    TabView, 
    Tab, 
    Text,
    Avatar 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar } from '../components/general';

/** Substance of transaction screen */
import { StepIndicator } from '../components/transaction_screen';

/** Modules */
import { showListTransaction } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const statusType = {
    STATUS_LEND: 'STATUS_LEND',
    STATUS_BORROW: 'STATUS_BORROW'
}

class TransactionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowData: null,
            lendData: null,
            selectedIndex: 0
        }
    }

    componentDidMount() {
        showListTransaction(this.props.auth.id, statusType.STATUS_LEND, this.props.auth.token)
            .then(responseLend => {
                this.setState({ lendData: responseLend.data }, () => {
                    showListTransaction(this.props.auth.id, statusType.STATUS_BORROW, this.props.auth.token)
                    .then(responseBorrow => {
                        this.setState({ borrowData: responseBorrow.data })
                    })
                    .catch(error => {
                        alert('Failed to get data.')
                    })
                })
            })
            .catch(_ => {
                alert('Failed to get data.')
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

    /** Select index */
    setSelectedIndex = (index) => {
        this.setState({ selectedIndex: index })
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
                    <TabView
                        selectedIndex={this.state.selectedIndex}
                        onSelect={index => this.setSelectedIndex(index)}>

                        <Tab title='BORROW'>
                            <Layout style={ styles.itemContainer2 }>
                                <StepIndicator />
                            </Layout>
                        </Tab>
                        <Tab title='LEND'>
                            <Layout style={styles.tabContainer}>
                                <Layout style={ styles.itemContainer }>
                                    <Layout style={ styles.row }>
                                        <Avatar 
                                            source={ require('../images/users/user2.png') }
                                            style={ styles.avatar }
                                            size='giant'
                                        />
                                        <Layout>
                                            <Text>Cynthia</Text>
                                            <Text style={ styles.bold }>#35021AZ</Text>
                                        </Layout>
                                    </Layout>
                                    <Layout style={ styles.badgePrimary }>
                                        <Text style={ styles.smallTextWhite }>Waiting Confirmation</Text>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Tab>
                    </TabView>
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

    tabContainer: {
        flexGrow: 1,
        height: '100%',
        ...generalSty.mlTop,
        ...generalSty.plTop,
        ...generalSty.plRight
    },

    itemContainer2: {
        ...generalSty.plAll
    },

    itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.mltop,
        ...generalSty.plBottom
    },

    row: {
        flexDirection: 'row'
    },

    avatar: {
        ...generalSty.mmRight
    },

    bold: {
        fontWeight: 'bold',
        ...generalSty.smallText
    },

    subInfo: {
        ...generalSty.smallText,
        ...generalSty.greyText
    },

    badgePrimary: {
        ...generalSty.primaryBackground,
        ...generalSty.pmLeft,
        ...generalSty.pmRight,
        alignSelf: 'baseline',
        borderRadius: 3,
        paddingVertical: 0.5,
    },

    smallTextWhite: {
        fontSize: 10,
        letterSpacing: 0.5,
        ...generalSty.white
    },
});

const mapToState = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxTransactionScreen = connect(mapToState)(TransactionScreen);

export { rdxTransactionScreen as TransactionScreen };