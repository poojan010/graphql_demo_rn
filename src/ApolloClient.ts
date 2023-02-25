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
        }
    }
});

const cache = new InMemoryCache({
    typePolicies: {
        Media: {
            fields: {
                characters: {
                    keyArgs: ["id"],

                    merge(existing = {}, incoming) {
                        /* Storing Character previews for Overview Tab. */
                        if (!(incoming?.pageInfo)) {
                            return incoming
                        }
                        /* Storing Characters  for Characters Tab. (1st Page) */
                        else if (!(existing?.pageInfo)) {
                            return incoming
                        }
                        /* Storing Characters  for Characters Tab. (> 1 Page) */
                        else {
                            if (existing.pageInfo?.hasNextPage === true) {
                                return {
                                    ...incoming,
                                    edges: [...existing.edges, ...incoming.edges]
                                }
                            }

                            else {
                                return existing;
                            }
                        }
                    },
                },
                coverImage: {
                    keyArgs: false,
                    merge: true
                }
            }
        }
    }
})

const client: any = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

export default client