/**
 * request のwrapper関数
 * Bearer token発行済みの時付与する
 * 
 * @returns { Promise<T> }
 */
export function useGqlClient() {
    const { $client } = useNuxtApp()
    const { token }= useAuth()

    async function gqlRequest<T>(
        query: string,
        variables?: any,
    ): Promise<T> {
        const headers = token
        ? { Authorization: `Bearer ${token}`}
        : undefined
    
        return $client.request<T>(query, variables, headers)
    }

    return { gqlRequest }
    
}