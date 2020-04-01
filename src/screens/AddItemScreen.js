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
    Select,
} from '@ui-kitten/components';
import { CustomStatusBar , CustomTouchableOpacity, SmallModal } from '../components/general';
import { generalSty } from '../styles'

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
);

const PlusIcon = () => (
    <Icon width={ 32 } height={ 32 } fill='#b2bec3' name='plus-circle-outline' />
);

const CloseIcon = () => (
    <Icon width={ 32 } height={ 32 } name='close-outline' />
);

class AddItemScreen extends Component {
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
                    <CustomTouchableOpacity>
                        <Layout style={ styles.imageUploadContainer }>
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

export { AddItemScreen };