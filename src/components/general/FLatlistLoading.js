import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

const FLatlistLoading = () => (
    <Layout style={ styles.loadingContainer }>
        <Spinner />
    </Layout>
);

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'relative',
        bottom: 70,
        height: 40, 
        width: '100%',
        marginTop: 0, 
        marginBottom: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export { FLatlistLoading };