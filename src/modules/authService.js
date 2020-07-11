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

export { login }