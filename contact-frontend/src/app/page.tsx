'use client'
import {useRouter} from "next/navigation";
import {useLocalStorage} from "react-use";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();
    const [token] = useLocalStorage<string|null>("token");

    useEffect(() => {
        if(token){
            router.replace("/dashboard");
        } else {
            router.replace("/login");
        }
    },[token,router]);
    return <p>Redirecting...</p>;
}
