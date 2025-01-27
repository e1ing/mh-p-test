import { call, put, takeEvery } from "redux-saga/effects";
import { profileFailure, profileSuccess } from "../reducers/profileReducer";
import { getProfile, Profile } from "../../api";

function* profileSaga() {
    try {
        const res: Profile = yield call(getProfile);
        yield put(profileSuccess(res));
    } catch (error) {
        if (error instanceof Error) {
            yield put(profileFailure({error: error.message}));
        }
    }
}
export function* watchProfile() {
    yield takeEvery('PROFILE_REQUEST', profileSaga);
}
