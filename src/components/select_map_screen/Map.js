import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Map = (props) => {

    const setContent = () => {
        if (props.isCurrentUserSet) {
            return (
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    initialRegion={{
                        latitude: props.currentLatitude,
                        longitude: props.currentLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    minZoomLevel={ 17 }
                    onRegionChangeComplete={ response => props.setLocationName(response.latitude, response.longitude) }
                    style={ styles.map }
                />
            );
        }

        return null;
    }

    return (
        <Layout style={ styles.mapContainer }>
            { setContent() }
        </Layout>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },

    map: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0, 
        flex: 1
    }
})

export { Map };