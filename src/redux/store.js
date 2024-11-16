// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slides/counterSlide'
// import userReducer from './slides/userSlide'

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     user: userReducer
//   },
// })


import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Sử dụng storage mặc định từ redux-persist
import userReducer from './slides/userSlide'


// Cấu hình persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: []
}

const rootReducer = combineReducers({
  user: userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})



export let persistor = persistStore(store)