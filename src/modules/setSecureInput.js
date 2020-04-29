// Help to set value on textinput type password

const setSecureInput = (inputList, selectedIndex) => {
    let tempList = inputList;

    for (let i=0; i<tempList.length; i++ ) {
        if (i === selectedIndex) {
            tempList[i] === true ? tempList[i] = false : tempList[i] = true;
        }
    }
    
    return tempList;
}

export { setSecureInput };