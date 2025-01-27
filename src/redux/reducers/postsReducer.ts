import { PostType } from "../../api";

export const POSTS_REQUEST = "POSTS_REQUEST";
export const POSTS_SUCCESS = "POSTS_SUCCESS";
export const POSTS_FAILURE = "POSTS_FAILURE";


export interface PostsState {
    posts: Array<PostType>;
    currentPage: number,
    pageCount: number,
    postsPerPage: number;
    totalPostsCount: number;

    loading: boolean;
    error: string | null;
}

export interface PostsRequestAction {
    type: typeof POSTS_REQUEST;
    payload: number
}

export interface PostsSuccessAction {
    type: typeof POSTS_SUCCESS;
    payload: PostsState;
}

export interface PostsFailureAction {
    type: typeof POSTS_FAILURE;
    payload: { error: string };
}

export const postsRequest = (page: number) => ({
    type: POSTS_REQUEST,
    payload: page,
});

export const postsSuccess = (data: {
    posts: Array<PostType>, currentPage: number,
    pageCount: number,
    postsPerPage: number,
    totalPostsCount: number
}) => ({
    type: POSTS_SUCCESS,
    payload: data,
});

export const postsFailure = (error: string) => ({
    type: POSTS_FAILURE,
    payload: error,
});


const initialState: PostsState = {
    posts: [],
    currentPage: 0,
    pageCount: 0,
    postsPerPage: 0,
    totalPostsCount: 0,
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
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                pageCount: action.payload.pageCount,
                postsPerPage: action.payload.postsPerPage,
                totalPostsCount: action.payload.totalPostsCount,
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

