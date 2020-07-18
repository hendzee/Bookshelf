import React, { Component } from 'react';
import { SafeAreaView, StyleSheet  } from 'react-native';
import { Layout, Icon, Text } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

/** SelectMapScreen substance components */
import { Map } from '../components/show_map_screen';

/** Redux */
import { connect } from 'react-redux';

const CloseIcon = () => (
    <Icon width={ 25 } height={ 25 } name='close' />
)

const ChatIcon = () => (
    <Icon width={ 25 } height={ 25 } name='message-square' />
)

class ShowMapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /** Handle back */
    handleBack = () => {
        if (!this.state.isResponseError) {
            this.props.navigation.goBack();
        }
    }

    /** To chat detail */
    toChatDetail = () => {
        this.props.navigation.navigate('CHAT_DETAIL')
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <Map
                    currentLatitude={ this.props.route.params.transaction.map_lat }
                    currentLongitude={ this.props.route.params.transaction.map_long } 
                    setLocationName='Location Name' 
                />

                <Layout style={ styles.topFloatContainer }>
                    <Layout style={ styles.topLeftContainer }>
                        <CustomTouchableOpacity onPress={ this.handleBack }>
                            <CloseIcon />
                        </CustomTouchableOpacity>
                    </Layout>
                    <Layout style={ styles.topRightContainer }>
                        <CustomTouchableOpacity onPress={ this.toChatDetail }>
                            <ChatIcon />
                        </CustomTouchableOpacity>
                    </Layout>
                </Layout>
                <Layout style={ styles.bottomContainer }>
                    <Layout style={ styles.bottomMainContainer }>
                        <Layout style={ styles.textInfoContainer }>
                            <Text style={ styles.textBold }>
                                { this.props.route.params.transaction.location_name }
                            </Text>
                            <Text>
                                { '*Note: ' + this.props.route.params.transaction.map_note }
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        ...generalSty.full
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    map: {
        width: '100%',
        height: '100%'
    },

    topFloatContainer: {
        position: 'absolute',
        top: 20,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        justifyContent: 'space-between',
        ...generalSty.plAll
    },

    topLeftContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topRightContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        ...generalSty.plAll
    },

    bottomMainContainer: {
        ...generalSty.plAll,
        ...generalSty.allRadius
    },

    textInfoContainer: {
        ...generalSty.mmBottom
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },

    textBold: {
        ...generalSty.mlBottom,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxShowMapScreen = connect(mapStateToProps)(ShowMapScreen);

export { rdxShowMapScreen as ShowMapScreen };