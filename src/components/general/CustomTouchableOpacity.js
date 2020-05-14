import React from 'react';
import { TouchableOpacity } from 'react-native';

const CustomTouchableOpacity = (props) => {
    return (
        <TouchableOpacity { ...props } activeOpacity={ 0.8 } onPress={ props.onPress }>
            { props.children }
        </TouchableOpacity>
    );
}

export { CustomTouchableOpacity };