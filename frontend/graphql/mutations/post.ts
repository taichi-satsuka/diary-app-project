import { gql } from "graphql-request"

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            success
            message
            post{
                id
                title
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