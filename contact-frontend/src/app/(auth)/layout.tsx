import {ReactNode} from "react";
import AuthGuard from "@/app/dashboard/utils/auth-guard";

export default function AuthLayout({children}: {children: ReactNode}) {
    return (
        <div className='flex items-center justify-center p-4 min-h-screen'>
            <AuthGuard>{children}</AuthGuard>
        </div>
    )
}