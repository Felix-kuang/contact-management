'use client'
import {ReactNode, useEffect} from "react";
import {useLocalStorage} from "react-use";
import {useRouter} from "next/navigation";

export default function AuthLayout({children}: { children: ReactNode }) {
    const [token] = useLocalStorage<string | null>('token');
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [router, token]);

    return (
        <div className='flex items-center justify-center p-4 min-h-screen'>
            {children}
        </div>
    )
}