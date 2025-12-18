import { GraphQLClient } from "graphql-request"

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const endpoint: string = config.public.apiBase as string
    const client = new GraphQLClient(endpoint)

    return {
        provide: {
            client : client
        }
    }
})