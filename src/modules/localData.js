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
        AsyncStorage.getItem('userData')
            .then(result => {
                if (result === null ) throw(0);
                console.log(JSON.stringify(result))
                resolve(1);
            })
            .catch(_ => {
                reject(0);
            })
    });
}

const removeUserData = () => {
    return new Promise(function(resolve, reject){
        AsyncStorage.clear()
        .then(_ => {
            console.log('Success remove local data.');
            resolve(1);
        })
        .catch(_ => {
            console.log('Error to sign out.');
            reject(0);
        })
            
    });
}

export { setUserData, getUserData, removeUserData };