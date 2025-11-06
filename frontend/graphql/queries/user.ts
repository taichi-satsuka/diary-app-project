import { gql } from "graphql-request"

export const ME = gql`
    query Me {
        me {
            id
            name
            email
            posts {
                id
                title
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
                user {
                    id
                    name
                    email
                }
            }
        }
    }
`