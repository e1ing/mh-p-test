import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './reducers/authReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const rootReducer = combineReducers({
    auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export type AppRootStateType = ReturnType<typeof rootReducer>
