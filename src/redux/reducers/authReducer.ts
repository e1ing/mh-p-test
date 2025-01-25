
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';

export interface AuthState {
    loading: boolean;
    error: string | null;
    validationErrors: Array<{ field: string; message: string }>;
}

export interface LoginPayload {
    email: string;
    password: string;
}

// export interface LoginSuccessPayload {
//     access_token: string,
//     refresh_token: string,
//     access_expired_at: number,
//     refresh_expired_at: number
// }

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

// interface LoginSuccessAction {
//     type: typeof LOGIN_SUCCESS;
//     payload: LoginSuccessPayload;
// }

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: LoginFailurePayload;
}

interface ValidationErrorAction {
    type: typeof VALIDATION_ERROR;
    payload: ValidationErrorPayload;
}

export type AuthActionTypes =
    | LoginRequestAction
    // | LoginSuccessAction
    | LoginFailureAction
    | ValidationErrorAction



/**Action creators */
export const loginRequest = (payload: LoginPayload) => ({
    type: LOGIN_REQUEST,
    payload,
});

// export const loginSuccess = (payload: LoginSuccessPayload) => ({
//     type: LOGIN_SUCCESS,
//     payload,
// });

export const loginFailure = (payload: LoginFailurePayload) => ({
    type: LOGIN_FAILURE,
    payload,
});

export const validationError = (payload: ValidationErrorPayload) => ({
    type: VALIDATION_ERROR,
    payload,
});



const initialState: AuthState = {
    loading: false,
    error: null,
    validationErrors: [],
}

export const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                validationError: []
            };
        // case LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null,
        //         validationError: []
        //     };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                validationErrors: []
            };
        case VALIDATION_ERROR:
            return {
                ...state,
                validationError: action.payload.errors,
            }
        default: return state;
    }
}

