import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { profileFailure, profileSuccess } from "../reducers/profileReducer";
import { getProfile } from "../../api";
import Cookies from "js-cookie";

function* profileSaga() {
    try {
        const res: AxiosResponse = yield call(getProfile);
        yield put(profileSuccess(res.data));
    } catch (error) {
        if (error instanceof Error) {
            yield put(profileFailure(error.message));
        }
    }
}
export function* watchProfile() {
    yield takeEvery('LOGIN_REQUEST', profileSaga);
}
