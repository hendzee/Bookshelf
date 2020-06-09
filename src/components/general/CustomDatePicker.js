import React from 'react';
import { Layout } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = (props) => {
    const setContent = () => {
        if (props.show !== 'undefined' && props.show) {
            return (
                <DateTimePicker
                    testID='ID'
                    value={ new Date() }
                    mode={ 'date' }
                    is24Hour={ true }
                    display='spinner'
                    onChange={ date => props.setDate('TESTING') }
                    onTouchCancel={ () => alert('CANCEL BOSS') }
                />
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

export { CustomDatePicker };