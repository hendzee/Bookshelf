/** This function is give period or interval before execution function */
const addPeriod = async (paramFunction) => {
    setTimeout(() => {
        paramFunction();
    }, 1000);
}

export { addPeriod };