export function setCookie(name: string, value: string, expiresInMs: number, path = '/', secure = false, sameSite = 'Lax') {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiresInMs); // Добавляем миллисекунды к текущему времени
    const expiresString = `expires=${expires.toUTCString()}`;
    const secureString = secure ? 'secure' : '';
    const sameSiteString = `SameSite=${sameSite}`;

    document.cookie = `${name}=${encodeURIComponent(value)}; ${expiresString}; path=${path}; ${sameSiteString}; ${secureString}`;
}

export function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

export function areBothTokensOk() {
    return (
        typeof getCookie('access_token') === 'string' &&
        typeof getCookie('refresh_token') === 'string'
    ) 
}

export function deleteCookie(name: string, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}