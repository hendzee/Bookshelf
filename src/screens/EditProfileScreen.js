import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { 
    Layout, 
    Input, 
    Text, 
    TopNavigation, 
    TopNavigationAction, 
    Icon, 
    Button,
    Avatar
} from '@ui-kitten/components';
import { CustomStatusBar , CustomTouchableOpacity, SmallModal } from '../components/general';
import { generalSty } from '../styles'

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const CameraIcon = (props) => (
    <Icon width={ 30 } height={ 30 } name='camera-outline'/>
);

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** Complete save */
            isSaved: false,
            isLoading: false
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
            }, 3000);
        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false }, () => {
            this.handleBack();
        });
    };

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <TopNavigation 
                    title='Edit Profile'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Photo profile content - start */}
                    <Layout style={ styles.photoContainer }>
                        <Layout>
                            <Avatar 
                                size='giant'
                                style={ styles.userImage }
                                source={ require('../images/users/user1.png') } 
                            />
                            <Layout style={ styles.cameraButtonContainer }>
                                <Button 
                                    appearance='ghost' 
                                    icon={ CameraIcon }
                                    size='tiny' 
                                />
                            </Layout>
                        </Layout>
                    </Layout>
                    {/* Photo profile content - end */}

                    {/* Form - start */}
                    <Layout>
                        <Input
                            label='Name'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. The Design of Everyday Think'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                        <Input
                            label='Email'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. john_doe@gmail.com'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                        <Input
                            label='Phone'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. 08123380897'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />
                    </Layout>
                    {/* Form - end */}

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSave } status='primary'>
                            UPDATE
                        </Button>
                    </Layout>
                </Layout>
                
                {/* Modal when save complete */}
                <SmallModal
                    title='Congrats! your book have been saved.' 
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

    photoContainer: {
        alignItems: 'center',
        ...generalSty.mlBottom
    },

    userImage: {
        ...generalSty.iconSizeLarge,
        ...generalSty.mlBottom
    },

    cameraButtonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 10
    },

    cameraIcon: {
        width: 30,
        height: 30,
        ...generalSty.sofyGreyBackground,
        ...generalSty.allRadius
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

    imageUploadContainer: {
        ...generalSty.hf150,
        width: '100%',
        backgroundColor: '#dfe6e9',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export { EditProfileScreen };