export interface Address {
    addressId?: number;
    address: string;
    city: string;
    state: string;
}

export interface User {
    id?: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    address: Address;
}

export interface UserDetails {
    id?: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface Message {
    id?: number;
    msgText: string;
    sender: string;
    timestamp: Date;
}



