import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Modal, Text } from '@ui-kitten/components';
import { generalSty, } from '../../styles';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const SelectModal = (props) => {
    /** Extract data */
    const extractData = () => {
        return props.list.map((item, index) => (
            <CustomTouchableOpacity 
                key={ index } 
                style={ 
                    index === props.list.length - 1 ? 
                    styles.itemContainerLast : styles.itemContainer 
                }
                onPress={ item.action }
            >
                <Text style={ styles.centerText }>{ item.title }</Text>
            </CustomTouchableOpacity>
        ));
    };

    return (
        <Layout>
            <Modal
                backdropStyle={ styles.backdrop }
                visible={ props.visible }
            >
                <Layout style={ styles.modal }>
                    { extractData() }
                </Layout>
            </Modal>
        </Layout>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modal: {
        ...generalSty.allRadius,
        ...generalSty.plAll,
        ...generalSty.wf230,
        alignItems: 'center',
    },

    itemContainer: {
        ...generalSty.plAll,
        ...generalSty.greyBorder,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center'
    },

    itemContainerLast: {
        ...generalSty.plAll,
        ...generalSty.mlBottom,
        ...generalSty.greyBorder,
        alignItems: 'center'
    },

    centerText: {
        textAlign: 'center'
    }
});

export { SelectModal };