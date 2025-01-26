import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer, AuthState } from './reducers/authReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { profileReducer, ProfileState } from './reducers/profileReducer';


const rootReducer = () => combineReducers({
    auth: authReducer,
    profile: profileReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer(), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export type AppRootStateType = {
    auth: AuthState;
    profile: ProfileState;
}
