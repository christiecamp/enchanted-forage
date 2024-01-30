const express = require('express');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//import middleware
const { authMiddleware } = require('./utils/auth');

//import GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');
const fins = require('./config/connection');

const PORT = process.env.PORT || 3001;
const mermaid = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

//create instance of ApolloServer and pass in schema data
const startApolloServer = async () =>{
    await server.start();

    mermaid.use(express.urlencoded({ extended: true }));
    mermaid.use(express.json());

    //integrate Apollo server with Express application as middleware
    // server.applyMiddleware({ mermaid });
    mermaid.use('/graphql', expressMiddleware(server));

    //serve up static assets in production
    if (process.env.NODE_ENV === 'production') {
        mermaid.use(express.static(path.join(__dirname, '../client/build')));
    }

    mermaid.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    fins.once('open', () => {
        mermaid.listen(PORT, () => {
            console.log(`🌊 Server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApolloServer(typeDefs, resolvers);