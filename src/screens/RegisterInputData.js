import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Input,
    Button 
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** Services and modules */
import { register, setUserData } from '../modules';

/** Redux */
import { connect } from 'react-redux';
import { rdxSetUserData } from '../store/actions';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class RegisterInputDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
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
    }

    /** To Main */
    toMain = () => {
        this.props.navigation.reset({
            routes: [{ name: 'MAIN' }]
        });
    }

    /** Hanlde register */
    handleRegister = () => {
        let data = {
            email: this.props.route.params.email,
            password: this.props.route.params.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        this.setState({ isSaved: true, isLoading: true }, () => {
            register(data)
            .then(response => {
                this.setState({ isSaved: false, isLoading: false });

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
                this.setState({ 
                    isLoading: false,
                    isResponseError: true,
                    responseTitle: error.message 
                });
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
                <TopNavigation
                    title='Input Data'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <Input 
                        style={ styles.input }
                        label='Fisrt Name'
                        labelStyle={ styles.inputTextStyle } 
                        placeholder='John'
                        autoCapitalize='words'
                        value={ this.state.firstName }
                        onChangeText={ text => this.setState({ firstName: text }) }
                    />
                    <Input 
                        style={ styles.input }
                        label='Last Name'
                        labelStyle={ styles.inputTextStyle } 
                        placeholder='Doe'
                        autoCapitalize='words'
                        value={ this.state.lastName }
                        onChangeText={ text => this.setState({ lastName: text }) }
                    />
                    <Button
                        style={ styles.button } 
                        onPress={ this.handleRegister } 
                        status='primary'
                    >
                        SIGN UP NOW
                    </Button>
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
        ...generalSty.mainContainer
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    input: {
        ...generalSty.mlBottom
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onRdxSetUserData: (data) => dispatch(rdxSetUserData(data))
    }
}

const rdxRegisterInputDataScreen = connect(null, mapDispatchToProps)(RegisterInputDataScreen);

export { rdxRegisterInputDataScreen as RegisterInputDataScreen };