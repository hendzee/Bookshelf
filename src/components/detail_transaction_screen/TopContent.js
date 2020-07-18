import React from 'react';
import { StyleSheet } from 'react-native';
import { 
    Layout, 
    Icon, 
    Text, 
    Avatar 
} from '@ui-kitten/components';
import { generalSty, GREY, YELLOW } from '../../styles';
import { CustomTouchableOpacity } from '../general';
import { ratingConverter } from '../../modules';

const StarIcon = () => (
    <Icon width={ 15 } height={ 15 } fill={ YELLOW } name='star' />
)

/** Chat icon */
const ChatIcon = () => (
    <Icon width={ 25 } height={ 25 } fill={ GREY } name='message-square' />
)

const TopContent = (props) => {
    /** Set owner chat */
    const setOwnerChat = () => {
        if (props.userId === props.transaction.owner_id) {
            return (
                <CustomTouchableOpacity>
                    <ChatIcon />
                </CustomTouchableOpacity>
            );
        }

        return null;
    }

    /** Set owner chat */
    const setBorrowerChat = () => {
        if (props.userId === props.transaction.borrower_id) {
            return (
                <CustomTouchableOpacity>
                    <ChatIcon />
                </CustomTouchableOpacity>
            );
        }

        return null;
    }

    /** Set main content */
    const setContent = () => {
        if (Object.keys(props.relatedUsers).length > 0) {
            return (
                <Layout style={ styles.topInfoContainer }>
                    <Layout style={ styles.topInfoItem }>
                        <Layout style={ styles.userContainer }>
                            <Layout style={ styles.userImageContainer }>
                                <Avatar source={ require('../../images/users/user4.png') }/>
                            </Layout>
                            <Layout>
                                <Text style={ styles.textBold }>
                                    { props.relatedUsers.borrower_name }
                                </Text>
                                <Layout style={ styles.topSecondInfo }>
                                    <StarIcon />
                                    <Text style={ styles.smallTextGrey }>
                                        { ratingConverter(props.relatedUsers.borrower_rating) }
                                    </Text>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={ styles.infoRightContainer }>
                            { setOwnerChat() }
                        </Layout>
                    </Layout>
                    <Layout style={ styles.topInfoItem }>
                        <Layout style={ styles.userContainer }>
                            <Layout style={ styles.userImageContainer }>
                                <Avatar source={ require('../../images/users/user1.png') } />
                            </Layout>
                            <Layout>
                                <Text style={ styles.textBold }>
                                    { props.relatedUsers.owner_name }
                                </Text>
                                <Layout style={ styles.topSecondInfo }>
                                    <StarIcon />
                                    <Text style={ styles.smallTextGrey }>
                                        { ratingConverter(props.relatedUsers.owner_rating) }
                                    </Text>
                                    <Layout style={ styles.badgePrimary }>
                                        <Text style={ styles.smallTextWhite }>Owner</Text>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={ styles.infoRightContainer }>
                            { setBorrowerChat() }
                        </Layout>
                    </Layout>
                </Layout>
            );
        }

        return null;
    }

    return (
        <Layout>
            { setContent() }
        </Layout>
    );
}

const styles = StyleSheet.create({
    topInfoContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
    },

    topInfoItem: {
        flexDirection: 'row',
        ...generalSty.mmBottom
    },

    userContainer: {
        flexDirection: 'row',
        flex: 6,
    },

    userImageContainer: {
        ...generalSty.mlRight
    },

    textBold: {
        fontWeight: 'bold',
    },

    badgePrimary: {
        ...generalSty.primaryBackground,
        ...generalSty.pmLeft,
        ...generalSty.pmRight,
        ...generalSty.mmLeft,
        alignSelf: 'baseline',
        borderRadius: 3,
        paddingVertical: 0.5,
    },

    smallTextWhite: {
        fontSize: 10,
        letterSpacing: 0.5,
        ...generalSty.white
    },

    topSecondInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    infoRightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },

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

    imageContainer: {
        ...generalSty.mlRight
    },

    infoContainer: {
        ...generalSty.mlRight
    },
});

export { TopContent }