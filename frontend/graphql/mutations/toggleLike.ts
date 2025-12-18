import { gql } from "graphql-request"

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($post_id: ID!) {
    toggleLike(post_id: $post_id) {
      success
      message
    }
  }
`
