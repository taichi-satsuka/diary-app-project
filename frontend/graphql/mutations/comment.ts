import { gql } from "graphql-request"

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      message
      comment {
        id,
        content,
        created_at,
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