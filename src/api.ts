import axios, { AxiosResponse } from 'axios';
import { deleteCookie, getCookie, setCookie } from './utils/cookiseUtil';

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


export const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = getCookie('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post('/auth/token-refresh', {
                    refresh_token: getCookie('refresh_token')
                },
                );

                setCookie('access_token', response.data.access_token, response.data.access_expired_at);

                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена:', refreshError);
                deleteCookie('access_token');
                deleteCookie('refresh_token');
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
        console.error('Ошибка при авторизации:', error);
        throw error;
    }
}

export const getProfile = async () => {
    try {
        const accessToken = getCookie('access_token');
        if (!accessToken) {
            throw new Error('access_token отсутствует в куках');
        }
        const res = await api.get<AxiosResponse<Profile>>('/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Ошибка при получении профиля:', error);
        throw error;
    }
};