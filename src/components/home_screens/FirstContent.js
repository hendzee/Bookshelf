import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const FirstContent = () => {
    return (
       <Layout style={ styles.bodyContent }>
            <Layout style={ styles.titleContainer }>
                <Layout style={ styles.titleRow }>
                    <Layout style={ styles.titleContentLeft }>
                        <Text style={ styles.titleContent }>On Your Hand</Text>
                    </Layout>
                    <Layout style={ styles.titleContentRight }>
                        <Text status='primary'>See All</Text>
                    </Layout>
                </Layout>
            </Layout>

            <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false }>
                <Layout style={ styles.cardContainer }>
                    <Image 
                        style={ styles.imageCard }
                        source={ require('../../images/items/item_photo1.jpeg') }
                    />
                    <Layout style={ styles.descCard }>
                        <Text style={ styles.cardTitle }>The Green Ember</Text>
                        <Text style={ styles.cardInfo }>2019, Thomas Niels</Text>
                    </Layout>
                </Layout>

                <Layout style={ styles.cardContainer }>
                    <Image 
                        style={ styles.imageCard }
                        source={ require('../../images/items/item_photo2.jpeg') }
                    />
                    <Layout style={ styles.descCard }>
                        <Text style={ styles.cardTitle }>Slow Dancing on Hard Drugs</Text>
                        <Text style={ styles.cardInfo }>1995, Jordan JR</Text>
                    </Layout>
                </Layout>
                <Layout style={ styles.cardContainer }>
                    <Image 
                        style={ styles.imageCard }
                        source={ require('../../images/items/item_photo3.jpeg') }
                    />
                    <Layout style={ styles.descCard }>
                        <Text style={ styles.cardTitle }>After Days</Text>
                        <Text style={ styles.cardInfo }>2015, Jake Hulk</Text>
                    </Layout>
                </Layout>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        ...generalSty.mlBottom,
        alignItems: 'baseline'
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    titleContentLeft: {
        flex: 1
    },

    titleContentRight: {
        flex: 1, 
        alignItems: 'flex-end'
    },

    cardContainer: {
        ...generalSty.mlRight,
        ...generalSty.w150,
        alignItems: 'baseline',
        flexWrap: 'wrap'
    },

    imageCard: {
        ...generalSty.itemImage
    },

    descCard: {
        ...generalSty.mmTop
    },

    cardTitle: {
        ...generalSty.smallText,
        fontWeight: 'bold'
    },

    cardInfo: {
        ...generalSty.smallText
    },

    bodyContent: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

})

export { FirstContent };