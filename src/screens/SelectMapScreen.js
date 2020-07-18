import React, { Component } from 'react';
import { SafeAreaView, StyleSheet  } from 'react-native';
import { Layout, Icon, Button, Input, Text } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, SmallModal } from '../components/general';

/** SelectMapScreen substance components */
import { InfoModal, Map } from '../components/select_map_screen';

/** import CRUD and other function */
import { updateMap, getUserLocation, getLocationName } from '../modules';

/** Redux */
import { connect } from 'react-redux';

const CloseIcon = () => (
    <Icon width={ 25 } height={ 25 } name='close' />
)

const ChatIcon = () => (
    <Icon width={ 25 } height={ 25 } name='message-square' />
)

class SelectMapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            isCurrentUserSet: false, // Map component waiting this until get user location
            currentLatitude: 0, // Current user latitude
            currentLongitude: 0, // Current user longitude
            locationName: '', // Location name
            responseTitle: '', // Response title / message
            isResponseError: false, // Response error
            isSaved: false, // Saved state
            isLoading: false, // Loading state
        }
    }

    componentDidMount() {
        getUserLocation()
            .then(response => {
                this.setState({ 
                    isCurrentUserSet: true, 
                    currentLatitude: response.data.latitude, 
                    currentLongitude: response.data.longitude 
                })
            })
            .catch(error => {
                alert(error.message);
            })
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

    /** Handle save data */
    handleSave = () => {
        this.setState({ isLoading: true, isSaved: true }, () => {
            let data = {
                transactionId: this.props.route.params.transactionId,
                locationName: this.state.locationName,
                currentLatitude: this.state.currentLatitude,
                currentLongitude: this.state.currentLongitude,
                note: this.state.note
            }

            updateMap(
                data,
                this.props.auth.token
            )
            .then((response) => {
                this.setState({ 
                    isLoading: false, 
                    responseTitle: response.message, 
                    isResponseError: false });
            })
            .catch(error => {
                this.setState({ 
                    isLoading: false, 
                    responseTitle: error.message, 
                    isResponseError: true })
            })
        });
    };

    /** Handle modal success save function  */
    handleModalSave = () => {
        this.setState({ isSaved: false }, () => {
            this.handleBack();
        });
    };

    /** Set location name */
    setLocationName = (latitude, longitude) => {
        getLocationName(latitude, longitude)
            .then(response => {
                this.setState({ locationName: response.data });
            })
            .catch(error => {
                alert(error.message)
            })
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                
                <Map
                    isCurrentUserSet={ this.state.isCurrentUserSet }
                    currentLatitude={ this.state.currentLatitude }
                    currentLongitude={ this.state.currentLongitude } 
                    setLocationName={ this.setLocationName } 
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
                            <Text style={ styles.textBold }>{ this.state.locationName }</Text>
                        </Layout>
                        <Input
                            label='Note: '
                            multiline={ true }
                            labelStyle={ styles.inputTextStyle }
                            placeholder='Detail Address, direction etc'
                            textStyle={ styles.input }
                            style={ styles.input }
                            value={ this.state.note }
                            onChangeText={ (text) => this.setState({ note: text }) }
                        />
                        <Button onPress={ this.handleSave }>
                            SAVE
                        </Button>
                    </Layout>
                </Layout>

                {/* Modal save */}
                <SmallModal
                    title={ this.state.responseTitle } 
                    isError={ this.state.isResponseError }
                    onPress={ this.handleModalSave } 
                    loading={ this.state.isLoading }
                    visible={ this.state.isSaved } 
                />

                {/* Modal information */}
                <InfoModal />
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

    input: {
        ...generalSty.mlBottom,
        minHeight: 70,
        textAlignVertical: "top"
    },

    textInfoContainer: {
        ...generalSty.mmBottom
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },

    textBold: {
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth.userData
    }
}

const rdxSelectMapScreen = connect(mapStateToProps)(SelectMapScreen);

export { rdxSelectMapScreen as SelectMapScreen };