import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
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

//instantiate Apollo Client
const client = new ApolloClient({
    //set up connection to the API endpoint and middleware to intercept requests
    link: authLink.concat(httpLink),
    //instantiate a new cache object
    cache: new InMemoryCache(),
});

//render app
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
            <>
                <Navbar />
                <Routes>
                    <Route path='' element={<SearchBooks />} />
                    <Route path='/saved' element={<SavedBooks />} />
                    <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
                </Routes>
            </>
            </Router>
        </ApolloProvider>
    );
}

export default App;
