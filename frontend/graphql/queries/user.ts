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

export const USERDETAIL = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            name
            email
            bio
            profile_image_url
            created_at
        }
    }
`