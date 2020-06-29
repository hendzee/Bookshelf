import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { 
    Layout, 
    Text, 
} from '@ui-kitten/components';
import { generalSty } from '../../styles';

const ListContent = (props) => {
    /** Extract data */
    const extractData = () => {
        if (props.loans.length > 0) {
            return props.loans.map(item => (
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
                        <Text style={ styles.smallTextGrey }>
                            { item.items.author }
                        </Text>
                    </Layout>
                </Layout>
            ))
        }

        return null
    }

    return (
        <Layout style={ styles.listCardContainer }>
            { extractData() }
        </Layout>
    );
}

const styles = StyleSheet.create({
    smallTextGrey: {
        ...generalSty.greyText,
        ...generalSty.smallText
    },

    smallText: {
        ...generalSty.smallText
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    listCardContainer: {
        ...generalSty.mlTop,
        ...generalSty.mlBottom,
        height: 460
    },

    cardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    imageContainer: {
        ...generalSty.mlRight
    },

    imageCard: {
        width: 60,
        height: 95,
        borderRadius: 3
    },

    infoContainer: {
        ...generalSty.mlRight
    },

    titleItem: {
        fontWeight: 'bold'
    },
});

export { ListContent };