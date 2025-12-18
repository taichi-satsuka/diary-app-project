import { gql } from "graphql-request"

export const UPDATA_ME = gql`
  mutation updateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      success
      message
      user {
            id
            name
            email
            bio
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
  }
`