import {alert_error} from "@/lib/alert";
import { TokenResponse} from "@/lib/types/entities";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");

    const res = await fetch(input, {
        ...init,
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (res.status === 401) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refreshToken})
        });

        if (!refreshRes.ok) {
            localStorage.clear();

            await alert_error("Session expired, please try again");
            window.location.href = "/login";

            return new Response(null, { status: 401 });
        }

        const refreshBody = await refreshRes.json() as ApiResponse<TokenResponse>;

        if(isSuccess(refreshBody)) {
            if(!refreshBody.data.access_token) {
                localStorage.clear();
                await alert_error("Invalid refresh response");
                window.location.href = "/login";
                return new Response(null, { status: 401 });
            }

            localStorage.setItem("token", refreshBody.data.access_token);
            localStorage.setItem("refresh_token", refreshBody.data.refresh_token);

            return fetch(input, {
                ...init,
                headers: {
                    ...(init?.headers || {}),
                    Authorization: `Bearer ${refreshBody.data.access_token}`,
                }
            });
        }
    }

    return res
}