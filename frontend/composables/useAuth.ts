export const useAuth = () => {
    const token = useCookie<string | null>('auth_token', {
        sameSite: 'lax',
        maxAge: 60 * 60 * 24
    })

    const setToken = (newToken: string) => {
        token.value = newToken
    }
    const deleteToken = () => {
        token.value = null
    }
    const isAuthenticated = () => !!token.value

    return { token, setToken, deleteToken, isAuthenticated }
}