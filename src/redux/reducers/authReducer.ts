import { AnyAction } from 'redux';
import { getCookie } from '../../utils/cookiseUtil';
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const VALIDATION_ERRORS = "VALIDATION_ERRORS";
export const LOGOUT = "LOGOUT";
// export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
// export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

export interface AuthState {
    isAuthenticated: boolean
    loading: boolean;
    error: string | null;
    validationErrors: Array<{ field: string; message: string }>;
}

export interface LoginPayload {
    email: string;
    password: string;
}


export interface LoginFailurePayload {
    error: string;
}

export interface ValidationErrorPayload {
    errors: { field: string; message: string }[];
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: LoginPayload;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: LoginFailurePayload;
}

interface ValidationErrorAction {
    type: typeof VALIDATION_ERRORS;
    payload: ValidationErrorPayload;
}

export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | ValidationErrorAction
    | LogoutAction


/**Action creators */
export const loginRequest = (payload: LoginPayload) => ({
    type: LOGIN_REQUEST,
    payload,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = (payload: LoginFailurePayload) => ({
    type: LOGIN_FAILURE,
    payload,
});

export const validationErrors = (payload: ValidationErrorPayload) => ({
    type: VALIDATION_ERRORS,
    payload,
});

export const logout = (): AnyAction => ({ type: LOGOUT })

const initialState: AuthState = {
    isAuthenticated: typeof getCookie('refresh_token') === 'string',
    loading: false,
    error: null,
    validationErrors: [],
}

export const authReducer = (state: AuthState = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                validationErrors: []
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                validationErrors: []
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                validationErrors: []
            };
        case VALIDATION_ERRORS:
            return {
                ...state,
                validationErrors: action.payload.errors,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
                validationErrors: []
            };
        default: return state;
    }
}

