import React, {useEffect, useReducer} from 'react';
import TopSection from './TopSection.js';
import MidSection from './MidSection.js';
import BottomSection from './BottomSection.js';
import DataStoreReducer from './dataStore/DataStoreReducer.js';
import jsonDataFile from '../Data.json';

export default function App(){

    const [value, dispatch] = useReducer(DataStoreReducer.storeReducer);

    function mockResponseCallback(){
        console.log("------------mock API request BEGIN----------");
        console.log(jsonDataFile);
        var initialProducts = jsonDataFile.products;
        var initialCategories = jsonDataFile.categories;
        var initialStatuses = jsonDataFile.statuses;
        console.log("------------mock API request END----------");
        console.log('all products: ', initialProducts);

        const initialPayload = {
            products:initialProducts,
            categories:initialCategories,
            statuses: initialStatuses,
            statusId:-1
        }
        dispatch({type:'SET_INITIAL_STATE', payload:initialPayload});

    }

    useEffect(function(){
        console.log('app.sj - useEffect-ComponentMounted');
        mockResponseCallback();
    },[]);

    return (<div>
        <br/>
        <TopSection/>
        <MidSection/>
        <BottomSection/>
    </div>)
}
