'use client';

import {useLocalStorage} from "react-use";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";
import {isTokenExpired} from "@/app/dashboard/utils/auth";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {TokenResponse} from "@/lib/types/entities";

export default function AuthGuard({children}: { children: ReactNode }) {
    const router = useRouter();
    const [token, setToken] = useLocalStorage<string | null>('token');
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refresh_token');
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function verifyAndRefresh() {
            if (!token || !refreshToken) {
                router.replace('/login');
                return;
            }

            if (isTokenExpired(token)) {
                try {
                    console.log("Expired token, trying to refresh");
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({refreshToken})
                    });

                    if (!res.ok) {
                        throw new Error("Refresh token invalid");
                    }

                    const responseData = await res.json() as ApiResponse<TokenResponse>;

                    if (isSuccess(responseData)) {
                        setToken(responseData.data.access_token);
                        setRefreshToken(responseData.data.refresh_token);
                    }
                } catch {
                    setToken(null);
                    setRefreshToken(null);
                    router.replace('/login');
                    return;
                }
            }
            setChecking(false);
        }

        verifyAndRefresh();
    }, [token, refreshToken, router, setToken, setRefreshToken]);

    if (checking) return <p>Loading...</p>;

    return <>{children}</>;
}