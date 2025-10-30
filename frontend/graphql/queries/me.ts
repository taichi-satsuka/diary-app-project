import { gql } from "graphql-request"

export const ME = gql`
    query Me {
        me {
            id
            name
            email
        }
    }
`