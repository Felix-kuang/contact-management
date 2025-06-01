"use client"

import FormField from "@/app/components/formField";
import {FormEvent, useState} from "react";
import SubmitButton from "@/app/components/SubmitButton";
import RedirectLink from "@/app/components/RedirectLink";
import {userLogin} from "@/lib/api/UserApi";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {UserPublic} from "@/lib/types/entities";
import {alert_error, alert_success} from "@/lib/alert";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const response = await userLogin(username, password);
        const responseBody = await response.json() as ApiResponse<UserPublic>;

        if (isSuccess(responseBody)) {
            await alert_success(responseBody.message);
            router.push('/');
        } else {
            await alert_error(responseBody.error.message);
        }
    }

    return (
        <div
            className='animate-fade-in bg-gray-800 opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md'>
            <div className='text-center mb-8'>
                <div className='inline-block p-3 bg-gradient rounded-full mb-4'>
                    <i className='fas fa-address-book text-3xl text-white'></i>
                </div>
                <h1 className='text-3xl font-bold text-white'>Contact Management</h1>
                <p className='text-gray-300 mt-2'>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <FormField
                    label={'Username'}
                    name='username'
                    type='text'
                    value={username}
                    setValue={setUsername}
                    placeholder='Enter your username'
                    iconClass={'fas fa-user'}
                />
                <FormField
                    label={'Password'}
                    name='password'
                    type='password'
                    value={password}
                    setValue={setPassword}
                    placeholder='Enter your password'
                    iconClass={'fas fa-lock'}
                />

                <SubmitButton
                    label={'Sign in'}
                    iconClass={'fas fa-sign-in-alt'}
                />

                <RedirectLink
                    text="Don't have an account?"
                    linkText="Sign up"
                    href="/register"
                />
            </form>
        </div>
    )
}