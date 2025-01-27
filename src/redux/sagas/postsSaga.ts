import { call, put, takeEvery } from "redux-saga/effects";
import { getPosts, PostType } from "../../api";
import { postsFailure, postsSuccess } from "../reducers/postsReducer";
import { AxiosResponse } from "axios";

function* postsSaga() {
    try {
        const res: AxiosResponse = yield call(getPosts);
        yield put(postsSuccess({
            posts: res.data.posts,
            currentPage: Number(res.headers['x-pagination-current-page']) || 0,
            pageCount: Number(res.headers['x-pagination-page-count']) || 0,
            postsPerPage: Number(res.headers['x-pagination-per-page']) || 0,
            totalPostsCount: Number(res.headers['x-pagination-total-count'] || 0)
        }));
    } catch (error) {
        if (error instanceof Error) {
            yield put(postsFailure(error.message));
        }
    }
}
export function* watchPosts() {
    yield takeEvery('POSTS_REQUEST', postsSaga);
}
