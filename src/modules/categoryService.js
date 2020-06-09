import axios from 'axios';
import { prefix } from './endpoint';
import { status } from './status';

/** Get categories */
const getCategory = () => {
    var response = {};
    var message = 'Data was received.';

    return new Promise(function(resolve, reject) {
        axios.get(prefix + '/categories')
            .then(result => {
                response = {
                    data: extractGetCategory(result.data),
                    message: message,
                    status: status.OK
                };
                
                resolve(response);
            })
            .catch(error => {
                message = JSON.stringify(error);

                response = {
                    data: [],
                    message: message,
                    status: status.ERROR
                };
                
                reject(response);
            });
    });
}

/** Extract get category */
const extractGetCategory = (categories) => {
    return categories.map(item => {
        return { text: item.lable }
    });
}

export { getCategory };