export const useAuth = () => {
    const token = useState<string | null>('auth_token', () => null)

    const setToken = (newToken: string) => {
        token.value = newToken
    }
    const deleteToken = () => {
        token.value = null
    }

    return { token, setToken, deleteToken }
}