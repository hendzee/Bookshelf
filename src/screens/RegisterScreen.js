import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    Input, 
    Text,
    Button
} from '@ui-kitten/components';
import { generalSty, GREY } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** Functions */
import { setSecureInput, checkUser } from '../modules';

const EyeIcon = () => (
    <Icon fill={ GREY } name='eye-outline'/>
);

const EyeOffIcon = () => (
    <Icon fill={ GREY } name='eye-off-outline'/>
);

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isSecureInput: [ true ], // Secure input for current password (index 0)
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
            isLoading: false // Loading state
        }
    }

    /** Handle secure text */
    handleSecureText = (selectedIndex) => {
        this.setState({ 
            isSecureInput: setSecureInput(this.state.isSecureInput, selectedIndex) 
        });
    }

    /** Back to login */
    backToLogin = () => {
        this.props.navigation.goBack();
    }

    /** To input data */
    toInputData = () => {
        this.props.navigation.navigate('REGISTER_INPUT_DATA', {
            email: this.state.email,
            password: this.state.password
        });
    }

    /** CheckUser */
    handleCheckUser = () => {
        this.setState({ isSaved: true, isLoading: true }, () => {
            checkUser(this.state.email)
            .then(_ => {
                this.setState({ isSaved: false, isLoading: false })
                this.toInputData();
            })
            .catch(error => {
                this.setState({ 
                    isLoading: false,
                    isResponseError: true,
                    responseTitle: error.message  
                })
            })
        }) 
    }

    /** Submit modal */
    submitModal = () => {
        this.setState({ isSaved: false })
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    <Layout style={ styles.mainTitleContainer }>
                        <Text style={ styles.mainTitle } status='primary'>
                            Sign Up
                        </Text>
                    </Layout>
                    <Input 
                        style={ styles.input }
                        label='Email'
                        labelStyle={ styles.inputTextStyle } 
                        placeholder='johndoe@gmail.com'
                        autoCapitalize='none'
                        value={ this.state.email }
                        onChangeText={ text => this.setState({ email: text.toLocaleLowerCase() }) }
                    />
                    <Input 
                        style={ styles.input }
                        label='Password'
                        labelStyle={ styles.inputTextStyle }
                        icon={ this.state.isSecureInput[0] ? EyeIcon : EyeOffIcon }
                        onIconPress={ () => this.handleSecureText(0) }
                        secureTextEntry={ this.state.isSecureInput[0] }
                        value={ this.state.password }
                        onChangeText={ text => this.setState({ password: text }) }
                    />
                    <Button
                        style={ styles.button } 
                        onPress={ this.handleCheckUser } 
                        status='primary'
                    >
                        NEXT
                    </Button>
                    <Layout>
                        <Text style={ styles.bottomText }>
                            Already have account ? 
                            <Text
                                onPress={ () => this.backToLogin() } 
                                style={ styles.bold }
                            >
                                { ' ' + 'Login' }
                            </Text>
                        </Text>
                    </Layout>
                </Layout>

                {/* Modal when saved */}
                <SmallModal
                    title={ this.state.responseTitle }
                    isError={ this.state.isResponseError }
                    onPress={ this.submitModal } 
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
        ...generalSty.mainContainer,
        paddingTop: '30%'
    },

    mainTitleContainer: {
        marginTop: 20,
        alignItems: 'center',
        ...generalSty.mlBottom
    },

    mainTitle: {
        fontSize: 40,
        height: 60,
        justifyContent: 'flex-start',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },

    input: {
        ...generalSty.mlBottom
    },

    button: {
        ...generalSty.mlBottom
    },

    bottomText: {
        textAlign: 'center'
    },

    bold: {
        fontWeight: 'bold'
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },
});

export { RegisterScreen };