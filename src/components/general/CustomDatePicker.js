import React from 'react';
import { Layout } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDate } from '../../modules';

const CustomDatePicker = (props) => {
    /** Check date set or not */
    const checkDate = (status) => {
        if (status === 'set') {
            return true;
        }

        return false;
    }

    const setContent = () => {
        if (props.show !== 'undefined' && props.show) {
            return (
                <DateTimePicker
                    testID='ID'
                    value={ new Date() }
                    mode={ 'date' }
                    is24Hour={ true }
                    display='spinner'
                    onChange={ (event, selectedDate) => {
                        let isSet = checkDate(event.type);
                        let newDate = convertDate(selectedDate);

                        props.setDate(isSet, newDate);
                    }}
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