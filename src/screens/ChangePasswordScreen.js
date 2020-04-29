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
import { CustomStatusBar , SmallModal } from '../components/general';
import { generalSty, GREY } from '../styles'
import { setSecureInput } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const EyeIcon = () => (
    <Icon fill={ GREY } name='eye-outline'/>
);

const EyeOffIcon = () => (
    <Icon fill={ GREY } name='eye-off-outline'/>
);

class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** Complete save */
            isSaved: false,
            isLoading: false,
            isSecureInput: [
                true, // Secure input for current password (index 0)
                true // Secure input for new password (index 1)
            ]
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
    handleSave = () => {
        this.setState({ isSaved: true, isLoading: true }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 2000);
        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false });
    };

    /** Handle secure text */
    handleSecureText = (selectedIndex) => {
        this.setState({ 
            isSecureInput: setSecureInput(this.state.isSecureInput, selectedIndex) 
        });
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <TopNavigation 
                    title='Change Password'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Form - start */}
                    <Layout>
                        <Input
                            icon={ this.state.isSecureInput[0] ? EyeIcon : EyeOffIcon }
                            onIconPress={ () => this.handleSecureText(0) }
                            secureTextEntry={ this.state.isSecureInput[0] }
                            label='Current Password'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. Current password'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                        <Input
                            icon={ this.state.isSecureInput[1] ? EyeIcon : EyeOffIcon }
                            onIconPress={ () => this.handleSecureText(1) }
                            secureTextEntry={ this.state.isSecureInput[1] }
                            label='New Password'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. New password'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                    </Layout>
                    {/* Form - end */}

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSave } status='primary'>
                            SAVE
                        </Button>
                    </Layout>
                </Layout>
                
                {/* Modal when save complete */}
                <SmallModal
                    title='Password saved.' 
                    icon='checkmark-circle-outline'
                    onPress={ this.handleModalSave } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSaved } 
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
        ...generalSty.mlBottom
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },
});

export { ChangePasswordScreen };