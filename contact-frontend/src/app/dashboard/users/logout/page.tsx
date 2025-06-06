'use client'
import {logoutUser} from "@/lib/api/UserApi";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {alert_error} from "@/lib/alert";
import {useRouter} from "next/navigation";
import {useEffectOnce, useLocalStorage} from "react-use";

export default function UserLogout(){
    const [token, setToken] = useLocalStorage<string>("token");
    const [,setRefreshToken] = useLocalStorage<string>("refresh_token");
    const router = useRouter();

    async function handleLogout(){
        const response = await logoutUser(token!);
        const responseBody = await response.json() as ApiResponse<null>;

        if(isSuccess(responseBody)){
            setToken("");
            setRefreshToken("");
            router.push("/login");
        } else {
            await alert_error(responseBody.error.message);
        }
    }

    useEffectOnce(() => {
        handleLogout().then(()=>console.log('Logged out'));
    })

    return <>this is logout</>

}