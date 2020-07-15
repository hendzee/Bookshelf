import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Text, Avatar, Button, Icon } from '@ui-kitten/components'
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';
import { generalSty } from '../styles';

const CloseIcon = () => (
    <Icon width={ 32 } height={ 32 } name='close-outline' />
);

/** Screens enum */
const screens = {
    ADD_ITEM: 'ADD_ITEM',
    LIBRARY: 'LIBRARY',
    TRANSACTION: 'TRANSACTION'
}

class TransactionMenuScreen extends Component {
    /** Handle close */
    handleClose = () => {
        this.props.navigation.goBack();
    };

    /** Handle menu */
    handleMenuNavigation = (menu) => {
        let screen = 'MAIN';

        switch (menu) {
            case screens.ADD_ITEM:
                screen = 'ADD_ITEM'
                break;

            case screens.LIBRARY:
                screen = 'ADD_ITEM'
                break;

            case screens.TRANSACTION:
                screen = 'TRANSACTION'
                break;
        
            default:
                break;
        }

        this.props.navigation.navigate(screen);
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    <Text style={ styles.titlePage }>What would you do?</Text>
                    <Text style={ styles.subTitle }>
                        We provide features that can optimize 
                        your efforts to manage books
                    </Text>
                    
                    {/* Content menu - start */}
                    <Layout style={ styles.menuContainer }>
                        <Layout style={ styles.menuRowContainer }>
                            <CustomTouchableOpacity onPress={ () => this.handleMenuNavigation(screens.ADD_ITEM) }>
                                <Layout style={ styles.menuChildren }>
                                    <Avatar 
                                        size='giant'
                                        style={ styles.menuIcon }
                                        source={ require('../images/icons/icon_menu1.png') }
                                    />
                                    <Text>Add</Text>
                                </Layout>
                            </CustomTouchableOpacity>

                            <CustomTouchableOpacity>
                                <Layout style={ styles.menuChildren }>
                                    <Avatar 
                                        size='giant'
                                        style={ styles.menuIcon }
                                        source={ require('../images/icons/icon_menu2.png') }
                                    />
                                    <Text>Library</Text>
                                </Layout>
                            </CustomTouchableOpacity>

                            <CustomTouchableOpacity onPress={ () => this.handleMenuNavigation(screens.TRANSACTION) }>
                                <Layout style={ styles.menuChildren }>
                                    <Avatar 
                                        size='giant'
                                        style={ styles.menuIcon }
                                        source={ require('../images/icons/icon_menu3.png') }
                                    />
                                    <Text>Transaction</Text>
                                </Layout>
                            </CustomTouchableOpacity>
                        </Layout>
                        
                    </Layout>
                    {/* Content menu - end */}

                    <Layout style={ styles.closeContainer }>
                        <Button 
                            appearance='ghost' 
                            icon={ CloseIcon }
                            onPress={ this.handleClose } 
                        />
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
        ...generalSty.mainContainer,
        alignItems: 'center',
    },

    titlePage: {
        ...generalSty.veryLargeText,
        ...generalSty.mlTop,
        ...generalSty.mlBottom,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subTitle: {
        ...generalSty.mlBottom,
        textAlign: 'center'
    },

    menuContainer: {
        ...generalSty.mlTop,
    },

    menuChildren: {
        alignItems: 'center'
    },

    menuRowContainer: {
        ...generalSty.mlBottom,
        ...generalSty.mlTop,
        ...generalSty.wf300,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    menuIcon: {
        ...generalSty.iconSizeLarge,
        ...generalSty.mmBottom
    },

    closeContainer: {
        position: 'absolute',
        bottom: 0,
        ...generalSty.plBottom
    },

});

export { TransactionMenuScreen };