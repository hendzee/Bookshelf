import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { 
    Layout, 
    Input, 
    TopNavigation, 
    TopNavigationAction, 
    Icon, 
    Button,
    Avatar
} from '@ui-kitten/components';
import { CustomStatusBar , CustomTouchableOpacity, SmallModal, SelectModal } from '../components/general';
import { generalSty } from '../styles'
import ImagePicker from 'react-native-image-crop-picker';

/** Services and modules */
import { updateProfileData } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const CameraIcon = () => (
    <Icon width={ 15 } height={ 15 } name='camera-outline'/>
);

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.auth.id,
            firstName: this.props.route.params.profileData.first_name,
            lastName: this.props.route.params.profileData.last_name,
            email: this.props.route.params.profileData.email,
            phone: this.props.route.params.profileData.phone,
            photo: null,
            selectedImagePath: this.props.route.params.profileData.photo,
            isPickImage: false,
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Saved state
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

    /** Handle picker menu */
    handlePickerMenu = () => {
        if (!this.state.isPickImage) {
            this.setState({ isPickImage: true });
        }else {
            this.setState({ isPickImage: false });
        }
    }

    /** Open camera */
    openCamera = () => {
        this.setState({ isPickImage: false }, () => {
            ImagePicker.openCamera({
                width: 200,
                height: 290
            }).then(
                image => {
                    this.setState({
                        photo: image, 
                        selectedImagePath: image.path 
                    });
                }
            )
        });
    }

    /** Open Image picker */
    openPicker = () => {
        this.setState({ isPickImage: false }, () => {
            ImagePicker.openPicker({
                width: 200,
                height: 290
            }).then(
                image => {
                    this.setState({
                        photo: image, 
                        selectedImagePath: image.path 
                    });
                }
            )
        });
    }

    /** Handle save data */
    handleSave = () => {
        let data = {
            id: this.state.id,
            email: this.state.email,
            phone: this.state.phone,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            photo: this.state.photo
        }

        this.setState({ isLoading: true, isSaved: true }, () => {
            updateProfileData(data, this.props.auth.token)
            .then(response => {
                this.setState({ 
                    isLoading: false, 
                    responseTitle: response.message,
                    isResponseError: false
                });
            })
            .catch(error => {
                this.setState({ 
                    isLoading: false,
                    responseTitle: error.message,
                    isResponseError: true
                });
            })
        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false });
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
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        {/* Photo profile content - start */}
                        <Layout style={ styles.photoContainer }>
                            <Layout>
                                <Avatar 
                                    size='giant'
                                    style={ styles.userImage }
                                    source={{ uri: this.state.selectedImagePath }} 
                                />
                                <Layout style={ styles.cameraButtonContainer }>
                                    <CustomTouchableOpacity onPress={ this.handlePickerMenu }>
                                        <Layout style={ styles.cameraIcon }>
                                            <CameraIcon />
                                        </Layout>
                                    </CustomTouchableOpacity>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/* Photo profile content - end */}

                        {/* Form - start */}
                        <Layout>
                            <Input
                                label='First Name'
                                labelStyle={ styles.inputTextStyle }
                                value={ this.state.firstName }
                                placeholder='e.g. John Doe'
                                onChangeText={ text => { this.setState({ firstName: text }) }}
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Input
                                label='Last Name'
                                labelStyle={ styles.inputTextStyle }
                                value={ this.state.lastName }
                                placeholder='e.g. John Doe'
                                onChangeText={ text => { this.setState({ lastName: text }) }}
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Input
                                label='Email'
                                labelStyle={ styles.inputTextStyle }
                                value={ this.state.email }
                                placeholder='e.g. john_doe@gmail.com'
                                onChangeText={ text => { this.setState({ email: text }) }}
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Input
                                label='Phone'
                                labelStyle={ styles.inputTextStyle }
                                value={ this.state.phone }
                                placeholder='e.g. 081xxx'
                                onChangeText={ text => { this.setState({ phone: text }) }}
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                                keyboardType='phone-pad'
                            />

                            <Button onPress={ this.handleSave } status='primary'>
                                SAVE
                            </Button>
                        </Layout>
                        {/* Form - end */}
                    </ScrollView>
                </Layout>
                
                {/* Modal when save complete */}
                <SmallModal
                    title={ this.state.responseTitle } 
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSave } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSaved } 
                />

                {/* Modal to choose image */}
                <SelectModal 
                    visible={ this.state.isPickImage }
                    onCancel={ this.handlePickerMenu }
                    list={[
                        {
                            title: 'Open Camera',
                            action: this.openCamera
                        },
                        {
                            title: 'Select Image from Gallery',
                            action: this.openPicker
                        }
                    ]}
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
        bottom: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },

    cameraIcon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
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
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxEditProfileScreen = connect(mapStateToProps)(EditProfileScreen);

export { rdxEditProfileScreen as EditProfileScreen };