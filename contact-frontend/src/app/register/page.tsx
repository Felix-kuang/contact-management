'use client'

import Link from "next/link";
import {FormEvent, useState} from "react";
import {alert_error, alert_success} from "@/lib/alert";
import {userRegister} from "@/lib/api/UserApi";
import {useRouter} from "next/navigation";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {UserPublic} from "@/lib/types/entities";
import FormField from "@/app/components/formField";
import SubmitButton from "@/app/components/SubmitButton";
import RedirectLink from "@/app/components/RedirectLink";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {

        e.preventDefault()

        if (password !== confirmPassword) {
            await alert_error("Passwords don't match");
            return;
        }

        const response = await userRegister(username, name, password);
        const responseBody = await response.json() as ApiResponse<UserPublic>;

        if (isSuccess(responseBody)) {
            await alert_success(responseBody.message);
            router.push('/login');
        } else {
            await alert_error(responseBody.error.message);
        }
    }

    return (
        <div
            className='animate-fade-in bg-gray-800 opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md'>
            <div className='text-center mb-8'>
                <div className='inline-block p-3 bg-gradient rounded-full mb-4'>
                    <i className='fas fa-user-plus text-3xl text-white'></i>
                </div>
                <h1 className='text-3xl font-bold text-white'>Contact Management</h1>
                <p className='text-gray-300 mt-2'>Create a new account</p>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Fill form */}
                <FormField label='username'
                           name='username'
                           type='text'
                           value={username}
                           setValue={setUsername}
                           placeholder='Choose a username'
                           iconClass='fas fa-user'
                />
                <FormField label='name'
                           name='name'
                           type='text'
                           value={name}
                           setValue={setName}
                           placeholder='Enter your full name'
                           iconClass='fas fa-id-card'
                />
                <FormField label='password'
                           name='password'
                           type='password'
                           value={password}
                           setValue={setPassword}
                           placeholder='Enter your password'
                           iconClass='fas fa-lock'
                />
                <FormField label='confirm_password'
                           name='confirm_password'
                           type='password'
                           value={confirmPassword}
                           setValue={setConfirmPassword}
                           placeholder='Confirm your password'
                           iconClass='fas fa-check-double'
                />

                {/* Submit Button and Redirect */}
                <SubmitButton label={'Register'} iconClass={'fas fa-user-plus'} />
                <RedirectLink text={'Already have an account?'} linkText={'Sign in'} href={'/login'}/>

            </form>
        </div>
    );
}