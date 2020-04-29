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
import { generalSty, GREY, YELLOW } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, SmallModal } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const StarIcon = () => (
    <Icon width={ 15 } height={ 15 } fill={ YELLOW } name='star' />
)

/** Chat icon */
const ChatIcon = (style) => (
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
            }, 2000);
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
                            <Layout style={ styles.topInfoItem }>
                                <Layout style={ styles.userContainer }>
                                    <Layout style={ styles.userImageContainer }>
                                        <Avatar source={ require('../images/users/user4.png') }/>
                                    </Layout>
                                    <Layout>
                                        <Text style={ styles.textBold }>Bryan Bottom</Text>
                                        <Layout style={ styles.topSecondInfo }>
                                            <StarIcon />
                                            <Text style={ styles.smallTextGrey }>4.3</Text>
                                        </Layout>
                                    </Layout>
                                </Layout>
                                <Layout style={ styles.infoRightContainer }>
                                    <CustomTouchableOpacity>
                                        <ChatIcon />
                                    </CustomTouchableOpacity>
                                </Layout>
                            </Layout>
                            <Layout style={ styles.topInfoItem }>
                                <Layout style={ styles.userContainer }>
                                    <Layout style={ styles.userImageContainer }>
                                        <Avatar source={ require('../images/users/user1.png') } />
                                    </Layout>
                                    <Layout>
                                        <Text style={ styles.textBold }>Rachel Linda</Text>
                                        <Layout style={ styles.topSecondInfo }>
                                            <StarIcon />
                                            <Text style={ styles.smallTextGrey }>4.7</Text>
                                            <Layout style={ styles.badgePrimary }>
                                                <Text style={ styles.smallTextWhite }>Owner</Text>
                                            </Layout>
                                        </Layout>
                                    </Layout>
                                </Layout>
                                <Layout style={ styles.infoRightContainer }>
                                    <CustomTouchableOpacity>
                                        <ChatIcon />
                                    </CustomTouchableOpacity>
                                </Layout>
                            </Layout>
                        </Layout>
                        {/* User info content - end */}
                        
                        {/* Second info content - start */}
                        <Layout style={ styles.secondInfoContainer }>
                            <Layout style={ styles.secondInfoItemContainer }>
                                <Text style={ styles.smallText }>ID</Text>
                                <Text style={ styles.textBold }>350A12Z</Text>
                            </Layout>
                            <Layout style={ styles.secondInfoItemContainer }>
                                <Text style={ styles.smallText }>Status</Text>
                                <Text style={ styles.smallText }>Waiting Response</Text>
                            </Layout>
                            <Layout style={ styles.secondInfoItemContainer }>
                                <Text style={ styles.smallText }>Duration</Text>
                                <Text style={ styles.smallText }>7 Days</Text>
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
                                    <Text style={ styles.titleItem }>Green Ember</Text>
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
                                    <Text style={ styles.titleItem }>Green Ember</Text>
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
                                    <Text style={ styles.titleItem }>Green Ember</Text>
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
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
    },

    topInfoItem: {
        flexDirection: 'row',
        ...generalSty.mmBottom
    },

    userContainer: {
        flexDirection: 'row',
        flex: 6,
    },

    userImageContainer: {
        ...generalSty.mlRight
    },

    textBold: {
        fontWeight: 'bold',
    },

    badgePrimary: {
        ...generalSty.primaryBackground,
        ...generalSty.pmLeft,
        ...generalSty.pmRight,
        ...generalSty.mmLeft,
        alignSelf: 'baseline',
        borderRadius: 3,
        paddingVertical: 0.5,
    },

    smallTextWhite: {
        fontSize: 10,
        letterSpacing: 0.5,
        ...generalSty.white
    },

    topSecondInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    infoRightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },

    secondInfoContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1
    },

    smallTextGrey: {
        ...generalSty.greyText,
        ...generalSty.smallText
    },

    smallText: {
        ...generalSty.smallText
    },

    secondInfoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...generalSty.mmBottom
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

    titleItem: {
        fontWeight: 'bold'
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