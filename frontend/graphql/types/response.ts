
export type RegisterResponse = {
    register: {
        success: boolean,
        message: string,
    }
}

export type LoginResponse = {
    login: {
        success: boolean,
        message: string,
        token?: string
    }
}
