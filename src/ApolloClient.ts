import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const END_POINT = "https://graphql.anilist.co"


const httpLink = createHttpLink({
    uri: END_POINT
});

const token = ""


/** Add Token in middleware */
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : "",
        }
    }
});


const client: any = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client