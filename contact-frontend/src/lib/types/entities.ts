export interface User {
    username: string
    password: string
    name: string
    token?: string
    contacts: Contact[]
}

// frontend use / login use — without password & contacts
export interface UserLogin {
    username: string
    password: string
}

export interface UserPublic {
    username: string
    name: string
}

export interface TokenResponse {
    access_token: string
    refresh_token: string
}

export interface Contact {
    id: number
    first_name: string
    last_name?: string
    email?: string
    phone?: string
    username: string
    addresses: Address[]
}

export interface Address {
    id: number
    street?: string
    city?: string
    province?: string
    country: string
    postal_code: string
    contact_id: number
}