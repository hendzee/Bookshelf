import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Modal, Text, Icon, Spinner, Button } from '@ui-kitten/components';
import { generalSty, RED, PRIMARY } from '../../styles';

const SmallModal = (props) => {
    /** Modal icon */
    const modalIcon = () => (
        <Icon 
            width={ 32 } 
            height={ 32 }
            fill={ props.isError ? RED : PRIMARY }
            name='checkmark-circle-outline' />
    );

    /** Modal content */
    const modalContent = () => (
        <Layout style={ styles.smallModal }>
            <Layout style={ styles.iconContainer }>
                { modalIcon() }
            </Layout>
            <Text style={ styles.modalTitle }>{ props.title }</Text>
            <Button onPress={ () => props.onPress() } status='primary'>
                OK
            </Button>
        </Layout>
    );

    /** Modal loading */
    const modalLoading = () => (
        <Spinner size='giant' />
    );

    return (
        <Layout>
            <Modal
                backdropStyle={ styles.backdrop }
                visible={ props.visible }
            >
                {
                    props.loading && props.loading === true ?
                    modalLoading() : modalContent() 
                }
            </Modal>
        </Layout>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    smallModal: {
        ...generalSty.wm180,
        ...generalSty.allRadius,
        ...generalSty.plAll,
        alignItems: 'center'
    },

    modalTitle: {
        ...generalSty.mlBottom,
        textAlign: 'center'
    },

    iconContainer: {
        ...generalSty.mmBottom
    }
});

export { SmallModal };