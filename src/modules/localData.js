import AsyncStorage from '@react-native-community/async-storage';

const setUserData = (data) => {
    return new Promise(function(resolve, reject){
        let parsedData = JSON.stringify(data);

        AsyncStorage.setItem('userData', parsedData)
            .then(_ => {
                console.log('Success saved to local data.');
                resolve(1);
            })
            .catch(_ => {
                console.log('Failed to save to local data.');
                reject(0);
            })
    });
}

const getUserData = () => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';

        AsyncStorage.getItem('userData')
            .then(result => {
                response = {
                    data: result.data
                }

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    message: message 
                }

                reject(response);
            })
    });
}

export { setUserData, getUserData };