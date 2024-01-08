export interface SignupInfo {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    dateofbirth: number;
    gender: string;
    profilepic: string;
    role: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}