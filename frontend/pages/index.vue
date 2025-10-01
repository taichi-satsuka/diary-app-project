<template>
    <h1>Hello world</h1>
</template>

<script>
import { request, gql } from 'graphql-request'

const query = gql`
  {
    user(id: 2) {
        id
        name
        email
    }
  }
`

request('http://localhost/graphql', query).then((data) => console.log(data))
</script>