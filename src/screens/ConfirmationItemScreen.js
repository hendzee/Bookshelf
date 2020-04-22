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

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class ConfirmationItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isConfirm: false
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
        this.setState({ isConfirm: true, isLoading: true }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 3000);
        });
    }

    /** Handle confirm modal button */
    handleModalConfirm = () => {
        this.setState({ isConfirm: false, isLoading: false }, () => {
            this.toMainPage();
        });
    }

    /** to main page */
    toMainPage = () => {
        this.props.navigation.navigate('MAIN');
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
                        {/* Item list - start */}
                        <Layout>
                            <Layout style={ styles.listItemContainer }>
                                <Layout style={ styles.cardContainer }>
                                    <Layout style={ styles.imageContainer }>
                                        <Image 
                                            style={ styles.imageCard }
                                            source={ require('../images/items/item_photo1.jpeg') }
                                        />
                                    </Layout>
                                    <Layout style={ styles.infoContainer }>
                                        <Text style={ styles.titleItem }>Green Ember</Text>
                                        <Text style={ styles.infoItem }>Thomas Niels</Text>
                                    </Layout>
                                </Layout>

                                <Layout>
                                    <CheckBox>
                                    </CheckBox>
                                </Layout>
                            </Layout>
                            
                            <Layout style={ styles.listItemContainer }>
                                <Layout style={ styles.cardContainer }>
                                    <Layout style={ styles.imageContainer }>
                                        <Image 
                                            style={ styles.imageCard }
                                            source={ require('../images/items/item_photo1.jpeg') }
                                        />
                                    </Layout>
                                    <Layout style={ styles.infoContainer }>
                                        <Text style={ styles.titleItem }>Green Ember</Text>
                                        <Text style={ styles.infoItem }>Thomas Niels</Text>
                                    </Layout>
                                </Layout>

                                <Layout>
                                    <CheckBox>
                                    </CheckBox>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/* Item list - end */}
                    </ScrollView>

                    <Layout style={ styles.bottomContent }>
                        <Button onPress={ this.handleConfirmation }>
                            SEND REQUEST
                        </Button>
                    </Layout>
                </Layout>

                {/* Modal when save confirm item */}
                <SmallModal
                    title='Items confirmed.' 
                    icon='checkmark-circle-outline'
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