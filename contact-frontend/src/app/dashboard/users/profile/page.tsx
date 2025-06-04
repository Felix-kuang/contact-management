'use client'

import {FormEvent, useState} from "react";
import FormField from "@/app/components/formField";
import SubmitButton from "@/app/components/SubmitButton";
import {useLocalStorage} from "react-use";
import {changeName, changePassword} from "@/lib/api/UserApi";
import {ApiResponse, isSuccess} from "@/lib/types/api-response";
import {UserPublic} from "@/lib/types/entities";
import {alert_error, alert_success} from "@/lib/alert";

export default function ProfilePage() {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [token] = useLocalStorage<string>('token')

    function resetForm() {
        setName('')
        setPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
    }

    async function handleUpdateUsername(event: FormEvent) {
        event.preventDefault();

        const response = await changeName(token!, {name})
        const responseData = await response.json() as ApiResponse<UserPublic>

        if (isSuccess(responseData)) {
            await alert_success(responseData.message);
            resetForm();
        } else {
            await alert_error(responseData.error.message);
        }
    }

    async function handleChangePassword(event: FormEvent) {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            await alert_error("Passwords don't match");
            return;
        }

        const response = await changePassword(token!, {password, newPassword})
        const responseData = await response.json() as ApiResponse<UserPublic>

        if (isSuccess(responseData)) {
            await alert_success("Password changed successfully.");
            resetForm();
        } else {
            await alert_error(responseData.error.message);
        }
    }

    return (
        <div className='container mx-auto px-4 py-8 flex-grow'>
            <div className="flex items-center mb-6">
                <i className="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    className="bg-gray-800 opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user-edit text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                        </div>
                        {/* Name change */}
                        <form onSubmit={handleUpdateUsername}>
                            <FormField
                                label='name'
                                name='name'
                                type='text'
                                value={name}
                                setValue={setName}
                                placeholder='Enter your full name'
                                iconClass="fas fa-user"
                            />
                            <SubmitButton label='Update Profile' iconClass='fas fa-save mr-2'/>
                        </form>
                    </div>
                </div>

                <div
                    className="bg-gray-800 opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-key text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-white">Change Password</h2>
                        </div>
                        {/*Password change*/}
                        <form onSubmit={handleChangePassword}>
                            <FormField
                                label='Current Password'
                                name='current_password'
                                type='password'
                                value={password}
                                setValue={setPassword}
                                placeholder='Enter your current password'
                                iconClass="fas fa-user-lock"
                            />
                            <FormField
                                label='New Password'
                                name='new_password'
                                type='password'
                                value={newPassword}
                                setValue={setNewPassword}
                                placeholder='Enter new password'
                                iconClass="fas fa-lock"
                            />
                            <FormField
                                label='Confirm New Password'
                                name='confirm_new_password'
                                type='password'
                                value={confirmNewPassword}
                                setValue={setConfirmNewPassword}
                                placeholder='Confirm new password'
                                iconClass="fas fa-check-double"
                            />

                            <SubmitButton label='Update Password' iconClass='fas fa-key'/>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}