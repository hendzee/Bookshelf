import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { CustomTouchableOpacity } from '../general/CustomTouchableOpacity';

const SecondContent = (props) => {
    /** Extract data */
    const extractData = () => {
        return (
            <Layout style={ styles.selfContainer }>
                <Layout style={ styles.selfContent }>
                    <CustomTouchableOpacity>
                        <Image
                            style={ styles.imageCard }
                            source={{ uri: props.data.cover }} 
                        />
                    </CustomTouchableOpacity>
                    <Layout style={ styles.selfContentInfo }>
                        <Layout style={ styles.selfContentBody }>
                            <Text
                                numberOfLines={ 1 }
                                ellipsizeMode='tail' 
                                style={ styles.selfContentTitle } 
                            >
                                { props.data.title }
                            </Text>
                            <Text
                                numberOfLines={ 1 }
                                ellipsizeMode='tail' 
                                style={ styles.selfContentSubtitle }
                            >
                                { props.data.publish_date + ', ' + props.data.author }
                            </Text>
                        </Layout>
                        <Text style={ styles.selfContentLabel }>Owner</Text>
                        <Text style={ styles.selfContentValue }>
                            { props.data.user.first_name + ' ' + props.data.user.last_name }
                        </Text>
                        <Layout style={ styles.selfContentBottom }>
                            <Layout>
                                <Text style={ styles.selfContentLabel }>User Rating</Text>
                                <Text style={ styles.selfContentValue }>
                                    { props.data.user.rating }
                                </Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

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
            { Object.entries(props.data).length > 0 ? extractData() : null }
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