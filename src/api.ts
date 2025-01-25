import axios, { AxiosResponse } from 'axios';

export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    access_expired_at: number,
    refresh_expired_at: number
}

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Authorization": "Bearer",
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    responseType: "text",
})



export const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
        const res = await instance.post('/auth/token-generate', formData)
        return res.data;

    }
    catch (error) {
        console.error('Ошибка при авторизации:', error);
        throw error;
    }
}

// "https://rest-test.machineheads.ru/auth/token-generate"

