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
export const UPDATE_POST = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            success
            message
            post{
                id
                title
                content
                visibility
                created_at
                updated_at
                user {
                    id
                    name
                    email
                }
                likedByUsers {
                    id
                    name
                    email
                }
            }
        }
    }
`
export const DELETE_POST = gql`
    mutation DeletePost($post_id: ID!) {
        deletePost(post_id: $post_id) {
            success
            message
        }
    }
`