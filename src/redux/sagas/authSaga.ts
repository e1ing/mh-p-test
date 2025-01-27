import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AuthResponse, getProfile, login, Profile } from "../../api";
import { loginFailure, loginSuccess } from "../reducers/authReducer";
import { AxiosResponse } from "axios";
import { getCookie, setCookie } from "../../utils/cookiseUtil";
import { profileSuccess } from "../reducers/profileReducer";


export function* loginSaga(action: { type: string, payload: { email: string, password: string } }) {
    try {
        const { email, password } = action.payload;
        const res: AuthResponse = yield call(login, email, password);
        if (!res.access_token || !res.refresh_token) {
            throw new Error('Токены отсутствуют в ответе сервера');
        }
        setCookie('access_token', res.access_token, res.access_expired_at)
        setCookie('refresh_token', res.refresh_token, res.refresh_expired_at)
        // const profile: Profile = yield call(getProfile); yield call(getProfile);
        yield put(loginSuccess());
        // yield put(profileSuccess(profile));

    }
    catch (error) {
        if (error instanceof Error) {
            yield put(loginFailure({ error: error.message }));
        } else {
            yield put(loginFailure({ error: 'Произошла ошибка' }));
        }
    }
}




export function* watchAuth() {
    yield takeEvery('LOGIN_REQUEST', loginSaga);
}
