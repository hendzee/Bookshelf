import React from 'react';
import { StyleSheet } from 'react-native';
import { 
    Layout, 
    Text, 
    Button,
    Icon
} from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { dateToDuration } from '../../modules';

const EditIcon = () => (
    <Icon width={ 15 } height={ 15 } name='edit' />
)

const MidContent = (props) => {
    /** Set edit map */
    setEditMap = () => {
        if (props.isMapEditable && props.transaction.status !== 'RETURNED' 
            && props.transaction.status !== 'LISTING' && props.transaction.status !== 'CANCEL') {
            return(
                <Layout style={ styles.floatRight }>
                    <Button 
                        onPress={ props.toSelectMap } 
                        status='basic' 
                        size='tiny' 
                        icon={ EditIcon }
                    >
                        Edit Map
                    </Button>
                </Layout>
            );
        }

        return(
            <Layout style={ styles.floatRight }>
                <Button 
                    onPress={ props.toShowMap } 
                    status='basic' 
                    size='tiny' 
                >
                    Show Map
                </Button>
            </Layout>
        );
    }

    /** Set extra data */
    const setExtraData = () => {
        if (props.transaction.status === 'APPOINTMENT' || props.transaction.status === 'BORROWED' 
            || props.transaction.status === 'RETURNED' ||  props.transaction.status === 'CANCEL') {
            return(
                <Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>Return Date</Text>
                        <Text style={ styles.smallText }>20 March, 2020</Text>
                    </Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Layout style={ styles.leftFlexContainer }>
                            <Text style={ styles.smallText }>Meet Point</Text>
                        </Layout>
                        <Layout style={ styles.rightFlexContainer }>
                            <Text style={ styles.address }>
                                { props.transaction.location_name }
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Layout style={ styles.leftFlexContainer }>
                            <Text style={ styles.smallText }>Note</Text>
                        </Layout>
                        <Layout style={ styles.rightFlexContainer }>
                            <Text style={ styles.address }>
                                { props.transaction.map_note }
                            </Text>
                        </Layout>
                    </Layout>
                    { setEditMap() }
                </Layout>
            )
        }

        return null;
    }

    const setContent = () => {
        if (Object.keys(props.transaction).length > 0) {
            return (
                <Layout style={ styles.secondInfoContainer }>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>ID</Text>
                        <Text style={ styles.smallText }>
                            { props.transaction.id }
                        </Text>
                    </Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>Status</Text>
                        <Text style={ styles.textBold }>
                            { props.transaction.status }
                        </Text>
                    </Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>Duration</Text>
                        <Text style={ styles.smallText }>
                            { 
                                dateToDuration(props.transaction.active_date, 
                                props.transaction.expired_date) + ' Days'
                            }
                        </Text>
                    </Layout>
                    { setExtraData() }
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
    mainContainer: {
        ...generalSty.mainContainer
    },

    textBold: {
        fontWeight: 'bold',
    },

    secondInfoContainer: {
        ...generalSty.mlBottom,
        ...generalSty.plBottom,
        ...generalSty.greyBorder,
        borderBottomWidth: 1
    },

    smallText: {
        ...generalSty.smallText,
    },

    secondInfoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...generalSty.mmBottom
    },

    titleScreenStyle: {
        ...generalSty.titleScreenStyle
    },

    infoContainer: {
        ...generalSty.mlRight
    },

    leftFlexContainer: {
        flex: 2
    },

    address: {
        ...generalSty.smallText,
        textAlign: 'right'
    },

    rightFlexContainer: {
        flex: 1
    },

    floatRight: {
        alignItems: 'flex-end'
    },
});

export { MidContent };