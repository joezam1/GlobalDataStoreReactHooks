import React , {useReducer, useState} from 'react';
import DataStoreReducer from './dataStore/DataStoreReducer.js';
import DataStoreInvoker from './dataStore/DataStoreInvoker.js';
import Utils from './library/Utils.js';





export default function Midsection(){
    const [filteredProducts, dispatch] = useReducer(DataStoreReducer.storeReducer);
    const [selectedProducts, setProductsStateAsync] = useState();
    const [activeCategories, setCategoriesStateAsync] = useState();
    const [activeStatuses , setStatusesStateAsync] = useState();


    function getSelectedStatusName(id){
        var statuses =(Utils.isValid(activeStatuses)) ? activeStatuses : [];
       for(var a=0; a<statuses.length; a++){
         if(statuses[a].StatusId===id){
           return statuses[a].Name;
         }
       }
       return '';
   }
   function getSelectedCategoryName(id){
    var categories =(Utils.isValid(activeCategories)) ? activeCategories : [];
   for(var a=0; a<categories.length; a++){
     if(categories[a].CategoryId===id){
       return categories[a].Name;
     }
   }
   return '';
}

   function getSelectedCategory(event){
        var defaultCategoryId = -1
        var activeCategoryId = DataStoreInvoker.getDataStoreState('activeCategoryId');
        var currentCategoryId  = (typeof(activeCategoryId) === 'number') ? activeCategoryId : defaultCategoryId;
        var id = parseInt(event.target.id);
        event.stopPropagation();
        if(id===currentCategoryId){
            var filter = {
                categoryId: defaultCategoryId
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            //Utils.removeClassNameFromClassList('product-category-button','status-active')
        }
        else if(id !==currentCategoryId){
            var filter = {
                categoryId: id
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
            //Utils.addClassNameToClassListById(id,'product-category-button','status-active');
        }
    }

    function productsCallback(products){
        console.log('MidSection-productsCallback-triggered')
        setProductsStateAsync(products);
    }

    function categoriesCallback(categories){
        console.log('MidSection-categoriesCallback-triggered')
            setCategoriesStateAsync(categories); 
    }

    function statusesCallback(statuses){
        console.log('MidSection-statusesCallback-triggered')
            setStatusesStateAsync(statuses);
    }

    DataStoreInvoker.publishDataStoreState('categoriesOnDisplay','categoryCallback', categoriesCallback);
    DataStoreInvoker.publishDataStoreState('statusesOnDisplay','statusCallback1', statusesCallback);
    DataStoreInvoker.publishDataStoreState('productsOnDisplay','productsCallback', productsCallback);

    var categories = (activeCategories !== undefined) ?
                     activeCategories.map((item)=>{
                     return <li key={item.CategoryId} id ={item.CategoryId} className="category-li"> 
                                 <button type = "button" 
                                         id = {item.CategoryId}
                                         className = "product-category-button bton"
                                         onClick = {getSelectedCategory}
                                         >{item.Name}
                                 </button>
                            </li>;
                  }) :"Not Loaded";


    var productsLoaded = (selectedProducts !== undefined) ?
                        selectedProducts.map((item)=>{
                        return  <div key={item.ProductId} className="card" id={item.ProductId}>
                                    <div className="button-buy-now">Buy Now</div>
                                    <div className="product-container" id={item.ProductId} >
                                        <div className="price-container" id={item.ProductId} ></div>
                                        <h3 className="product-price" id={item.ProductId} item={item}> ${item.Price} </h3>
                                        {/* <img src={'./src/assets/products/' + item.ImageHref1} id={item.ProductId} className="product-image"/> */}
                                        <div className="category-text-container" id={item.ProductId} ></div>
                                        <span className='category-text' id={item.ProductId}> {getSelectedCategoryName(item.CategoryId)}</span>
                                        <br/>
                                        <span className='category-text' id={item.ProductId}> {getSelectedStatusName(item.StatusId)}</span>
                                    </div>
                                </div>
                    }) : "Not loaded";
                   


    return (<div className="mid-secton">
            Mid section
            <div className="mid-category-container">
                <ul className='mid-section-category-items'>
                {categories}
                </ul>
            </div>
            
            <div className="mid-section-products-container"> 
            <div className="mid-section-products-items">
                {productsLoaded}
            </div>
            </div>            
            <br/>           
        </div>)
}