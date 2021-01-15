
var isValid = function(selectedInput){
    if(selectedInput !=null && selectedInput !== undefined)
    {
        return true;
    }
    return false;
}

var inputIsNumber = function(selectedInput){
    if(!isNaN(selectedInput) && typeof selectedInput === 'number' ){
        return true;
    }
    return false;
}

const Utils = {
    isValid : isValid,
    inputIsNumber : inputIsNumber
}

export default Utils;