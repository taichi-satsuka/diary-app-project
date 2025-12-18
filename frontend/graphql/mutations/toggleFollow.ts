import { gql } from "graphql-request"

export const TOGGLEFOLLOW = gql`
  mutation ToggleFollow($followed_id: ID!) {
    toggleFollow(followed_id: $followed_id) {
      success
      message
    }
  }
`
