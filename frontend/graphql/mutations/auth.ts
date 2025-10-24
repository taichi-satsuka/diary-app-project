import { gql } from "graphql-request"

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
      user {
        id
        name
        email
      }
    }
  }
`
