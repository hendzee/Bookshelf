import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { 
    Layout, 
    Text, 
    Icon, 
    TopNavigation, 
    TopNavigationAction, 
    Avatar,
    Button 
} from '@ui-kitten/components';
import { generalSty, GREY } from '../styles'; 
import { CustomStatusBar, CustomTouchableOpacity } from '../components/general';

const SearchIcon = (style) => (
    <Icon { ...style } name='search-outline' />
);

const MoreIcon = () => (
    <Icon width={ 13 } height={ 13 } name='more-vertical-outline' />
);

const TimeIcon = () => (
    <Icon width={ 13 } height={ 13 } fill={ GREY } name='clock-outline' />
);

class InboxScreen extends Component {
    /** Show search icon */
    showSearchIcon = () => (
        <TopNavigationAction icon={ SearchIcon } />
    );

    /** Handle navigation to cart confirmation screen */
    toCartConfirmation = () => {
        this.props.navigation.navigate('CART_CONFIRMATION');
    }

    render() {
        return (
            <SafeAreaView style={ styles.rootContainer }>
                <CustomStatusBar />
                <TopNavigation
                    title='Inbox'
                    titleStyle={ styles.titleScreenStyle }
                    alignment='center'
                    rightControls={ this.showSearchIcon() }                
                />

                <Layout style={ styles.mainContainer }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <CustomTouchableOpacity onPress={ this.toCartConfirmation }>
                            <Layout style={ styles.inboxCardContainer }>
                                <Layout style={ styles.inboxCardImageContainer }>
                                    <Avatar 
                                        size='giant'
                                        source={ require('../images/users/user4.png') } 
                                    />
                                </Layout>
                                <Layout style={ styles.inboxCardContentContainer }>
                                    <Text>
                                        <Text style={ styles.userName }>Bryan Bottom</Text>
                                        <Text>{ ' ' }</Text>
                                        <Text>
                                            ask you to borrow your books. Check to give response.
                                        </Text>
                                    </Text>

                                    <Layout style={ styles.inboxCardTimeContainer }>
                                        { TimeIcon() }
                                        <Text style={ styles.inboxCardTime } >15 days ago</Text>
                                    </Layout>
                                </Layout>
                                <Layout style={ styles.inboxCardMoreContainer }>
                                    <Button size='tiny' appearance='ghost' icon={ MoreIcon } />
                                </Layout>
                            </Layout>
                        </CustomTouchableOpacity>
                    </ScrollView>
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

    inboxCardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    inboxCardImageContainer: {
        flex: 2,
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    inboxCardContentContainer: {
        flex: 6,
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    inboxCardMoreContainer: {
        flex: 1,
        alignItems: 'flex-end',
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    userName: {
        fontWeight: 'bold'
    },

    inboxContent: {
        ...generalSty.smallText
    },

    inboxCardTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        ...generalSty.mmTop
    },

    inboxCardTime: {
        ...generalSty.smallText,
        ...generalSty.mmLeft,
        ...generalSty.greyText
    }
});

export { InboxScreen };