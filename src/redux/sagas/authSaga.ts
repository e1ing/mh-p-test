import { call, put, takeEvery } from "redux-saga/effects";
import { AuthResponse, login } from "../../api";
import { loginFailure, loginSuccess } from "../reducers/authReducer";
import { setCookie } from "../../utils/cookiseUtil";


export function* loginSaga(action: { type: string, payload: { email: string, password: string } }) {
    try {
        const { email, password } = action.payload;
        const res: AuthResponse = yield call(login, email, password);
        if (!res.access_token || !res.refresh_token) {
            throw new Error('Токены отсутствуют в ответе сервера');
        }
        setCookie('access_token', res.access_token, res.access_expired_at)
        setCookie('refresh_token', res.refresh_token, res.refresh_expired_at)
        yield put(loginSuccess());
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
