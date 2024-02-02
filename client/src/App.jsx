import './App.css';
import { Outlet } from 'react-router-dom';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';

//construct main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

//middleware - attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    //get auth token from local storage
    const token = localStorage.getItem('id_token');
    //return headers to context - httpLink request
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

//defines the cache variable to create a new InMemoryCache that merges the savedBooks field of the User type
const cache = new InMemoryCache({
    typePolicies: {
         User: {
              fields: {
                   savedBooks: {
                        merge(existing, incoming) {
                             return incoming;
                        },
                   },
              },
         },
    },
});


//instantiate Apollo Client
const client = new ApolloClient({
    //set up connection to the API endpoint and middleware to intercept requests
    link: authLink.concat(httpLink),
    //instantiate a new cache object
    cache,
});

//render app
function App() {
    return (
        <ApolloProvider client={client}>
                <Navbar />
                <Outlet />
        </ApolloProvider>
    ); 
}

export default App;
