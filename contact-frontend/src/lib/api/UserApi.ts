export const userRegister = async (username: string, password: string, name: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username, password, name
        })
    })
}

export const userLogin = async (username: string, password: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username, password
        })
    })
}

export const changeName = async (token: string, {name}: { name: string }) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/name`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name
        })
    })
}

export const changePassword = async (
    token: string, {password, newPassword}: { password: string, newPassword: string }
) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            password, newPassword
        })
    })
}

export const currentUser = async (token: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}