import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const ItemInfo = (props) => {
    /** Extract data */
    const extractData = () => (
        <Layout>
            <Layout style={ styles.infoTextContainer }>
                <Text>Title</Text>
                <Text style={ styles.boldText }>The Green Ember</Text>
            </Layout>

            <Layout style={ styles.infoTextContainer }>
                <Text>Author</Text>
                <Text style={ styles.boldText }>Thomas Niels</Text>
            </Layout>

            <Layout style={ styles.infoTextContainer }>
                <Text>Publication Year</Text>
                <Text style={ styles.boldText }>2019</Text>
            </Layout>

            <Layout style={ styles.infoTextContainer }>
                <Text>Category</Text>
                <Text style={ styles.boldText }>Fable</Text>
            </Layout>

            <Layout style={ styles.infoTextContainer }>
                <Text>Date Created</Text>
                <Text style={ styles.boldText }>20 March, 2020</Text>
            </Layout>
            
            <Layout style={ styles.infoTextContainer }>
                <Text>Status</Text>
                <Text style={ styles.boldText }>Available</Text>
            </Layout>
        </Layout>
    );

    return (
        <Layout>
            { Object.entries(props.data).length > 0 ? extractData() : null }
        </Layout>
    );
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold'
    },
   
    infoTextContainer: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },
});

export { ItemInfo };