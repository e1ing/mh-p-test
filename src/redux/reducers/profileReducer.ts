export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

export interface ProfileState {
    profile: {
        id: number,
        phone: string,
        email: string,
        name: string,
        lastName: string,
        secondName: string,
        roles: [
            {
                role: string,
                name: string
            }
        ],
        status: {
            code: number,
            name: string
        },
        isActive: true,
        updatedAt: string,
        createdAt: string
    } | null,
    loading: boolean,
    error: string | null,
}

export const profileRequest = () => ({ type: PROFILE_REQUEST });

export const profileSuccess = (profile: ProfileState['profile']) => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});

export const profileFailure = (error: string) => ({
    type: PROFILE_FAILURE,
    payload: error,
});

interface ProfileRequestAction {
    type: typeof PROFILE_REQUEST;
};

interface ProfileSuccessAction {
    type: typeof PROFILE_SUCCESS,
    payload: ProfileState['profile'],
};

interface ProfileFailureAction {
    type: typeof PROFILE_FAILURE,
    payload: string,
}

export type ProfileActionTypes =
    | ProfileRequestAction
    | ProfileSuccessAction
    | ProfileFailureAction

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
}

export const profileReducer = (state = initialState, action: ProfileActionTypes) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null,
            };
        case PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
