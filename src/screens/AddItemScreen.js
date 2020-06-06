import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { 
    Layout, 
    Input, 
    Text, 
    TopNavigation, 
    TopNavigationAction, 
    Icon, 
    Button,
    Select,
} from '@ui-kitten/components';
import { CustomStatusBar , CustomTouchableOpacity, SmallModal } from '../components/general';
import { generalSty } from '../styles'
import ImagePicker from 'react-native-image-crop-picker';

/** import CRUD function */
import { dummyFunctionData, addPeriod } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const PlusIcon = () => (
    <Icon width={ 32 } height={ 32 } fill='#b2bec3' name='plus-circle-outline' />
);

class AddItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImagePath: null, // Selected image uri
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
    };

    /** Handle save data */
    handleSave = () => {
        this.setState({ isLoading: true, isSaved: true }, () => {
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
    handleModalSave = () => {
        this.setState({ isSaved: false }, () => {
            this.handleBack();
        });
    };

    /** Open camera */
    openCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 290
        }).then(
            image => {
                this.setState({ selectedImagePath: image.path });
            }
        )
    }

    /** Open Image picker */
    openPicker = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 290
        }).then(
            image => {
                this.setState({ selectedImagePath: image.path });
            }
        )
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <TopNavigation 
                    title='Add Book'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Form - start */}
                    <Layout>
                        <Input
                            label='Title'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. The Design of Everyday Think'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />

                        <Input
                            label='Author'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. John Doe'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />

                        <Input
                            label='Publication Year'
                            labelStyle={ styles.inputTextStyle }
                            placeholder='e.g. 2010'
                            textStyle={ styles.inputTextStyle }
                            style={ styles.input }
                        />

                        <Select
                            label='Category'
                            labelStyle={ styles.inputTextStyle }
                            data={[
                                { text: 'Biography' },
                                { text: 'IT' }
                            ]}
                            style={ styles.input }
                        />

                    </Layout>
                    {/* Form - end */}

                    <Text style={ styles.inputTextStyle }>Book Cover</Text>
                    <CustomTouchableOpacity onPress={ this.openPicker }>
                        <Layout style={ styles.imageUploadContainer }>
                            <Layout style={ styles.selectedImageContainer }>
                                <Image  
                                    style={ styles.image }
                                    source={{ uri: this.state.selectedImagePath }}
                                />
                            </Layout>
                            { PlusIcon() }
                        </Layout>
                    </CustomTouchableOpacity>

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleSave } status='primary'>
                            SAVE
                        </Button>
                    </Layout>
                </Layout>
                
                {/* Modal when save complete */}
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

    selectedImageContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        ...generalSty.allRadius,
        ...generalSty.sofyGreyBackground
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        ...generalSty.allRadius,
    },

    imageUploadContainer: {
        ...generalSty.hf150,
        ...generalSty.w110,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export { AddItemScreen };