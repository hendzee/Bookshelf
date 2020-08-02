import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text} from 'react-native';
import { Layout } from '@ui-kitten/components';
import { generalSty, PRIMARY, WHITE} from '../styles';
import { getUserData } from '../modules';

class SplashScreen extends Component {
    /** Handle next page */
    handleNextPage = () => {
        getUserData()
            .then(_ => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MAIN' }]
                });
            })
            .catch(_ => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'LOGIN' }]
                });
            })
    }

    async componentDidMount() {
        setTimeout(() => {
            this.handleNextPage()
        }, 3000);
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <Layout style={ styles.mainContainer }>
                    <Text style={ styles.logo }>
                        B
                    </Text>
                </Layout>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        ...generalSty.full
    },

    mainContainer: {
        ...generalSty.mainContainer,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY
    },

    logo: {
        fontSize: 150,
        color: WHITE
    },
});

export { SplashScreen };