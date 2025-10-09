<script>
import { request, gql } from 'graphql-request'

const endpoint = "http://localhost/graphql"

const query = gql`
    {
        user(id: 2) {
            id
            name
            email
        }
    }
`

request(endpoint, query).then((data) => console.log(data))
</script>