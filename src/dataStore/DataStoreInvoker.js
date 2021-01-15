const topCounter = 50;
const intervalInMilliseconds = 500;
var intervalId = 0;

var storeUpdateWatcher = {
    initialStateCounter:0,
    updatedStateCounter:0
}

var dataStoreClone={};

const callbackFunctionSubscribers = [
    {
        callbackFunctionName:'productsCallback',
        executed:false
    },
    {
        callbackFunctionName:'categoryCallback',
        executed:false
    },
    {
        callbackFunctionName:'statusCallback',
        executed:false
    },
    {
        callbackFunctionName:'statusCallback1',
        executed:false
    },
    {
        callbackFunctionName:'countProductsCallback',
        executed:false
    }
]


function watchReducerUpdate(dataStoreObj){
    dataStoreClone = Object.assign({},dataStoreObj);

    storeUpdateWatcher.updatedStateCounter +=1;

    for(var c =0; c< callbackFunctionSubscribers.length; c++){
        callbackFunctionSubscribers[c].executed = false;
    }
}

const getDataStoreState = function(property){
    var dataStorePropertyValue = dataStoreClone[property];
    return dataStorePropertyValue;
 } 


const publishDataStoreState = function(property, callbackName, propertyCallback){

   intervalId =  setInterval(function(){ 
        //code goes here that will be run every milliseconds interval.
        console.log('DataStoreInvoker-interval-triggered');
        console.log('initialStateCounter:',storeUpdateWatcher.initialStateCounter);
        console.log('updateStateCounter:',storeUpdateWatcher.updatedStateCounter)
        if(storeUpdateWatcher.initialStateCounter < storeUpdateWatcher.updatedStateCounter){
            
            propertyCallback(dataStoreClone[property]);            
            setCallbackFunction(callbackName, true);
            var allCallbacksExecuted = areCallbackSubscribersExecuted();
            if(allCallbacksExecuted){
                storeUpdateWatcher.initialStateCounter = storeUpdateWatcher.updatedStateCounter;
                if(storeUpdateWatcher.initialStateCounter == topCounter){
                    storeUpdateWatcher.initialStateCounter = 0;
                    storeUpdateWatcher.updatedStateCounter = 0;
                }
            }
        }
    }, intervalInMilliseconds);

    return dataStoreClone[property];
}


const invoker = {
    watchReducerUpdate : watchReducerUpdate,
    getDataStoreState : getDataStoreState,
    publishDataStoreState : publishDataStoreState,    
}

export default invoker;

//#region Private Methods

function areCallbackSubscribersExecuted(){
    var totalCallbacks = callbackFunctionSubscribers.length;

    var result = countCallbackFunctionsExecuted();
    var allExecuted = (result === totalCallbacks)? true: false;
    return allExecuted;
}

function setCallbackFunction( callbackName, value){
    var totalCallbacks = callbackFunctionSubscribers.length;
    for(var a = 0; a<totalCallbacks; a++)
    {
        if(callbackFunctionSubscribers[a].callbackFunctionName === callbackName)
        {
            callbackFunctionSubscribers[a].executed = value;
        }
    }
}

function countCallbackFunctionsExecuted(){
    var counter = 0;
    for(var a = 0; a<callbackFunctionSubscribers.length; a++)
    {
        if(callbackFunctionSubscribers[a].executed == true)
        {
            counter++;
        }
    }
    return counter;
}
//#endregion Private Methods