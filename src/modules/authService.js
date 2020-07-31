import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

const login = (data) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = 'Data wrong.';

        axios.post(prefix + '/login', data)
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };
                
                resolve(response);
            })
            .catch(error => {
                message = 'Login failed.';

                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: [],
                    message: message,
                    status: status.ERROR
                };
                
                reject(response);
            });
    })
}

const register = (data) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = 'Data wrong.';
        var dataSend = {
            email: data.email,
            password: data.password,
            first_name: data.firstName,
            last_name: data.lastName
        }

        axios.post(prefix + '/register', dataSend)
            .then(result => {
                response = {
                    data: result.data,
                    message: message,
                    status: status.OK
                };
                
                resolve(response);
            })
            .catch(error => {
                message = 'Register failed.';

                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: [],
                    message: JSON.stringify(message),
                    status: status.ERROR
                };
                
                reject(response);
            });
    })
}

const getProfileData = (id, token) => {
    return new Promise(function(resolve, reject){
        var response = {};
        var message = 'Data wrong.';
        var auth = 'Bearer ' + token;

        axios.get(prefix + '/users/' + id, {
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
                message = 'Cant get data.';

                if (error.response) {
                    message = error.response.data.message
                }

                response = {
                    data: [],
                    message: JSON.stringify(message),
                    status: status.ERROR
                };
                
                reject(response);
            });
    })
}

export { login, register, getProfileData }