import React from 'react';
import { Layout, Icon } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { generalSty, GREY } from '../../styles';

const FloatingButton = (props) => {
    const buttonIcon = () => (
        <Icon width={ 30 } height={ 30 } fill={ GREY } name={ props.icon } />
    );

    return (
        <Layout style={ styles.floatingButtonPosition }>
            <TouchableOpacity activeOpacity={ 0.8 } onPress={ props.onPress }>
                <Layout style={ styles.floatingButtonContainer }>
                    { buttonIcon() }
                </Layout>
            </TouchableOpacity>
        </Layout>
    );
}

const styles = StyleSheet.create({
    floatingButtonPosition: {
        position: 'absolute', 
        bottom: 30, 
        right: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },

    floatingButtonContainer: {
        width: 55,
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...generalSty.sofyGreyBackground
    }
});

export { FloatingButton };