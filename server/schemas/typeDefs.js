const { gql } = require('apollo-server-express');

//typeDefs - string that defines data shape & specifies queries that can be used
//mutations are used to modify data
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int!
        savedBooks: [Book]
    }
    type Book {
        _id: ID!
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }
    input BookInput {
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(username: String, email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;