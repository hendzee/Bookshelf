import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Icon, Button, Text} from '@ui-kitten/components';
import { generalSty, YELLOW } from '../../styles';

const MainInfo = () => {
    /** Set rating number */
    const showRating = (number) => {
        let ratingComponentList = [];

        for(let i=0; i<number; i++){
            ratingComponentList.push(
                <Icon 
                    key={ i } 
                    width={ 20 } 
                    height={ 20 } 
                    fill={ YELLOW } 
                    name='star' 
                />
            );
        }

        return ratingComponentList;
    }

    return (
        <Layout style={ styles.mainInfoContainer }>
            <Layout style={ styles.imageReviewContainer }>
                <Image 
                    style={ styles.imageReview }
                    source={ require('../../images/items/item_photo1.jpeg') }
                />
            </Layout>
            <Layout>
                <Layout>
                    <Text>Owner</Text>
                    <Text style={ styles.boldText }>Sarah Johnson</Text>
                </Layout>
                <Layout style={ styles.ratingContainer }>
                    { showRating(3) }
                </Layout>
                <Button style={ styles.button } status='basic'>
                    VISIT OWNER
                </Button>
                <Button style={ styles.button } status='primary'>
                    MAKE REQUEST
                </Button>
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    mainInfoContainer: {
        flexDirection: 'row',
        ...generalSty.mlBottom
    },

    imageReviewContainer: {
        ...generalSty.mlRight
    },

    imageReview: {
        ...generalSty.itemImageLarge
    },

    button: {
        ...generalSty.mlTop
    },

    boldText: {
        fontWeight: 'bold'
    },

    ratingContainer: {
        ...generalSty.mmTop,
        ...generalSty.mlBottom,
        flexDirection: 'row'
    },
});

export { MainInfo };