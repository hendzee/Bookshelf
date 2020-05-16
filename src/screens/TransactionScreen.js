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
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

class TransactionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedIndex: 0
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

                        <Tab title='ME'>
                            <CustomTouchableOpacity style={styles.tabContainer}>
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
                            </CustomTouchableOpacity>
                        </Tab>
                        <Tab title='PEOPLE'>
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
                        <Tab title='HITORY'>
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

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export { TransactionScreen };