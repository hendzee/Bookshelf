import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = (props) => {

    return (
        <Layout style={ styles.mapContainer }>
            <MapView
                provider={ PROVIDER_GOOGLE }
                initialRegion={{
                    latitude: parseFloat(props.currentLatitude),
                    longitude: parseFloat(props.currentLongitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                minZoomLevel={ 17 }
                style={ styles.map }
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(props.currentLatitude),
                        longitude: parseFloat(props.currentLongitude)
                    }}
                    title='Meeting point'
                    description='Here is your meeting point'
                />
            </MapView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
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