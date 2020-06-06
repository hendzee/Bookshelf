import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Icon, Button, Text} from '@ui-kitten/components';
import { generalSty, YELLOW } from '../../styles';

const MainInfo = (props) => {
    /** Handle navigation to cart screen */
    const toCart = () => {
        props.navigation.navigate('CART');
    }

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

    /** Extract data */
    const extractData = () => (
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
                    <Text style={ styles.boldText }>{ props.data.user.first_name + ' ' + props.data.last_name }</Text>
                </Layout>
                <Layout style={ styles.ratingContainer }>
                    { showRating( props.data.user.rating ) }
                </Layout>
                <Button style={ styles.button } status='basic'>
                    SEE THEIR BOOKS
                </Button>
                <Button onPress={ toCart } style={ styles.button } status='primary'>
                    ADD TO LIST
                </Button>
            </Layout>
        </Layout>
    )

    return (
        <Layout>
            { Object.entries(props.data).length > 0 ? extractData() : null }
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