import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { baseApi } from './services/base'
import auth from './features/auth'
import sidebar from './features/sidebar'
import { authApis } from './services/auth'
import loading from './features/loading'
import { formServiceBaseApi } from './services/formServiceBase'

export const createStore = (
    option?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
    configureStore({
        reducer: {
            //todo state for adding reducer
            [authApis.reducerPath]: authApis.reducer,
            [formServiceBaseApi.reducerPath]: formServiceBaseApi.reducer,
            auth,
            sidebar,
            loading,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware).concat(formServiceBaseApi.middleware),
    })
export const store = createStore()

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
