'use client'

import Link from "next/link";
import {FormEvent, useState} from "react";
import {alert_error, alert_success} from "@/lib/alert";
import {userRegister} from "@/lib/api/UserApi";
import {useRouter} from "next/navigation";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {UserPublic} from "@/lib/types/entities";


export default function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();

    async function handleSubmit(e:FormEvent) {

        e.preventDefault()

        if(password !== confirmPassword){
            await alert_error("Passwords don't match");
            return;
        }

        const response = await userRegister(username, name, password);
        const responseBody = await response.json() as ApiResponse<UserPublic>;

        if(isSuccess(responseBody)){
            await alert_success(responseBody.message);
            router.push('/login');
        } else {
            await alert_error(responseBody.error.message);
        }
    }

    return (
        <div className='bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4'>
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
                    <div className='mb-4'>
                        <label htmlFor='username'
                               className='block text-gray-300 text-sm font-medium mb-2'>Username</label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <i className='fas fa-user text-gray-500'></i>
                            </div>
                            <input
                                type='text' id='username' name='username' value={username}
                                className='
                                    w-full pl-10 pr-3 py-3
                                    bg-gray-700 opacity-50 border border-gray-600 text-white
                                    rounded-lg duration-200 transition-all
                                    focus:outline-none focus:ring-2 focus:border-blue-500
                                 '
                                placeholder='Choose a username' required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='name'
                               className='block text-gray-300 text-sm font-medium mb-2'>Full Name</label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <i className='fas fa-id-card text-gray-500'></i>
                            </div>
                            <input
                                type='text' id='name' name='name' value={name}
                                className='
                                    w-full pl-10 pr-3 py-3 opacity-50 border
                                    bg-gray-700 border-gray-600 text-white
                                    rounded-lg duration-200 transition-all
                                    focus:outline-none focus:ring-2 focus:border-blue-500
                                 '
                                placeholder='Enter your full name' required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password'
                               className='block text-gray-300 text-sm font-medium mb-2'>Password</label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <i className='fas fa-lock text-gray-500'></i>
                            </div>
                            <input
                                type='password' id='password' name='password' value={password}
                                className='
                                    w-full pl-10 pr-3 py-3 opacity-50 border
                                    bg-gray-700 border-gray-600 text-white
                                    rounded-lg duration-200 transition-all
                                    focus:outline-none focus:ring-2 focus:border-blue-500
                                 '
                                placeholder='Create a password' required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='confirm_password'
                               className='block text-gray-300 text-sm font-medium mb-2'>Confirm Password</label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <i className='fas fa-check-double text-gray-500'></i>
                            </div>
                            <input
                                type='password' id='confirm_password' name='confirm_password' value={confirmPassword}
                                className='
                                    w-full pl-10 pr-3 py-3 opacity-50 border
                                    bg-gray-700 border-gray-600 text-white
                                    rounded-lg duration-200 transition-all
                                    focus:outline-none focus:ring-2 focus:border-blue-500
                                 '
                                placeholder='Confirm your password' required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='mb-6'>
                        <button
                            type='submit'
                            className='
                                w-full bg-gradient text-white py-3 px-4 rounded-lg
                                hover:opacity-90 hover:-translate-y-0.5
                                focus:outline-none focus:ring-2
                                focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                                transition-all duration-200 font-medium shadow-lg transform
                            '
                        >
                            <i className="fas fa-user-plus mr-2"></i> Register
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className='text-center text-sm text-gray-400'>
                        Already have an account?
                        <Link href='/login'
                              className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200'> Sign
                            in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}