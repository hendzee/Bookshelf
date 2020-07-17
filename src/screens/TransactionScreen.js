import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    TabView, 
    Tab,
    Button
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar } from '../components/general';

/** Substance of transaction screen */
import { StepIndicator, EmptyList } from '../components/transaction_screen';

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
            indicatorBorrowData: [], // List of status indicator
            indicatorLendData: [], // List of status indicator
            selectedIndex: 0
        }
    }

    componentDidMount() {
        showListTransaction(this.props.auth.id, statusType.STATUS_LEND, this.props.auth.token)
            .then(responseLend => {
                this.setState({ lendData: responseLend.data }, () => {
                    this.setIndicatorData(responseLend.data, statusType.STATUS_LEND)
                    
                    showListTransaction(this.props.auth.id, statusType.STATUS_BORROW, this.props.auth.token)
                    .then(responseBorrow => {
                        this.setState({ borrowData: responseBorrow.data }, () => {
                            this.setIndicatorData(responseBorrow.data, statusType.STATUS_BORROW);
                        })
                    })
                    .catch(_ => {
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

    /** Set indicator data */
    setIndicatorData = (listData, personStatus) => {
        if(listData) {
            let activeStatus1 = false;
            let activeStatus2 = false;
            let activeStatus3 = false;
            let activeStatus4 = false;

            switch (listData.status) {
                case 'WAITING':
                    activeStatus1 = true;
                    activeStatus2 = false;
                    activeStatus3 = false;
                    activeStatus4 = false;
                    break;

                case 'APPOINTMENT':
                    activeStatus1 = true;
                    activeStatus2 = true;
                    activeStatus3 = false;
                    activeStatus4 = false;
                    break;

                case 'BORROWED':
                    activeStatus1 = true;
                    activeStatus2 = true;
                    activeStatus3 = true;
                    activeStatus4 = false;
                    break;

                case 'RETURNED':
                    activeStatus1 = true;
                    activeStatus2 = true;
                    activeStatus3 = true;
                    activeStatus4 = true;
                    break;
            
                default:
                    activeStatus1 = false;
                    activeStatus2 = false;
                    activeStatus3 = false;
                    activeStatus4 = false;
                    break;
            }

            let indicatorData = [
                {
                    info: 'WAITING',
                    subInfo: 'No Info',
                    active: activeStatus1
                },
                {
                    info: 'APPOINTMENT',
                    subInfo: 'No Info',
                    active: activeStatus2
                },
                {
                    info: 'BORROWED',
                    subInfo: 'No Info',
                    active: activeStatus3
                },
                {
                    info: 'RETURNED',
                    subInfo: 'No Info',
                    active: activeStatus4
                },
            ]
            
            if (personStatus === statusType.STATUS_BORROW) {
                this.setState({ indicatorBorrowData: indicatorData });
            }else {
                this.setState({ indicatorLendData: indicatorData });
            }
        }

    }

    /** Set content tab */
    setContentTab = (component, dataSize) => {
        if (dataSize) {
            return component;
        }

        return (<EmptyList />);
    }

    /** To detail transaction */
    toDetailTransaction = (id) => {
        this.props.navigation.navigate('DETAIL_TRANSACTION', { transactionId: id });
    }

    /** Set bottom content */
    setBottomContent = (listData) => {
        if(listData) {
            return (
                <Layout style={ styles.bottomContent }>
                    <Button 
                        onPress={ () => this.toDetailTransaction(listData.id) } 
                        style={ styles.mainButton }
                    >
                        DETAIL TRANSACTION
                    </Button>
                </Layout>
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
                    <TabView
                        selectedIndex={this.state.selectedIndex}
                        onSelect={index => this.setSelectedIndex(index)}>

                        <Tab title='BORROW'>
                            <Layout style={ styles.itemContainer }>
                                { this.setContentTab(<StepIndicator listData={ this.state.indicatorBorrowData } />, this.state.borrowData) }
                                { this.setBottomContent(this.state.borrowData) }
                            </Layout>
                        </Tab>
                        <Tab title='LEND'>
                            <Layout style={ styles.itemContainer }>
                                { this.setContentTab(<StepIndicator listData={ this.state.indicatorLendData } />, this.state.lendData) }
                                { this.setBottomContent(this.state.lendData) }
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
        ...generalSty.mlTop,
        ...generalSty.plTop,
        ...generalSty.plRight
    },

    itemContainer: {
        height: '97.5%',
        ...generalSty.plAll
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

const mapToState = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxTransactionScreen = connect(mapToState)(TransactionScreen);

export { rdxTransactionScreen as TransactionScreen };