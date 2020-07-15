import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { CustomTouchableOpacity } from '../general/CustomTouchableOpacity';
import { generalSty, GREY } from '../../styles';

const RemoveIcon = () => (
    <Icon width={ 25 } height={ 25 } fill={ GREY } name='close-circle' />
)

const ItemList = (props) => {
    /** Extract data */
    extractData = () => {
        if (props.loans.length > 0) {
            return(
                props.loans.map(item => (
                    <Layout style={ styles.cardContainer }>
                        <Layout style={ styles.imageContainer }>
                            <Image 
                                style={ styles.imageCard }
                                source={{ uri: item.items.cover }}
                            />
                        </Layout>
                        <Layout style={ styles.infoContainer }>
                            <Text style={ styles.titleItem }>
                                { item.items.title }
                            </Text>
                            <Text style={ styles.infoItem }>
                                { item.items.author }
                            </Text>
                        </Layout>
                        <Layout style={ styles.removeContainer }>
                            <CustomTouchableOpacity onPress={ () => props.removeItem(item.id) }>
                                <RemoveIcon />
                            </CustomTouchableOpacity>
                        </Layout>
                    </Layout>
                ))
            );
        }

        return null;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={ false }>
            { extractData() }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    imageContainer: {
        flex: 2,
        ...generalSty.mlRight
    },

    infoContainer: {
        flex: 6,
        ...generalSty.mlRight
    },

    removeContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },

    imageCard: {
        width: 60,
        height: 95,
        borderRadius: 3
    },

    titleItem: {
        fontWeight: 'bold'
    },

    infoItem: {
        ...generalSty.smallText,
        ...generalSty.greyText,
    }
});

export { ItemList };