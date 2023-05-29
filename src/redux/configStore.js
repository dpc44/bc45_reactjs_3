import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer';
import arrUserReducer from './reducers/arrUserReducer';
import errorFormReducer from './reducers/errorFormReducer';


export const store = configureStore({
    reducer: {
        disabledReducer : (state = true, action) => {
            switch(action.type){
                case 'ON_OFF':{
                    state= action.payload;
                };break;
                case 'DISABLE_AFTER':{
                    state= action.payload;
                };break;
            }

            return state
        },
        userReducer: userReducer,
        arrUserReducer: arrUserReducer,
        errorFormReducer: errorFormReducer,
        
    }
});