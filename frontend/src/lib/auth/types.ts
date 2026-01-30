export interface AuthUser {
    id: string;
    email?: string;
    fullName?: string;
    imageUrl?: string;
}

export interface AuthHook {
    user: AuthUser | null;
    isSignedIn: boolean;
    login: (provider?: string) => void;
    logout: () => void;
}
