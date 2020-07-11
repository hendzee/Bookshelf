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
import { setSecureInput, login, setUserData, getUserData } from '../modules';

/** Redux */
import { connect } from 'react-redux';
import { rdxSetUserData } from '../store/actions';

const EyeIcon = () => (
    <Icon fill={ GREY } name='eye-outline'/>
);

const EyeOffIcon = () => (
    <Icon fill={ GREY } name='eye-off-outline'/>
);

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    /** Set user data */
    setUserData = () => {
        let data = {
            id: '1',
            token: '730dksf92kdf.hsd9fhasd02ks3kd'
        };

        getUserData();
    }

    /** To Main */
    toMain = () => {
        this.props.navigation.navigate('MAIN');
    }

    /** Hanlde login */
    handleLogin = () => {
        let data = {
            email: 'ypudjiastuti@utami.net',
            password: 'password123'
        }

        login(data)
            .then(response => {
                let storeData = {
                    id: response.data.id,
                    token: response.data.token
                }

                /** Save on redux userdata */
                this.props.onRdxSetUserData(storeData);

                setUserData(storeData)
                    .then(_ => {
                        this.toMain();
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            })
            .catch(error => {
                alert(error.message)
            })
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout style={ styles.mainContainer }>
                    <Layout style={ styles.mainTitleContainer }>
                        <Text style={ styles.mainTitle } status='primary'>
                            Login
                        </Text>
                    </Layout>
                    <Input 
                        style={ styles.input }
                        label='Email'
                        labelStyle={ styles.inputTextStyle } 
                        placeholder='johndoe@gmail.com' 
                    />
                    <Input 
                        style={ styles.input }
                        label='Password'
                        labelStyle={ styles.inputTextStyle }
                        icon={ this.state.isSecureInput[0] ? EyeIcon : EyeOffIcon }
                        onIconPress={ () => this.handleSecureText(0) }
                        secureTextEntry={ this.state.isSecureInput[0] }
                    />
                    <Button
                        style={ styles.button } 
                        onPress={ this.handleLogin } 
                        status='primary'
                    >
                        LOGIN
                    </Button>
                    <Layout>
                        <Text style={ styles.bottomText }>
                            Dont have account ? 
                            <Text
                                onPress={ () => alert('GO to Sign UP') } 
                                style={ styles.bold }
                            >
                                { ' ' + 'Sign Up' }
                            </Text>
                        </Text>
                    </Layout>
                </Layout>

                {/* Modal when saved */}
                <SmallModal
                    title={ this.state.responseTitle }
                    isError={ this.state.isResponseError }
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

const mapDispatchToProps = dispatch => {
    return {
        onRdxSetUserData: (data) => dispatch(rdxSetUserData(data))
    }
}

const rdxLoginScreen = connect(null, mapDispatchToProps)(LoginScreen);

export { rdxLoginScreen as LoginScreen };