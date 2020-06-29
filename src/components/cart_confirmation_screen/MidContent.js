import React from 'react';
import { StyleSheet } from 'react-native';
import { 
    Layout, 
    Text, 
} from '@ui-kitten/components';
import { generalSty } from '../../styles';
import { dateToDuration } from '../../modules';

const MidContent = (props) => {
    const setContent = () => {
        if (Object.keys(props.transaction).length > 0) {
            return (
                <Layout style={ styles.secondInfoContainer }>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>ID</Text>
                        <Text style={ styles.textBold }>
                            { props.transaction.id }
                        </Text>
                    </Layout>
                    <Layout style={ styles.secondInfoItemContainer }>
                        <Text style={ styles.smallText }>Status</Text>
                        <Text style={ styles.smallText }>
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
        ...generalSty.smallText
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
});

export { MidContent };