// This function is just testing manipulation data such as get, save, update or delete data (dummy)

const dummyFunctionData = () =>{
    return new Promise(function(resolve, reject) {
        response = {};
    
        try {
            /** ERROR TRIGGER (UNCOMENT TO ACTIVATE!) */
            // a = b + c;
            /** ERROR TRIGGER (UNCOMENT TO ACTIVATE!) */
    
            response = {
                result: { data: 'data' },
                message: 'Data was saved successfully.',
            };
    
            resolve(response);
        } catch (error) {
            response = {
                result: { data: 'data' },
                message: 'Data was failed get or save.',
            };
    
            reject(response);
        }
    });
}

export { dummyFunctionData }