import { call, put, takeEvery } from "redux-saga/effects";
import { profileFailure, profileSuccess } from "../reducers/profileReducer";
import { getProfile, Profile } from "../../api";
import { getCookie } from "../../utils/cookiseUtil";

function* profileSaga() {
    try {
        const res: Profile = yield call(getProfile);
        yield put(profileSuccess(res));
    } catch (error) {
        if (error instanceof Error) {
            yield put(profileFailure(error.message));
        }
    }
}
export function* watchProfile() {
    yield takeEvery('LOGIN_REQUEST', profileSaga);
}
