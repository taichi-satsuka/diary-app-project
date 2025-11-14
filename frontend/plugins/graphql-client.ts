import { GraphQLClient } from "graphql-request"

export default defineNuxtPlugin(() => {
    const endpoint = "http://localhost/graphql"
    const client = new GraphQLClient(endpoint)

    return {
        provide: {
            client : client
        }
    }
})