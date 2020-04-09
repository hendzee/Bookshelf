import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Text, 
    Button, 
    Avatar 
} from '@ui-kitten/components';
import { generalSty, GREY } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, SmallModal } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

/** Chat icon */
const ChatIcon = () => (
    <Icon width={ 25 } height={ 25 } fill={ GREY } name='message-square' />
)

class CartConfirmationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSend: false,
            isLoading: false
        }
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Hanle send */
    handleSend = () => {
        this.setState({ isSend: true, isLoading: true }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 3000);
        });
    }

    /** Handle modal success save function  */
    handleModalSend = () => {
        this.setState({ isSend: false }, () => {
            this.toSelectMap();
        });
    };

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }

    /** Navigate to select map screen */
    toSelectMap = () => {
        this.props.navigation.navigate('SELECT_MAP');
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Confirmation'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        {/* User info content - start */}
                        <Layout style={ styles.topInfoContainer }>
                            <Layout style={ styles.userContainer }>
                                <Layout style={ styles.userImageContainer }>
                                    <Avatar
                                        size='giant'
                                        source={ require('../images/users/user4.png') }
                                    />
                                </Layout>
                                <Layout>
                                    <Text style={ styles.textBold }>Bryan Bottom</Text>
                                    <Text style={ styles.smallTextGrey }>ID: 311210045</Text>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.infoRightContainer }>
                                <CustomTouchableOpacity>
                                    <ChatIcon />
                                </CustomTouchableOpacity>
                            </Layout>
                        </Layout>
                        {/* User info content - end */}
                        
                        {/* Second info content - start */}
                        <Layout style={ styles.secondInfoContainer }>
                            <Layout style={ styles.secondInfoItem }>
                                <Layout>
                                    <Text style={ styles.secondInfoText }>
                                        ID
                                    </Text>
                                </Layout>
                                <Layout>
                                    <Text style={ styles.textBold }>
                                        # 35A107
                                    </Text>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.secondInfoItem }>
                                <Layout>
                                    <Text style={ styles.secondInfoText }>
                                        Status
                                    </Text>
                                </Layout>
                                <Layout style={ styles.badgeContainer }>
                                    <Text style={ styles.smallTextWhite }>
                                        Waiting Response
                                    </Text>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.secondInfoItem }>
                                <Layout>
                                    <Text style={ styles.secondInfoText }>
                                        Duration
                                    </Text>
                                </Layout>
                                <Text>7 days</Text>
                            </Layout>
                        </Layout>
                        {/* Second info content - end */}

                        {/* List item - start */}
                        <Layout style={ styles.listCardContainer }>
                            <Layout style={ styles.cardContainer }>
                                <Layout style={ styles.imageContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo1.jpeg') }
                                    />
                                </Layout>
                                <Layout style={ styles.infoContainer }>
                                    <Text style={ styles.textBold }>Green Ember</Text>
                                    <Text style={ styles.smallTextGrey }>Thomas Niels</Text>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.cardContainer }>
                                <Layout style={ styles.imageContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo1.jpeg') }
                                    />
                                </Layout>
                                <Layout style={ styles.infoContainer }>
                                    <Text style={ styles.textBold }>Green Ember</Text>
                                    <Text style={ styles.smallTextGrey }>Thomas Niels</Text>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.cardContainer }>
                                <Layout style={ styles.imageContainer }>
                                    <Image 
                                        style={ styles.imageCard }
                                        source={ require('../images/items/item_photo1.jpeg') }
                                    />
                                </Layout>
                                <Layout style={ styles.infoContainer }>
                                    <Text style={ styles.textBold }>Green Ember</Text>
                                    <Text style={ styles.smallTextGrey }>Thomas Niels</Text>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/* List item - end */}

                    </ScrollView>
                    <Layout style={ styles.bottomContent }>
                        <Button status='danger'>
                            REJECT REQUEST
                        </Button>
                        <Button onPress={ this.handleSend } style={ styles.mainButton }>
                            ACCEPT REQUEST
                        </Button>
                    </Layout>
                </Layout>
                
                {/* Modal when send request */}
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

    topInfoContainer: {
        ...generalSty.plBottom,
        ...generalSty.mlBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },

    userContainer: {
        flexDirection: 'row',
        flex: 6,
    },

    userImageContainer: {
        ...generalSty.mlRight
    },

    textBold: {
        fontWeight: 'bold'
    },

    infoRightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },

    secondInfoContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
    },

    secondInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...generalSty.mmBottom
    },

    secondInfoText: {
        ...generalSty.mmRight
    },

    badgeContainer: {
        ...generalSty.primaryBackground,
        ...generalSty.pmLeft,
        ...generalSty.pmRight,
        borderRadius: 5,
        alignSelf: 'baseline'
    },

    smallTextGrey: {
        ...generalSty.greyText,
        ...generalSty.smallText
    },

    smallTextWhite: {
        ...generalSty.whiteText,
        ...generalSty.smallText
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    listCardContainer: {
        ...generalSty.mlTop,
        ...generalSty.mlBottom,
        height: 460
    },

    cardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    imageContainer: {
        ...generalSty.mlRight
    },

    imageCard: {
        width: 60,
        height: 95,
        borderRadius: 3
    },

    infoContainer: {
        ...generalSty.mlRight
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

export { CartConfirmationScreen };