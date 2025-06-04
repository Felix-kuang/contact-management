import {jwtDecode} from 'jwt-decode'

export function isTokenExpired(token: string): boolean {
    try {
        console.log("checking token...");
        const {exp} = jwtDecode<{ exp: number }>(token);
        if (!exp) return true;

        const now = Date.now() / 1000;
        return exp < now;
    } catch {
        return true;
    }
}