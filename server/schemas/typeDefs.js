const { gql } = require('apollo-server-express');
const { typeDefs } = require('.');

//typeDefs is a string that defines the shape of the data & specifies what queries can be used to fetch the data
//mutations are used to modify data
const typeDefs = gql`
    input BookInput {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type User {
        id: ID
        username: String
        email: String
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
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
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;