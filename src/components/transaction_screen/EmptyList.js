import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const EmptyList = () => {
    return (
        <Layout style={ styles.mainContainer }>
            <Image
                style={ styles.image }
                source={ require('../../images/icons/read-book.png') }
            />
            <Text style={ styles.bold }>
                Your List is Empty
            </Text>
            <Text style={ styles.thin }>
                Create your transaction now by borrow or lent your book.
            </Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        ...generalSty.mlBottom
    },
    bold: {
        ...generalSty.mlBottom,
        ...generalSty.veryLargeText,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    thin: {
        textAlign: 'center'
    }
});

export { EmptyList };