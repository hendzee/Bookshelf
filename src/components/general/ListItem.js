import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Icon, TopNavigationAction, Text } from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const ListItem = (props) =>  {
    /** Navigate to detail item screen */
    toDetailScreen = () => {
        props.navigation.navigate('ITEM_DETAIL', { id: props.item.id });
    }

    /** Handle back */
    handleBack = () => {
        props.navigation.goBack();
    }

    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ handleBack } />
    );
    
    return (
        <CustomTouchableOpacity style={
            props.index === props.dataLength - 1 || props.index === props.dataLength - 2 ?
            styles.cardContainerLast
            : (props.index % 2 === 0 ? styles.cardContainerOdd : styles.cardContainer)}
            onPress={ toDetailScreen } 
        >
            <Image 
                style={ styles.imageCard }
                source={{ uri: props.item.cover }}
            />
            <Text style={ styles.bold }>
                { props.item.title }
            </Text>
        </CustomTouchableOpacity>
    );
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
        marginBottom: 80,
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