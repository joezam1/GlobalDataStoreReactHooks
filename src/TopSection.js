import React, {useState, useReducer} from 'react';
import DataStoreReducer from './dataStore/DataStoreReducer';
import DataStoreInvoker from './dataStore/DataStoreInvoker.js';



export default function TopSection(){
    const [activeStatuses, setStatusesState] = useState();
    const [activeProducts, dispatch] = useReducer(DataStoreReducer.storeReducer);
    const defaultStatusId = -1;


    function getSelectedProductsByStatus(event){        
       
        var activeStatusId = DataStoreInvoker.getDataStoreState('activeStatusId');
        var currentStatusId  = (typeof(activeStatusId) === 'number') ? activeStatusId: defaultStatusId;
        var id = parseInt(event.target.id);
        event.stopPropagation();
        if(id===currentStatusId){
            var filter = {
                statusId: defaultStatusId
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
        }
        else if(id !==currentStatusId){
            var filter = {
                statusId: id
            }
            dispatch({type: 'FILTER_PRODUCTS', payload:filter});
        }     
    }


    function statusCallback(allActiveStatuses){      
        console.log('TopSection-statusCallback-triggered') 
        setStatusesState(allActiveStatuses);        
    }

    DataStoreInvoker.publishDataStoreState('statusesOnDisplay','statusCallback', statusCallback);
    
    var statuses =(activeStatuses!== undefined) ?
                    activeStatuses.map((item)=>{
                       return <li key={item.StatusId} id={item.StatusId} className={'navbar-li'}> 
                                  <button type="button" 
                                          className="navbar-button" 
                                          id={item.StatusId} 
                                          onClick={getSelectedProductsByStatus} 
                                          >{item.Name} 
                                   </button>
                              </li>;
                    }) :"Not Loaded";
    return (<div className="top-section">
        Top section
        <div className="top-container">
            <ul className="top-section-items">            
                {statuses}
            </ul>
        </div>
    </div>)
}