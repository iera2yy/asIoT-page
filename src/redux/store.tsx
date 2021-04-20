import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['title']
}

export const store = createStore(persistReducer(persistConfig, reducers), composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)