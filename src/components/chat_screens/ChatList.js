import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { CustomTouchableOpacity } from '../general';


const ChatList = (props) => {
    /** Navigate to detail chat screen */
    const toDetailScreen = () => {
        props.navigation.navigate('CHAT_DETAIL');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={ false }>
            <CustomTouchableOpacity onPress={ toDetailScreen }>
                <Layout style={ styles.chatCardContainer }>
                    <Layout style={ styles.chatCardImageContainer }>
                        <Avatar 
                            size='giant'
                            source={ require('../../images/users/user1.png') } 
                        />
                    </Layout>
                    <Layout style={ styles.chatCardContentContainer }>
                        <Text style={ styles.userName } >Sarah Johnson</Text>
                        <Text style={ styles.chatContent }>Yes of course.</Text>
                    </Layout>
                    <Layout style={ styles.chatCardTimeContainer }>
                        <Text style={ styles.chatTime }>Yesterday</Text>
                    </Layout>
                </Layout>
            </CustomTouchableOpacity>
            
            <Layout style={ styles.chatCardContainer }>
                <Layout style={ styles.chatCardImageContainer }>
                    <Avatar 
                        size='giant'
                        source={ require('../../images/users/user2.png') } 
                    />
                </Layout>
                <Layout style={ styles.chatCardContentContainer }>
                    <Text style={ styles.userName } >Tina Raynor</Text>
                    <Text style={ styles.chatContent }>Hi, how the book ?</Text>
                </Layout>
                <Layout style={ styles.chatCardTimeContainer }>
                    <Text style={ styles.chatTime }>Yesterday</Text>
                </Layout>
            </Layout>
            
            <Layout style={ styles.chatCardContainer }>
                <Layout style={ styles.chatCardImageContainer }>
                    <Avatar 
                        size='giant'
                        source={ require('../../images/users/user3.png') } 
                    />
                </Layout>
                <Layout style={ styles.chatCardContentContainer }>
                    <Text style={ styles.userName } >Jimmy Sean</Text>
                    <Text style={ styles.chatContent }>I have new book !!!</Text>
                </Layout>
                <Layout style={ styles.chatCardTimeContainer }>
                    <Text style={ styles.chatTime }>Yesterday</Text>
                </Layout>
            </Layout>
            
            <Layout style={ styles.chatCardContainer }>
                <Layout style={ styles.chatCardImageContainer }>
                    <Avatar 
                        size='giant'
                        source={ require('../../images/users/user4.png') } 
                    />
                </Layout>
                <Layout style={ styles.chatCardContentContainer }>
                    <Text style={ styles.userName } >Bryan Bottom</Text>
                    <Text style={ styles.chatContent }>The book is awesome...</Text>
                </Layout>
                <Layout style={ styles.chatCardTimeContainer }>
                    <Text style={ styles.chatTime }>Yesterday</Text>
                </Layout>
            </Layout>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    chatCardContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        ...generalSty.greyBorder,
        ...generalSty.plBottom,
        ...generalSty.mlBottom
    },

    chatCardImageContainer: {
        flex: 2
    },

    chatCardContentContainer: {
        flex: 5,
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    chatCardTimeContainer: {
        flex: 2,
        alignItems: 'flex-end',
        ...generalSty.pmTop,
        ...generalSty.pmBottom
    },

    userName: {
        fontWeight: 'bold'
    },

    chatContent: {
        ...generalSty.smallText
    },

    chatTime: {
        ...generalSty.smallText
    }
})

export { ChatList };