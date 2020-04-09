import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { Layout, Icon, Button, Input } from '@ui-kitten/components';
import { generalSty } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity, SmallModal } from '../components/general';

/** SelectMapScreen substance components */
import { InfoModal } from '../components/select_map_screen';

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
            isSaved: false,
            isLoading: false,
        }
    }

    /** Handle back */
    handleClose = () => {
        this.props.navigation.navigate('CART_CONFIRMED');
    }

    /** To chat detail */
    toChatDetail = () => {
        this.props.navigation.navigate('CHAT_DETAIL')
    }

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
            this.handleClose();
        });
    };
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />

                <Layout>
                    <Image 
                        style={ styles.map }
                        source={ require('../images/others/map.png') }
                    />
                    <Layout style={ styles.topFloatContainer }>
                        <Layout style={ styles.topLeftContainer }>
                            <CustomTouchableOpacity onPress={ this.handleClose }>
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
                            <Input
                                label='Address'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='Address'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Input
                                label='Detail'
                                labelStyle={ styles.inputTextStyle }
                                placeholder='Detail Address'
                                textStyle={ styles.inputTextStyle }
                                style={ styles.input }
                            />
                            <Button onPress={ this.handleSave }>
                                SAVE
                            </Button>
                        </Layout>
                    </Layout>
                </Layout>

                {/* Modal save */}
                <SmallModal
                    title='Your meeting point was saved.' 
                    icon='checkmark-circle-outline'
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
        ...generalSty.mlBottom
    },

    inputTextStyle: {
        ...generalSty.smallText,
        ...generalSty.black
    },
});

export { SelectMapScreen };