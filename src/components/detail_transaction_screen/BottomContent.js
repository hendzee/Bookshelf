import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import { generalSty } from '../../styles';

const BottomContent = (props) => {
    const setContent = () => {
        let content = [];

        if (Object.keys(props.transaction).length > 0) {
            if (props.isOwner) {
                switch (props.transaction.status) {
                    case 'WAITING':
                        content.push(
                            <Button onPress={ props.handleCancel } status='danger'>
                                REJECT REQUEST
                            </Button>
                        );
                        content.push(
                            <Button onPress={ props.handleUpdateToAppointment } style={ styles.mainButton }>
                                ACCEPT REQUEST
                            </Button>
                        );
                        break;
    
                    case 'APPOINTMENT':
                        content.push(
                            <Button onPress={ props.handleCancel } status='danger'>
                                CANCEL TRANSACTION
                            </Button>
                        ); 
                        content.push(
                            <Button onPress={ props.handleConfirmationBorrowed } style={ styles.mainButton }>
                                CONFIRM TRANSACTION
                            </Button>
                        );
                        break;
    
                    case 'BORROWED':
                        content.push(
                            <Button onPress={ props.handleConfirmationReturned } style={ styles.mainButton }>
                                RETURN ITEMS
                            </Button>
                        );
                        break;
                
                    default:
                        content.push(
                            <Layout></Layout>
                        )
                        break;
                }    
            }else {
                switch (props.transaction.status) {
                    case 'APPOINTMENT':
                        content.push(
                            <Button 
                                onPress={ props.handleConfirmationBorrowed } 
                                style={ styles.mainButton }
                            >
                                CONFIRM TRANSACTION
                            </Button>
                        );
                        break;
    
                    case 'BORROWED':
                        content.push(
                            <Button onPress={ props.handleConfirmationReturned } style={ styles.mainButton }>
                                RETURN ITEMS
                            </Button>
                        );
                        break;

                    default:
                        content.push(
                            <Layout></Layout>
                        )
                        break;
                }
            }
            return content;
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
    mainButton: {
        ...generalSty.mlTop
    }
});

export { BottomContent };