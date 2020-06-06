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

export { getItem, getLatestItem, getRecomendationItem, getRandomItem, getSpecificItem };