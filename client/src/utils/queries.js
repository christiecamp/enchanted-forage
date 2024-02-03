import { gql } from '@apollo/client';

//query to get logged in user's info (needs to be logged in)
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;