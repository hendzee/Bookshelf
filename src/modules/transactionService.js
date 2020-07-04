import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Add transaction */
const addTransaction = (data) => {
    return new Promise(function(resolve, reject) {
        var response = {};
        var message = '';
        var dataSend = {
            owner_id: data.ownerId,
            borrower_id: data.borrowerId,
            item_id: data.itemId
        }

        axios.post(prefix + '/transactions', dataSend)
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

/** Show transaction */
const showTransaction = (id) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';

        axios.get(prefix + '/transactions/' + id)
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

/** Update to waiting */
const updateToWaiting = (id) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';

        axios.post(prefix + '/transactions/update/waiting/' + id)
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
const updateToAppointment = (id) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';

        axios.post(prefix + '/transactions/update/appointment/' + id)
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
const updateToCancel = (id) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';

        axios.post(prefix + '/transactions/update/cancel/' + id)
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
const updateMap = (data) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = '';
        var id = data.transactionId;
        var dataSend = {
            map_lat: data.currentLatitude.toString(),
            map_long: data.currentLongitude.toString(),
            map_note: data.note
        }

        axios.post(prefix + '/transactions/update/map/' + id, dataSend)
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

export { 
    addTransaction, 
    showTransaction, 
    updateToWaiting, 
    updateToAppointment, 
    updateToCancel,
    updateMap
}