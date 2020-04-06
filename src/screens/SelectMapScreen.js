import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { Layout, Icon, Button, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const CloseIcon = () => (
    <Icon width={ 25 } height={ 25 } name='close' />
)

class SelectMapScreen extends Component {
    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout>
                    <Image 
                        style={ styles.map }
                        source={ require('../images/others/map.png') }
                    />
                    <Layout style={ styles.backContainer }>
                        <CustomTouchableOpacity onPress={ this.handleBack }>
                            <CloseIcon />
                        </CustomTouchableOpacity>
                    </Layout>
                    <Layout style={ styles.bottomContainer }>
                        <Layout style={ styles.bottomMainContainer }>
                            <Input
                                label='Address'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='Address'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Input
                                label='Detail'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='Detail Address'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Button>
                                SAVE
                            </Button>
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

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    map: {
        width: '100%',
        height: '100%'
    },

    backContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        ...generalSty.greyBorder,
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        ...generalSty.plAll
    },

    bottomMainContainer: {
        ...generalSty.plAll,
        ...generalSty.allRadius
    },

    input: {
        ...generalSty.mlBottom
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },
});

export { SelectMapScreen };