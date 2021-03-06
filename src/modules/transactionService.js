import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Add transaction */
const addTransaction = (data, token) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var message = '';
        var dataSend = {
            owner_id: data.ownerId,
            borrower_id: data.borrowerId,
            item_id: data.itemId
        }
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions', dataSend, {
            headers: { 'Authorization':  auth }
        })
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Item was added',
                    status: status.OK
                }
                resolve(response);
            })
            .catch(error => {
                message = 'There is error.'
                
                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: null,
                    message: message,
                    status: status.ERROR
                }
                
                reject(response);
            })
    })
}

/** Show cart data */
const showCart = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

    axios.get(prefix + '/transactions/?borrower_id=' + id, {
        headers: { 'Authorization':  auth }
    })
    .then(result => {
        response = {
            data: result.data,
            message: 'Item was added',
            status: status.OK
        }
        resolve(response);
    })
    .catch(error => {
        message = 'There is error.'

        if (error.response) {
            message = error.response.data.message
        }

        response = {
            data: null,
            message: message,
            status: status.ERROR
        }
        reject(response);
    })
})}

/** Show transaction */
const showTransaction = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix + '/transactions/' + id, {
            headers: { 'Authorization':  auth }
        })
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Item was added',
                    status: status.OK
                }
                resolve(response);
            })
            .catch(error => {
                message = 'There is error.'
                
                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: null,
                    message: message,
                    status: status.ERROR
                }
                reject(response);
            })
    })
}

/** Show list transaction */
const showListTransaction = (id, data, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.get(prefix + '/transactions/show-list/' + id + '?person=' + data, {
            headers: { 'Authorization':  auth }
        })
            .then(result => {
                if (result.data.notFound) {
                    response = {
                        data: null,
                        message: 'Item was added',
                        status: status.OK
                    }
                }else {
                    response = {
                        data: result.data,
                        message: 'Item was added',
                        status: status.OK
                    }
                }

                resolve(response);
            })
            .catch(error => {
                message = 'There is error.'

                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: null,
                    message: message,
                    status: status.ERROR
                }
                reject(response);
            })
    })
}

/** Update to waiting */
const updateToWaiting = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/waiting/' + id, null, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: result.data,
                message: 'Request was send.',
                status: status.OK
            }
            resolve(response);
        })
        .catch(error => {
            message = 'There is error.'
            
            if (error.response) {
                if (error.response.data.message) {
                    message = error.response.data.message
                }else {
                    message = 'Failed to request'
                }
            }

            response = {
                data: null,
                message: message,
                status: status.ERROR
            }
            
            reject(response);
        })
    });
}

/** Update to make appointment */
const updateToAppointment = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/appointment/' + id, null, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: result.data,
                message: 'Request accepted.',
                status: status.OK
            }

            resolve(response);
        })
        .catch(error => {
            message = 'There is error.'
            
            if (error.response) {
                message = error.response.data.message
            }

            response = {
                data: null,
                message: message,
                status: status.ERROR
            }
            reject(response);
        })
    });
}

/** Update to make appointment */
const updateToBorrowed = (id, data, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var dataSend = {
            owner_status: data
        }
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/borrowed/' + id, dataSend, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: result.data,
                message: result.data,
                status: status.OK
            }

            resolve(response);
        })
        .catch(error => {
            message = 'There is error.'
            
            if (error.response) {
                message = error.response.data.message
            }

            response = {
                data: null,
                message: message,
                status: status.ERROR
            }
            reject(response);
        })
    });
}

/** Update to make returned */
const updateToReturned = (id, data, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var dataSend = {
            owner_status: data
        }
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/returned/' + id, dataSend, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: result.data,
                message: result.data,
                status: status.OK
            }

            resolve(response);
        })
        .catch(error => {
            message = 'There is error.'
            
            if (error.response) {
                message = error.response.data.message
            }

            response = {
                data: null,
                message: message,
                status: status.ERROR
            }
            reject(response);
        })
    });
}

/** Update to cancel */
const updateToCancel = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/cancel/' + id, null, {
            headers: { 'Authorization': auth }
        })
        .then(result => {
            response = {
                data: result.data,
                message: 'Cancelled transaction.',
                status: status.OK
            }
            resolve(response);
        })
        .catch(error => {
            message = 'There is error.'
            
            if (error.response) {
                message = error.response.data.message
            }

            response = {
                data: null,
                message: message,
                status: status.ERROR
            }
            reject(response);
        })
    });
}

/** Update map */
const updateMap = (data, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var id = data.transactionId;
        var dataSend = {
            location_name: data.locationName,
            map_lat: data.currentLatitude.toString(),
            map_long: data.currentLongitude.toString(),
            map_note: data.note
        }
        var auth = 'Bearer ' + token;

        axios.post(prefix + '/transactions/update/map/' + id, dataSend, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Map updated.',
                    status: status.OK
                }
                resolve(response);
            })
            .catch(error => {
                message = 'There is error.'
                
                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: null,
                    message: message,
                    status: status.ERROR
                }

                reject(response);
            })
    });
}

/** Delete loan item */
const deleteLoanItem = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var formData = new FormData();
        var auth = 'Bearer ' + token;

        formData = {
            _method: 'DELETE'
        }

        axios.post(prefix + '/loans/' + id, formData, {
            headers: { 'Authorization': auth }
        })
            .then(result => {
                response = {
                    data: result.data,
                    message: 'Data deleted.',
                    status: status.OK
                }
                resolve(response);
            })
            .catch(error => {
                message = 'There is error.'
                
                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: null,
                    message: message,
                    status: status.ERROR
                }

                reject(response);
            })
    });
}

export { 
    addTransaction,
    showCart,
    showTransaction,
    showListTransaction,
    updateToWaiting, 
    updateToAppointment, 
    updateToBorrowed,
    updateToReturned,
    updateToCancel,
    updateMap,
    deleteLoanItem
}