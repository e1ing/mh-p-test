import { call, put, takeEvery } from "redux-saga/effects";
import { AuthResponse, login } from "../../api";
import { loginFailure, loginRequest } from "../reducers/authReducer";
import { AxiosResponse } from "axios";


export function* authSaga(action: { type: string, payload: { email: string, password: string } }) {
    try {
        const { email, password } = action.payload;
        const res: AxiosResponse<AuthResponse> = yield call(login, email, password);
        // yield put(loginSuccess(res.data));
        document.cookie = `access_token=${res.data.access_token}; path=/; max-age=${res.data.access_expired_at}`
        document.cookie = `access_token=${res.data.refresh_token}; path=/; max-age=${res.data.refresh_expired_at}`
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
    yield takeEvery('LOGIN_REQUEST', authSaga);
}
