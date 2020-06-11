import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Get all data */
const getItem = async () => {
    var response = {};
    var message = '';
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?user=true')
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Get latest items */
const getLatestItem = async () => {
    var response = {};
    var message = '';
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?latest=true')
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Get recomendation items */
const getRecomendationItem = async () => {
    var response = {};
    var message = '';
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?recomendation=true')
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Get random items */
const getRandomItem = async () => {
    var response = {};
    var message = '';
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?random=true')
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Get specific items */
const getSpecificItem = async (id) => {
    var response = {};
    var message = '';
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items/' + id)
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Add new item */
const addItem = async (data) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var formData = new FormData();

        formData.append('user_id', data.userId);
        formData.append('category', data.category.text);
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('publish_date', data.publishDate);
        formData.append('cover', {
            uri: data.cover.path,
            type: 'image/jpg',
            name: 'image.jpg'
        });

        axios.post(prefix + '/items', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Data was Saved.',
                    status: status.OK
                }; 
    
                resolve(response);
            })
            .catch(error => {
                response = {
                    data: null,
                    message: JSON.stringify(error),
                    status: status.ERROR
                };
                console.log(JSON.stringify(error))
                reject(response);
            })
    });
}

export { 
    getItem, 
    getLatestItem, 
    getRecomendationItem, 
    getRandomItem, 
    getSpecificItem,
    addItem 
};