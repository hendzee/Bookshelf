import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Icon, TopNavigationAction, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { FlatList } from 'react-native-gesture-handler';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { title: 'The Green Ember', image: require('../../images/items/item_photo1.jpeg') },
                { title: 'Slow Dancing  on Hard Drugs', image: require('../../images/items/item_photo2.jpeg') },
                { title: 'Harry Potter and Harry Topper', image: require('../../images/items/item_photo3.jpeg') },
                { title: 'After Days', image: require('../../images/items/item_photo4.jpeg') },
                { title: 'Xoxo Kels', image: require('../../images/items/item_photo5.jpeg') },
                { title: 'Brandi Carcile Bear Greek', image: require('../../images/items/item_photo2.jpeg') },
            ]
        }
    }

    /** Navigate to detail item screen */
    toDetailScreen = () => {
        this.props.navigation.navigate('ITEM_DETAIL');
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <Layout>
                <FlatList 
                    data={ this.state.data }
                    horizontal={ false }
                    numColumns={ 2 }
                    showsVerticalScrollIndicator={ false }
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <CustomTouchableOpacity style={
                            index === this.state.data.length - 1 || index === this.state.data.length - 2 ?
                            styles.cardContainerLast
                            : (index % 2 === 0 ? styles.cardContainerOdd : styles.cardContainer)}
                            onPress={ this.toDetailScreen } 
                        >
                            <Image 
                                style={ styles.imageCard }
                                source={ item.image }
                            />
                            <Text style={ styles.bold }>
                                { item.title }
                            </Text>
                        </CustomTouchableOpacity>
                    )}
                />
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        ...generalSty.full
    },

    mainContainer: {
        ...generalSty.mainContainer
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    cardContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...generalSty.pmAll,
        ...generalSty.allRadius,
        ...generalSty.mlBottom
    },
    
    cardContainerOdd: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...generalSty.pmAll,
        ...generalSty.allRadius,
        ...generalSty.mlBottom,
        ...generalSty.mmRight
    },

    cardContainerLast: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 70,
        ...generalSty.pmAll,
        ...generalSty.allRadius,
    },

    imageCard: {
        ...generalSty.itemImage,
        ...generalSty.mmBottom
    },

    bold: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export { ListItem };