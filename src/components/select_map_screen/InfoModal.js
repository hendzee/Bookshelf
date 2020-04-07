import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Modal, Text, Button } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const InfoModal = () => {
    const [modal, setModal] = useState(true);

    /** Info list */
    const setInfoList = () => {
        let rules = [
            'Make meeting point in the crowded place',
            'You can discuss where meeting point with borrower, open chat icon above',
            'You can set and update that place in 3 days after you accept the request',
            'You can set this later, but you only have 3 days or meeting will canceled automatically',
            'You cant update place in a day before meeting',
            'Transaction must be done in 3 days, or it will be cancel automatically'
        ];

        let components = [];

        for (let i=0; i<rules.length; i++) {
            components.push(
                <Layout style={ styles.infoListContainer } key={ i }>
                    <Text>{ i+1 + '. ' }</Text>
                    <Text>{ rules[i] }</Text>
                </Layout>
            );
        }

        return components;
    }

    return (
        <Layout>
            <Modal
                backdropStyle={ styles.backdrop }
                visible={ modal }
            >
                <Layout style={ styles.modalContainer }>
                   <Text style={ styles.title }>Meeting Point Rules</Text>
                   { setInfoList() }
                   <Layout style={ styles.buttonContainer }>
                        <Button onPress={ () => setModal() }>I UNDERSTAND</Button>
                   </Layout>
                </Layout>
            </Modal>
        </Layout>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContainer: {
        width: 290,
        height: 450,
        ...generalSty.allRadius,
        ...generalSty.plAll
    },

    title: {
        fontWeight: 'bold',
        ...generalSty.mlBottom
    },

    infoListContainer: {
        flexDirection: 'row',
        ...generalSty.mmBottom
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        ...generalSty.pmAll,
        ...generalSty.mlAll
    }
});

export { InfoModal };