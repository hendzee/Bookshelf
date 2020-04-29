import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Text, 
    Select, 
    Button 
} from '@ui-kitten/components';
import { generalSty, GREY } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, SmallModal } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const RemoveIcon = () => (
    <Icon width={ 25 } height={ 25 } fill={ GREY } name='close-circle' />
)

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSend: false
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

    /** Handle send request */
    handleSend = () => {
        this.setState({ isSend: true, isLoading: true }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 2000);
        });
    }

    /** Handle sending modal button */
    handleModalSend = () => {
        this.setState({ isSend: false, isLoading: false });
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Request List'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    {/* Duration content - start */}
                    <Layout style={ styles.durationContainer }>
                        <Select
                            label='Duration'
                            labelStyle={ styles.inputTextStyle }
                            data={[
                                { text: '3 Days' },
                                { text: '1 weeks' },
                                { text: '3 Week' }
                            ]}
                            style={ styles.input }
                        />
                    </Layout>
                    {/* Duration content - end */}
                    
                    {/* List item - start */}
                    <Layout style={ styles.listCardContainer }>
                        <ScrollView showsVerticalScrollIndicator={ false }>
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
                                <Layout style={ styles.removeContainer }>
                                    <CustomTouchableOpacity>
                                        <RemoveIcon />
                                    </CustomTouchableOpacity>
                                </Layout>
                            </Layout>
                        </ScrollView>
                    </Layout>
                    {/* List item - end */}
                    
                    <Layout style={ styles.bottomContent }>
                        <Button status='basic'>
                            ADD LIST MORE
                        </Button>
                        <Button onPress={ this.handleSend } style={ styles.mainButton }>
                            SEND REQUEST
                        </Button>
                    </Layout>
                </Layout>

                {/* Modal when save complete */}
                <SmallModal
                    title='Your request was sent.' 
                    icon='checkmark-circle-outline'
                    onPress={ this.handleModalSend } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSend } 
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

    topInfoContainer: {
        ...generalSty.mlBottom
    },

    durationContainer: {
        ...generalSty.mlBottom
    },

    listCardContainer: {
        ...generalSty.mlTop,
        ...generalSty.mlBottom,
        height: 460
    },

    highlightText: {
        fontWeight: 'bold',
    },

    greyText: {
        ...generalSty.smallText,
        ...generalSty.greyText
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },

    cardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    imageContainer: {
        flex: 2,
        ...generalSty.mlRight
    },

    infoContainer: {
        flex: 6,
        ...generalSty.mlRight
    },

    removeContainer: {
        flex: 1,
        alignItems: 'flex-end',
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

    mainButton: {
        ...generalSty.mlTop
    }
});

export { CartScreen };