import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { 
    Layout, 
    Icon, 
    TopNavigation, 
    TopNavigationAction,
    Button,
    Text
} from '@ui-kitten/components';
import { generalSty, YELLOW } from '../styles';
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const BackIcon = (style) => (
    <Icon { ...style } name='arrow-back-outline' />
)

const EditIcon = (style) => (
    <Icon {...style } name='edit-2-outline' />
);

const StarIcon = () => (
    <Icon width={ 20 } height={ 20 } fill={ YELLOW } name='star' />
);

class ItemDetailScreen extends Component {
    /** Show back button */
    showBackButton = () => (
        <TopNavigationAction icon={ BackIcon } onPress={ this.handleBack } />
    );

    /** Show edit icon */
    showEditIcon = () => (
        <TopNavigationAction icon={ EditIcon } onPress={ this.handleBack } />
    );

    /** Handle back */
    handleBack = () => {
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Book Detail'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    leftControl={ this.showBackButton() }
                    rightControls={ this.showEditIcon() }
                />

                <ScrollView>

                    <Layout style={ styles.mainContainer }>
                        {/* Main content - start */}
                        <Layout style={ styles.mainInfoContainer }>
                            <Layout style={ styles.imageReviewContainer }>
                                <Image 
                                    style={ styles.imageReview }
                                    source={ require('../images/items/item_photo1.jpeg') }
                                />
                            </Layout>
                            <Layout>
                                <Layout>
                                    <Text>Owner</Text>
                                    <Text style={ styles.boldText }>Sarah Johnson</Text>
                                </Layout>
                                <Layout style={ styles.ratingContainer }>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </Layout>
                                <Button style={ styles.button } status='basic'>
                                    VISIT OWNER
                                </Button>
                                <Button style={ styles.button } status='primary'>
                                    MAKE REQUEST
                                </Button>
                            </Layout>
                        </Layout>
                        {/* Main content - end */}

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

                    </Layout>
                </ScrollView>
                <Layout style={ styles.floatingButtonPosition }>
                    <CustomTouchableOpacity onPress={ () => null }>
                        <Layout style={ styles.floatingButtonContainer }>
                            <StarIcon />
                        </Layout>
                    </CustomTouchableOpacity>
                </Layout>
            </SafeAreaView>
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

    infoTextContainer: {
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    floatingButtonPosition: {
        position: 'absolute', 
        bottom: 30, 
        right: 30,
    },

    floatingButtonContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...generalSty.sofyGreyBackground
    }
});

export { ItemDetailScreen };