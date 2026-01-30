"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { AuthHook } from "./types";

export function useAuth(): AuthHook {
    const { user, isSignedIn } = useUser();
    const { openSignIn, signOut } = useClerk();

    return {
        user: user ? {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            fullName: user.fullName || "",
            imageUrl: user.imageUrl
        } : null,
        isSignedIn: !!isSignedIn,
        login: () => openSignIn(),
        logout: () => signOut()
    };
}
