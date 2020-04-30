import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Input, 
    TopNavigation, 
    TopNavigationAction, 
    Icon, 
    Button,
} from '@ui-kitten/components';
import { CustomStatusBar, SmallModal } from '../components/general';
import { generalSty } from '../styles'

/** import CRUD function */
import { dummyFunctionData, addPeriod } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

class SupportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSend: false, // Send state
            isLoading: false // Loading state
        }
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );
        
    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    };

    /** Handle save data */
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
    };

    /** Handle modal success save function  */
    handleModalSend = () => {
        this.setState({ isSend: false });
    };

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <TopNavigation 
                    title='Support'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Form - start */}
                    <Layout>
                        <Input
                            multiline={ true }
                            label='Critic and Sugestion'
                            labelStyle={ styles.labelStyle }
                            placeholder='e.g. Give us positive critic or sugestion.'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                    </Layout>
                    {/* Form - end */}

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSend } status='primary'>
                            SAVE
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

    input: {
        ...generalSty.mlBottom,
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    labelStyle: {
        ...generalSty.smallText,
        ...generalSty.black,
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black,
        textAlignVertical: 'top',
        minHeight: 150
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },
});

export { SupportScreen };