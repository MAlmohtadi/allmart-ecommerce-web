export interface IAccount {
    id?: number;
    appleId?: string;
    email?: string;
    facebookId?: string;
    name?: string;
    phone?: string;
    secondaryPhone?: string;
}

export interface AccountState extends IAccount {
    isLoggedIn: boolean
}
