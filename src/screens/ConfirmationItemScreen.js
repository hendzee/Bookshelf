import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Text,
    CheckBox,
    Button
} from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, SmallModal } from '../components/general';

/** import CRUD function */
import { dummyFunctionData, addPeriod } from '../modules';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class ConfirmationItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxItems: [], // Checkbox items
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isLoading: false, // Loading state
            isConfirm: false // Confirmation state
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

    /** Handle confirmation */
    handleConfirmation = () => {
        this.setState({ isLoading: true, isConfirm: true }, () => {
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
    }

    /** Handle confirm modal button */
    handleModalConfirm = () => {
        if (this.state.checkboxItems.length < 1) {
            alert('Minimal item must be 1.')
        }else {
            this.setState({ isConfirm: false, isLoading: false }, () => {
                this.toMainPage();
            });
        }
    }

    /** to main page */
    toMainPage = () => {
        this.props.navigation.navigate('MAIN');
    }

    /** Extract data */
    extractData = () => {
        return this.props.route.params.loans.map((item, index) => (
            <Layout
                key={ index } 
                style={ styles.listItemContainer }
            >
                <Layout style={ styles.cardContainer }>
                    <Layout style={ styles.imageContainer }>
                        <Image 
                            style={ styles.imageCard }
                            source={{ uri: item.items.cover }}
                        />
                    </Layout>
                    <Layout style={ styles.infoContainer }>
                        <Text style={ styles.titleItem }>
                            { item.items.title }
                        </Text>
                        <Text style={ styles.infoItem }>
                            { item.items.author }
                        </Text>
                    </Layout>
                </Layout>

                <Layout>
                    <CheckBox
                        checked={ this.setActiveCheckbox(item.items.id) } 
                        onChange={(_) => this.handleCheckbox(item.items.id) } 
                    >
                    </CheckBox>
                </Layout>
            </Layout>
        ));
    }

    /** Handle Checkbox */
    handleCheckbox = (key) => {
        let tempCheckboxList = this.state.checkboxItems;

        if (tempCheckboxList.includes(key)) {
            tempCheckboxList.splice( tempCheckboxList.indexOf(key) , 1);
        }else {
            tempCheckboxList.push(key)
        }

        this.setState({ checkboxItems: tempCheckboxList });
    }

    /** Set active checkbox */
    setActiveCheckbox = (key) => {
        if (this.state.checkboxItems.includes(key)){
            return true;
        }

        return false;
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Confirmation Book'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />
                
                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                       { this.extractData() }
                    </ScrollView>

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleConfirmation }>
                            CONFIRM
                        </Button>
                    </Layout>
                </Layout>

                {/* Modal when save confirm item */}
                <SmallModal
                    title={ this.state.responseTitle }
                    isResponseError={ this.state.isResponseError }
                    onPress={ this.handleModalConfirm } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isConfirm } 
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

    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    cardContainer: {
        flexDirection: 'row',
    },

    imageContainer: {
        ...generalSty.mlRight
    },

    infoContainer: {
        ...generalSty.mlRight
    },

    imageCard: {
        width: 60,
        height: 95,
        borderRadius: 3
    },

    titleItem: {
        fontWeight: 'bold'
    },

    infoItem: {
        ...generalSty.smallText,
        ...generalSty.greyText,
    },

    bottomContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...generalSty.plAll,
    },
});

export { ConfirmationItemScreen };