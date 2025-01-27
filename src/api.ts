import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from './utils/cookiseUtil';
import { AuthActionTypes, loginFailure, LoginFailurePayload, logout } from './redux/reducers/authReducer';
import { store } from './redux/store';
import { AnyAction } from 'redux';
import { profileFailure } from './redux/reducers/profileReducer';
import { postsFailure } from './redux/reducers/postsReducer';

export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    access_expired_at: number,
    refresh_expired_at: number
}

interface Role {
    role: string,
    name: string
}

export interface Profile {
    id: number,
    phone: string,
    email: string,
    name: string,
    lastName: string,
    secondName: string,
    roles: Array<Role>,
    status: {
        code: number,
        name: string
    },
    isActive: true,
    updatedAt: string,
    createdAt: string
}

export interface PostType {
    id: 0,
    title: string,
    code: string,
    authorName: string,
    previewPicture: {
        id: 0,
        name: string,
        url: string
    },
    tagNames: Array<string>,
    updatedAt: string,
    createdAt: string
}

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

let lastRequest: InternalAxiosRequestConfig<any> | null = null

api.interceptors.request.use((config) => {
    const token = getCookie('access_token');
    lastRequest = config
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {

                const token = getCookie('refresh_token')

                if (!token) {
                    throw new Error('Refresh token истёк')
                }

                const formData = new FormData();
                formData.append('refresh_token', token);

                const response = await axios.post('/auth/token-refresh', formData);

                setCookie('access_token', response.data.access_token, response.data.access_expired_at);

                if (!lastRequest) {
                    return Promise.resolve(response);
                }

                lastRequest.headers.set('Authorization', `Bearer ${response.data.access_token}`);
                
                return api(lastRequest)

            } catch (refreshError) {
                console.error('Ошибка при обновлении токена:', refreshError);
                deleteCookie('access_token');
                deleteCookie('refresh_token');
                store.dispatch(logout())
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
        const res = await api.post<AuthResponse>('/auth/token-generate', formData)
        return res.data;
    }
    catch (error) {
        if (error instanceof Error) {
            store.dispatch<AnyAction>(loginFailure({ error: error.message }));
                } else {
                    store.dispatch<AnyAction>(loginFailure({ error: 'Произошла ошибка' }));
                }
                throw error;
            }
        }
        

export const getProfile = async () => {
    try {
        const res = await api.get<AxiosResponse<Profile>>('/profile', {
        });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            store.dispatch<AnyAction>(profileFailure({ error: error.message }));
                } else {
                    store.dispatch<AnyAction>(profileFailure({ error: 'Произошла ошибка' }));
                }
                throw error;
            }
};

export const getPosts = async (page: number) => {
    try {
        const res = await api.get<AxiosResponse>('/manage/posts?page='+page);
        return res;
    } catch (error)  {
        if (error instanceof Error) {
            store.dispatch<AnyAction>(postsFailure({ error: error.message }));
                } else {
                    store.dispatch<AnyAction>(postsFailure({ error: 'Произошла ошибка' }));
                }
                throw error;
            }
};