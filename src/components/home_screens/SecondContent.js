import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const SecondContent = () => {
    return (
        <Layout style={ styles.bodyContentNoPadding }>
            <Layout style={ styles.titleContainer }>
                <Layout style={ styles.titleRow }>
                    <Layout style={ styles.titleContentLeft }>
                        <Text style={ styles.titleContent }>Recomendation</Text>
                    </Layout>
                    <Layout style={ styles.titleContentRight }>
                        <Text status='primary'>See All</Text>
                    </Layout>
                </Layout>
            </Layout>

            <Layout style={ styles.selfContainer }>
                <Layout style={ styles.selfContent }>
                    <Layout>
                        <Image
                            style={ styles.imageCard }
                            source={ require('../../images/items/item_photo4.jpeg') } 
                        />
                    </Layout>
                    <Layout style={ styles.selfContentInfo }>
                        <Layout style={ styles.selfContentBody }>
                            <Text style={ styles.selfContentTitle } >Xoxo Kels</Text>
                            <Text style={ styles.selfContentSubtitle }>2019, Abdul Malik</Text>
                        </Layout>
                        <Text style={ styles.selfContentLabel }>Borrow From:</Text>
                        <Text style={ styles.selfContentValue }>Albert Setiawan</Text>
                        <Layout style={ styles.selfContentBottom }>
                            <Layout>
                                <Text style={ styles.selfContentLabel }>return</Text>
                                <Text style={ styles.selfContentValue }>15/01/2020</Text>
                            </Layout>
                            <Layout>
                                <Text style={ styles.selfContentLabel }>return</Text>
                                <Text style={ styles.selfContentValue }>15/01/2020</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
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

    imageCard: {
        ...generalSty.itemImage
    },

    titleContent: {
        fontWeight: 'bold'
    },

    bodyContent: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    bodyContentNoPadding: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.mlBottom
    },

    selfContainer: {
        ...generalSty.mlBottom
    },

    selfContent: {
        flexDirection: 'row',
    },

    selfContentImage: {
        alignItems: 'flex-start',
        ...generalSty.itemImage,
        ...generalSty.mlRight
    },

    selfContentInfo: {
        flexGrow: 1,
        ...generalSty.mlLeft
    },

    selfContentTitle: {
        fontWeight: 'bold'
    },

    selfContentSubtitle: {
        ...generalSty.smallText
    },

    selfContentLabel: {
        ...generalSty.smallText,
        ...generalSty.greyText
    },

    selfContentBottom: {
        ...generalSty.mlTop,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selfContentValue: {
        ...generalSty.smallText
    },

    selfContentBody: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        alignItems: 'baseline',
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    }
})

export { SecondContent };