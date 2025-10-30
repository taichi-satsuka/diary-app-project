export type Post = {
    id: number,
    user_id: number,
    name: string,
    email: string,
    title: string,
    content: string,
    created_at: string
}

export type LoginUser = {
    id: number,
    name: string,
    email: string,
}