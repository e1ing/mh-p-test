import { call, put, takeEvery } from "redux-saga/effects";
import { getPosts, PostType } from "../../api";
import { postsFailure, postsSuccess } from "../reducers/postsReducer";

function* postsSaga() {
    try {
        const res: Array<PostType> = yield call(getPosts);
        yield put(postsSuccess(res));
    } catch (error) {
        if (error instanceof Error) {
            yield put(postsFailure(error.message));
        }
    }
}
export function* watchPosts() {
    yield takeEvery('POSTS_REQUEST', postsSaga);
}
