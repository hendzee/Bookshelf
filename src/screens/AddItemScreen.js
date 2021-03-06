import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Keyboard, ScrollView } from 'react-native';
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
import { 
    CustomStatusBar , 
    CustomTouchableOpacity, 
    SmallModal,
    SelectModal,
    CustomDatePicker,
} from '../components/general';
import { generalSty, WHITE } from '../styles'
import ImagePicker from 'react-native-image-crop-picker';

/** import CRUD function */
import { getCategory, addItem } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const PlusIcon = () => (
    <Icon width={ 32 } height={ 32 } fill={ WHITE } name='plus-circle-outline' />
);

class AddItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            categories: [], // Categories list for selected input
            category: {},
            title: '',
            author: '',
            publishDate: '',
            showDatePicker: false,
            cover: null,
            selectedImagePath: null, // Selected image uri
            isPickImage: false,
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Save state
            isLoading: false // Loading state
        }
    }

    async componentDidMount() {
        let categories = await getCategory();
        this.setState({ 
            userId: this.props.auth.id,
            categories: categories.data, 
            category: categories.data[0] 
        });
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
            let data = {
                userId: this.state.userId,
                category: this.state.category,
                title: this.state.title,
                author: this.state.author,
                publishDate: this.state.publishDate,
                cover: this.state.cover
            }

            addItem(data, this.props.auth.token)
                .then(result => {
                    this.setState({ isLoading: false, responseTitle: result.message });
                })
                .catch(error => {
                    this.setState({ isLoading: false, responseTitle: error.message });
                });

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
        this.setState({ isPickImage: false }, () => {
            ImagePicker.openCamera({
                width: 200,
                height: 290
            }).then(
                image => {
                    this.setState({
                        cover: image, 
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
                        cover: image, 
                        selectedImagePath: image.path 
                    });
                }
            )
        });
    }

    /** Handle picker menu */
    handlePickerMenu = () => {
        if (!this.state.isPickImage) {
            this.setState({ isPickImage: true });
        }else {
            this.setState({ isPickImage: false });
        }
    }

    /** Handle date picker popup */
    handleDatePicker = () => {
        this.setState({ showDatePicker: true });
        Keyboard.dismiss();
    }

    /** Set date state */
    setDate = (isSet, date) => {
        if (isSet) {
            this.setState({
                publishDate: date,
                showDatePicker: false
            })
        } else {
            this.setState({
                showDatePicker: false
            });
        }
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
                    <ScrollView showsVerticalScrollIndicator={ false }>

                        {/* Form - start */}
                        <Layout>
                            <Input
                                label='Title'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='e.g. The Design of Everyday Think'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                                autoCapitalize='words'
                                value={ this.state.title }
                                onChangeText={ (text) => this.setState({ title: text }) }
                            />

                            <Input
                                label='Author'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='e.g. John Doe'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                                value={ this.state.author }
                                onChangeText={ (text) => this.setState({ author: text }) }
                            />

                            <CustomTouchableOpacity onPress={ this.handleDatePicker } >
                                <Input
                                    label='Publication Year'
                                    labelStyle={ styles.inputTextStyle }
                                    placeholder='e.g. 2010'
                                    textStyle={ styles.inputTextStyle }
                                    style={ styles.input }
                                    value={ this.state.publishDate }
                                    onChangeText={ (text) => this.setState({ publishDate: text }) }
                                    disabled
                                />
                            </CustomTouchableOpacity>

                            <Select
                                label='Category'
                                labelStyle={ styles.inputTextStyle }
                                data={ this.state.categories }
                                style={ styles.input }
                                selectedOption={ this.state.category }
                                onSelect={ (selected) => this.setState({ category: selected }) }
                            />

                        </Layout>
                        {/* Form - end */}

                        <Text style={ styles.inputTextStyle }>Book Cover</Text>
                        <CustomTouchableOpacity
                            onPress={ this.handlePickerMenu } 
                            style={ styles.imageUploadContainer }
                        >
                            <Layout style={ styles.selectedImageContainer }>
                                <Image  
                                    style={ styles.image }
                                    source={{ uri: this.state.selectedImagePath }}
                                />
                            </Layout>
                            { PlusIcon() }
                        </CustomTouchableOpacity>

                        <Button onPress={ this.handleSave } status='primary'>
                            SAVE
                        </Button>
                    </ScrollView>
                </Layout>
                
                {/* Modal when saved */}
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

                {/* Date time picker modal */}
                <CustomDatePicker 
                    show={ this.state.showDatePicker }
                    setDate={ this.setDate } 
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
        ...generalSty.mlBottom,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxAddItemScreen = connect(mapStateToProps)(AddItemScreen);

export { rdxAddItemScreen as AddItemScreen };