import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const middleWear = [process.env.NODE_ENV ==='development' && logger, thunk].filter(Boolean);
const composedEnhancer = compose(applyMiddleware(...middleWear));

const persistConfig ={
    key :'root',
    storage, 
    whitelist : ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancer);

export const persistor = persistStore(store);