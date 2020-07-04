import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { locationiq_token } from '../../env.json';

/** Get user location */
const getUserLocation = () => {
    let response = {};

    return new Promise(function(resolve, reject) {
        let data = {
            latitude: 0,
            longitude: 0
        }

        Geolocation.getCurrentPosition(onSuccess => {
            data = {
                latitude: onSuccess.coords.latitude,
                longitude: onSuccess.coords.longitude
            }

            response = { 
                data: data
            }

            resolve(response);

        }, onError => {
            response ={ 
                message: onError.message
            }

            reject(response);
        });
    });
}

/** Get location name */
const getLocationName = (latitude, longitude) => {
    return new Promise(function(resolve, reject){
        let response = {};

        axios.get('https://us1.locationiq.com/v1/reverse.php?key=' + locationiq_token + '&lat=' + latitude + '&lon=' + longitude + '&format=json')
            .then(result => {
                response = {
                    data: result.data.display_name 
                }

                resolve(response);
            })
            .catch((error) => {
                alert('internal' + JSON.stringify(error))
                response = {
                    message: JSON.stringify(error)
                }

                reject(response)
            })
    });

}

export { getUserLocation, getLocationName }