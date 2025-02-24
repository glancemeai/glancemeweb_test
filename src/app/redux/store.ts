import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// Import reducers
import utilsReducer from './utils/utils';
import messageReducer from './utils/message';
import foldersReducer from './utils/folders';

export const store = configureStore({
    reducer: {
        utils: utilsReducer,
        message: messageReducer,
        folders: foldersReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;