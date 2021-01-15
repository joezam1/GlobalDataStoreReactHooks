import React ,{useState} from 'react';
import DataStoreInvoker from './dataStore/DataStoreInvoker.js';

export default function BottomSection(){

    const [categoryName, setStateCategory] = useState();
    const [statusName, setStateStatus] = useState();
    const [productsCounter , setStateCount] = useState();
    
    function countProductsCallback(productsCount){
        console.log('bottomSection-countProductsCallback-triggered');
        var categoryObj = getCurrentCategory();
        var categoryName = (categoryObj !=null) ? categoryObj.Name : 'Not Selected';
        setStateCategory(categoryName);
        var statusObj = getCurrentStatus();
        var statusName = (statusObj !==null) ? statusObj.Name : 'Not selected';
        setStateStatus(statusName); 

        setStateCount(productsCount);
    }

    function getCurrentCategory(){
        var currentCategoryId = DataStoreInvoker.getDataStoreState('activeCategoryId');
        var categoriesOnDisplay = DataStoreInvoker.getDataStoreState('categoriesOnDisplay');
        for(var a=0; a<categoriesOnDisplay.length; a++){
            if(categoriesOnDisplay[a].CategoryId === currentCategoryId){
                return categoriesOnDisplay[a]
            }
        }
        return null;
    }

    function getCurrentStatus(){
        var currentStatusId = DataStoreInvoker.getDataStoreState('activeStatusId');
        var statusesOnDisplay = DataStoreInvoker.getDataStoreState('statusesOnDisplay');
        for(var a=0; a<statusesOnDisplay.length; a++){
            if(statusesOnDisplay[a].StatusId === currentStatusId){
                return statusesOnDisplay[a]
            }
        }
        return null;
    }

    DataStoreInvoker.publishDataStoreState('countProductsOnDisplay','countProductsCallback', countProductsCallback);

    return (<div>
        Bottom Section
        <br/>
        Products on display: {productsCounter}
        <br/>
        ActiveStatus : {statusName}
        <br/>       
        Active Category : {categoryName}
    </div>)
} 