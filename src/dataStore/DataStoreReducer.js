import DataStoreInvoker from './DataStoreInvoker.js';
import Utils from '../library/Utils.js';

var baseProducts = [];

const dataStore = {
    productsOnDisplay:[],
    categoriesOnDisplay:[],
    statusesOnDisplay:[],
    activeStatusId: -1,
    activeCategoryId:-1,
    singleProduct: {},
    countProductsOnDisplay:0
}


var storeReducer = function(state, action){

    switch(action.type)
    {
        case "SET_INITIAL_STATE":
            baseProducts = action.payload.products;
            dataStore.categoriesOnDisplay = action.payload.categories;
            dataStore.statusesOnDisplay = action.payload.statuses;
            dataStore.activeStatusId = action.payload.statusId;
            dataStore.productsOnDisplay = action.payload.products;
            dataStore.countProductsOnDisplay = dataStore.productsOnDisplay.length;
            DataStoreInvoker.watchReducerUpdate(dataStore); 
            return
        
        case "FILTER_PRODUCTS":
            var categoryIdPayload = action.payload.categoryId;
            var statusIdPayload = action.payload.statusId;

            var selectedCategoryId = (Utils.isValid(categoryIdPayload)) ? categoryIdPayload: dataStore.activeCategoryId;
            var selectedStatusId = (Utils.isValid(statusIdPayload)) ? statusIdPayload: dataStore.activeStatusId;
            
            var selectedProducts = getSelectedProducts(baseProducts,  selectedCategoryId, selectedStatusId);
            
            dataStore.productsOnDisplay = selectedProducts;
            dataStore.activeCategoryId = selectedCategoryId;
            dataStore.activeStatusId = selectedStatusId;
            dataStore.countProductsOnDisplay = selectedProducts.length;            
            DataStoreInvoker.watchReducerUpdate(dataStore);

            return selectedProducts;

        case 'SET_ACTIVE_STATUS':
            dataStore.activeStatusId = Utils.inputIsNumber(action.payload) ? action.payload :  dataStore.activeStatusId;
            DataStoreInvoker.watchReducerUpdate(dataStore);

            return dataStore.activeStatusId;

        case 'SET_ACTIVE_CATEGORY':
            dataStore.activeCategoryId = Utils.inputIsNumber(action.payload) ? action.payload : dataStore.activeCategoryId;
            DataStoreInvoker.watchReducerUpdate(dataStore);

            return dataStore.activeCategoryId;

        default:
            return componentState;;
    }
}

var DataStoreReducer = {
    storeReducer : storeReducer
}

export default DataStoreReducer;


/******private Methods */
function getSelectedProducts(productsArray, selectedCategoryId, selectedStatusId)
{
    var selectedProducts = [];

    if(selectedStatusId === -1 && selectedCategoryId === -1){
        //return all products
        selectedProducts = JSON.parse(JSON.stringify(productsArray));
    }

    else if(selectedStatusId !== -1 && selectedCategoryId === -1){
        //return all products filtered by Status
        function productFilterCallback(product){
            var result = (product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    else if(selectedStatusId === -1 && selectedCategoryId !== -1){
        //return all products filtered by Category
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    else if(selectedStatusId !== -1 && selectedCategoryId !== -1){
        //return all products filtered by Category and Status
        function productFilterCallback(product){
            var result = (product.CategoryId === selectedCategoryId && product.StatusId === selectedStatusId)
            return result;
        }
        selectedProducts = productsArray.filter(productFilterCallback);
    }

    return selectedProducts;
}
/****private Methods END */