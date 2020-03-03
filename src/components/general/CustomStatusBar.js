import React from 'react';
import { StatusBar } from 'react-native';
import { Layout } from '@ui-kitten/components';

const CustomStatusBar = () => {
    return (
        <Layout>
            <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
        </Layout>        
    );
}

export { CustomStatusBar }