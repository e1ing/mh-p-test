import { PostType } from "../../api";

export const POSTS_REQUEST = "POSTS_REQUEST";
export const POSTS_SUCCESS = "POSTS_SUCCESS";
export const POSTS_FAILURE = "POSTS_FAILURE";

export interface PostsState {
    posts: Array<PostType>;
    loading: boolean;
    error: string | null;
}

export interface PostsRequestAction {
    type: typeof POSTS_REQUEST;
}

export interface PostsSuccessAction {
    type: typeof POSTS_SUCCESS;
    payload: PostsState;
}

export interface PostsFailureAction {
    type: typeof POSTS_FAILURE;
    payload: { error: string };
}

export const postsRequest = () => ({
    type: POSTS_REQUEST,
});

export const postsSuccess = (posts: Array<PostType>) => ({
    type: POSTS_SUCCESS,
    payload: posts,
});

export const postsFailure = (error: string) => ({
    type: POSTS_FAILURE,
    payload: error,
});


const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export type PostsActionType = PostsRequestAction | PostsSuccessAction | PostsFailureAction

export const postReducer = (state: PostsState = initialState, action: PostsActionType) => {
    switch (action.type) {
        // Загрузка постов
        case POSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
            };
        case POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default: return state;
    }
}

