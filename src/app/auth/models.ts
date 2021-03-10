export interface LoginInfo {
    username: string;
    password: string;
}

export interface AuthRes {
    access: string;
    refresh: string;
}