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

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      token
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`

export const DELETEME = gql`
  mutation deleteMe {
    deleteMe {
      success
      message
    }
  }
`