
import { gql } from "graphql-request"

export const POST = gql`
    query Post($post_id: ID!) {
        post(id: $post_id) {
            id
            title
            content
            created_at
            updated_at
            visibility
            user {
                id
                name
                email
                profile_image_url
            }
            likedByUsers {
                id
                name
                email
                profile_image_url
            }
            comments {
                id
                content
                created_at
                user {
                    id
                    name
                    email
                    profile_image_url
                }
            }
        }
    }
`

export const POSTS = gql`
    query Posts {
         posts {
            id
            title
            created_at
            user {
                id
                name
                email
                profile_image_url
            }
        }
    }
`
