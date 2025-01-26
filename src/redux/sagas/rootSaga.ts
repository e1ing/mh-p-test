import { all } from "redux-saga/effects";
import { watchAuth } from "./authSaga";
import { watchProfile } from "./profileSaga.ts";


export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchProfile(),
    ]);
}
