import {ReactNode} from "react";
import AuthGuard from "@/app/dashboard/utils/auth-guard";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            INI LAYOUT DASHBOARD
            <AuthGuard>{children}</AuthGuard>
        </>
    )
}