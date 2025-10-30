
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

export type MeResponse = {
    me: {
        id: number,
        name: string,
        email: string
    }
}

export type UserResponse = {
    user : {
        id: number,
        name: string,
        email: string | null,
        bio: string | null,
        profile_image_url: string | null,
        created_at: string,
    }
}