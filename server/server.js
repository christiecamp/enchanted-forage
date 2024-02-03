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

mermaid.use(express.urlencoded({ extended: true }));
mermaid.use(express.json());

//serve up static assets in production
if (process.env.NODE_ENV === 'production') {
    mermaid.use(express.static(path.join(__dirname, '../client/dist')));
}

mermaid.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


//create instance of ApolloServer and pass in schema data
const startApolloServer = async () =>{
    await server.start();

    //integrate Apollo server with Express application as middleware
    server.applyMiddleware({ app: mermaid });

    fins.once('open', () => {
        mermaid.listen(PORT, () => {
            console.log(`
    =================================================
    ********** ENCHANTED FORAGE's BACK END **********
    =================================================
                . o  O
            O  () o ().o
            o O.    _
       ___  .   ,~'~'~._
       '-,_l  o(((ll ~ _~'~._,,,_
           llO . >>'-, ~ _~ ,~'~ 
            l'.o :__  /,-~,,~'
             l '.__;  )--.
               '.___ l/    '.
                    )&,   ._ '.
                    l_l_  ( '. ;
                      '.   '._'.;--,
                        l_.-;;;.l,-'
                         l;;;;;;;.
                          l;;;;;;;l
                           ';;;;;;;l
                            ';;;;;;;. _______
                              '~;;;;;;.    _,'
                                 '~.;;  ,-'
                                    l  ;
                                     l ;      
                                      l;

                ==============================
                ** your next fantasy awaits **
                ==============================      

                    join in on the adventure:
                    http://localhost:${PORT}

                    graphql path: 
                    http://localhost:${PORT}${server.graphqlPath}

            `);
        });
    });
};

startApolloServer(typeDefs, resolvers);
                            