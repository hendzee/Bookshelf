import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Get all data */
const getItem = async () => {
    var response = {};
    var data = [];
    var stat = status.OK;
    var message = '';

    data = await axios.get(prefix + '/items?user=true');
    
    response = {
        data: data.data,
        message: message,
        status: stat
    };

    return response;
}

/** Get latest items */
const getLatestItem = async () => {
    var response = {};
    var data = [];
    var stat = status.OK;
    var message = '';

    data = await axios.get(prefix + '/items?latest=true');
    
    response = {
        data: data.data,
        message: message,
        status: stat
    };

    return response;
}

/** Get recomendation items */
const getRecomendationItem = async () => {
    var response = {};
    var data = [];
    var stat = status.OK;
    var message = '';

    data = await axios.get(prefix + '/items?recomendation=true');
    
    response = {
        data: data.data,
        message: message,
        status: stat
    };

    return response;
}

/** Get random items */
const getRandomItem = async () => {
    var response = {};
    var data = [];
    var stat = status.OK;
    var message = '';

    data = await axios.get(prefix + '/items?random=true');
    
    response = {
        data: data.data,
        message: message,
        status: stat
    };

    return response;
}

/** Get specific items */
const getSpecificItem = async (id) => {
    var response = {};
    var data = [];
    var stat = status.OK;
    var message = '';

    data = await axios.get(prefix + '/items/' + id);
    
    response = {
        data: data.data,
        message: message,
        status: stat
    };

    return response;
}

/** Add new item */
const addItem = async (data) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var formData = new FormData();
        var stat = status.OK;

        formData.append('user_id', data.userId);
        formData.append('category', data.category);
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
                    status: stat
                }; 
    
                resolve(response);
            })
            .catch(error => {
                response = {
                    data: null,
                    message: JSON.stringify(error),
                    status: status.ERROR
                };

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