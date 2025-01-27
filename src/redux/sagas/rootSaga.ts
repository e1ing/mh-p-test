import { all } from "redux-saga/effects";
import { watchAuth } from "./authSaga";
import { watchProfile } from "./profileSaga.ts";
import { watchPosts } from "./postsSaga";


export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchProfile(),
        watchPosts(),
    ]);
}
