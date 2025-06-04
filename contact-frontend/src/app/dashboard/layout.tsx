import {ReactNode} from "react";
import AuthGuard from "@/app/dashboard/utils/auth-guard";
import Header from "@/app/dashboard/components/header";
import Footer from "@/app/dashboard/components/footer";


export default function DashboardLayout({children}: {children: ReactNode}) {
    return (
            <div className='min-h-screen flex flex-col'>
                <Header/>
                <AuthGuard>{children}</AuthGuard>
                <Footer/>
            </div>
    )
}