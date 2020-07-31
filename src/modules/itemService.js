import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Get all data */
const getItem = async (page, token) => {
    return new Promise(function (resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix + '/items?user=true&page=' + page, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: result.data.current_page,
                    nextPage: result.data.next_page_url,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: 0,
                    nextPage: null,
                    status: status.ERROR
                };

                reject(response);
            });
    });
}

/** Get all data with specific id */
const UserGetItem = async (data, page, token) => {
    return new Promise(function (resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix + '/items?user_specific=true'
            + '&user_id=' + data.userId
            + '&page=' + page, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: result.data.current_page,
                    nextPage: result.data.next_page_url,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: 0,
                    nextPage: null,
                    status: status.ERROR
                };

                reject(response);
            });
    });
}

/** Get latest items */
const getLatestItem = async (token) => {
    var response = {};
    var message = '';
    
    var auth = 'Bearer ' + token;

    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?latest=true', {
            headers: { 'Authorization': auth }
        })
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
const getRecomendationItem = async (token) => {
    var response = {};
    var message = '';
    var auth = 'Bearer ' + token;
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?recomendation=true', {
            headers: { 'Authorization': auth }
        })
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
                    data: error.data,
                    message: message,
                    status: status.OK
                };

                reject(response);
            });
    });
}

/** Get random items */
const getRandomItem = async (token) => {
    var response = {};
    var message = '';
    var auth = 'Bearer ' + token;
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?random=true', {
            headers: { 'Authorization': auth }
        })
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
const getSpecificItem = async (id, token) => {
    var response = {};
    var message = '';
    var auth = 'Bearer ' + token;
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items/' + id, {
            headers: { 'Authorization': auth }
        })
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

/** Extract search */
const extractSearch = (data) => {
    return data.map((item, index) => {
        return {
            id: index,
            title: item.title
        }
    })
}

/** Search item */
const searchItem = async (search, token) => {
    var response = {};
    var message = '';
    var auth = 'Bearer ' + token;
    var searchText = search;
    
    return new Promise(function (resolve, reject){
        axios.get(prefix + '/items?search=' + searchText, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: extractSearch(result.data),
                message: message,
                status: status.OK
            };

            resolve(response);
        })
        .catch(error => {
            message = JSON.stringify(error);

            response = {
                data: error.data,
                message: message,
                status: status.OK
            };

            reject(response);
        });
    });
}

/** Search user item */
const userSearhItem = async (data, token) => {
    var response = {};
    var message = '';
    var auth = 'Bearer ' + token;
    
    return new Promise(function (resolve, reject){
        axios.get(prefix 
            + '/items?search_with_user=true'
            + '&user_id=' + data.userId
            + '&text=' + data.text , {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: extractSearch(result.data),
                message: message,
                status: status.OK
            };

            resolve(response);
        })
        .catch(error => {
            message = JSON.stringify(error);

            response = {
                data: error.data,
                message: message,
                status: status.OK
            };

            reject(response);
        });
    });
}

/** Search detail */
const searchItemDetail = async (data, page, token) => {
    return new Promise(function (resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix 
            + '/items?search_detail=' 
            + data.search
            + '&order_by='
            + data.orderBy
            + '&asc='
            + data.ASC 
            + '&page=' + page, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: result.data.current_page,
                    nextPage: result.data.next_page_url,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: error.data.data,
                    message: message,
                    currentPage: 0,
                    nextPage: null,
                    status: status.ERROR
                };

                reject(response);
            });
    });
}

/** Search item with specific user */
const userSearchItemDetail = async (data, page, token) => {
    return new Promise(function (resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix 
            + '/items?search_detail_with_user=true' 
            + '&search_detail_value=' + data.searchDetail
            + '&user_id=' + data.userId
            + '&order_by='
            + data.orderBy
            + '&asc='
            + data.ASC 
            + '&page=' + page, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data.data,
                    message: message,
                    currentPage: result.data.current_page,
                    nextPage: result.data.next_page_url,
                    status: status.OK
                };

                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: error.data.data,
                    message: message,
                    currentPage: 0,
                    nextPage: null,
                    status: status.ERROR
                };

                reject(response);
            });
    });
}

/** Add new item */
const addItem = async (data, token) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var formData = new FormData();
        var auth = 'Bearer ' + token;

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

        axios.post(prefix + '/items', formData, { headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization':  auth
        }})
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
                reject(response);
            })
    });
}

/** Update item */
const updateItem = async (data, id, token) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var formData = new FormData();
        var auth = 'Bearer ' + token;

        formData.append('category', data.category.text);
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('publish_date', data.publishDate);
        formData.append('_method', 'PUT');

        if (data.cover !== null) {
            formData.append('cover', {
                uri: data.cover.path,
                type: 'image/jpg',
                name: 'image.jpg'
            });
        }

        axios.post(prefix + '/items/' + id, formData, {
            headers: {
                'Authorization':  auth, 
                'Content-Type': 'multipart/form-data' 
            }})
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Data was updated.',
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

                reject(response);
            })
    });
}

/** Delete item */
const deleteItem = (id, token) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var formData = new FormData();
        var auth = 'Bearer ' + token;

        formData.append('_method', 'DELETE');

        axios.post(prefix + '/items/' + id, formData, {
            headers: {
                'Authorization':  auth, 
                'Content-Type': 'multipart/form-data' 
            }})
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Data was deleted.',
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
                
                reject(response);
            })
    });
}

export { 
    getItem,
    UserGetItem,
    getLatestItem, 
    getRecomendationItem, 
    getRandomItem, 
    getSpecificItem,
    searchItem,
    searchItemDetail,
    userSearhItem,
    userSearchItemDetail,
    addItem,
    updateItem,
    deleteItem
};