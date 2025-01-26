import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AuthResponse, login } from "../../api";
import { loginFailure, loginRequest, loginSuccess } from "../reducers/authReducer";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";


export function* loginSaga(action: { type: string, payload: { email: string, password: string } }) {
    try {
        const { email, password } = action.payload;
        const res: AuthResponse = yield call(login, email, password);
        if (!res.access_token || !res.refresh_token) {
            throw new Error('Токены отсутствуют в ответе сервера');
        }

        Cookies.set('access_token', res.refresh_token, {
            expires: new Date(res.refresh_expired_at * 1000),
            secure: true,
            sameSite: 'lax',
        });

        Cookies.set('refresh_token', res.refresh_token, {
            expires: new Date(res.refresh_expired_at * 1000),
            secure: true,
            sameSite: 'lax',
        });
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

function* refreshTokenSaga() {
    // try {
    //     const refreshToken = Cookies.get("refresh_token");
    //     const res = yield call(axios.post, `${API_URL}/auth/refresh-token`, {
    //         refresh_token: refreshToken,
    //     });

    //     const { access_token, refresh_token, access_expired_at, refresh_expired_at } =
    //         response.data;

    //     Cookies.set("access_token", access_token, {
    //         expires: new Date(access_expired_at * 1000),
    //         secure: true,
    //         sameSite: "Strict",
    //     });
    //     Cookies.set("refresh_token", refresh_token, {
    //         expires: new Date(refresh_expired_at * 1000),
    //         secure: true,
    //         sameSite: "Strict",
    //     });

    //     yield put(refreshTokenSuccess(response.data));
    // } catch (error) {
    //     yield put(refreshTokenFailure(error.message));
    // }
}



export function* watchAuth() {
    yield takeLatest('LOGIN_REQUEST', loginSaga);
    yield takeLatest("REFRESH_TOKEN_REQUEST", refreshTokenSaga);
}
