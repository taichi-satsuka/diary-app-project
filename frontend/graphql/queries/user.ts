import { gql } from "graphql-request"

export const ME = gql`
    query Me {
        me {
            id
            name
            email
            bio
            profile_image_url
            posts {
                id
                title
                created_at
                content
            }
            followings {
                id
                name
                email
                profile_image_url
            }
            followers {
                id
                name
                email
                profile_image_url
            }
            likedPosts {
                id
                title
                created_at
                content
            }
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
            posts {
                id
                title
                created_at
                user {
                    id
                    name
                    email
                }
            }
            followings {
                id
                name
                email
                profile_image_url
            }
            followers {
                id
                name
                email
                profile_image_url
            }
            likedPosts {
                id
                title
                created_at
                user {
                    id
                    name
                    email
                }
            }
        }
    }
`