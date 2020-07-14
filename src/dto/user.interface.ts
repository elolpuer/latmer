export interface UserData {
    id: number,
    username: string;
    email: string;
    token: string
}

export interface UserRO {
    user: UserData
}