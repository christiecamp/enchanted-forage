// import React from 'react'; 
import {
    Container,
    Card,
    Button,
    Row,
} from 'react-bootstrap';

//graphql imports
import { useQuery, useMutation } from '@apollo/client';
//import queries and mutations
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
//import helper
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
    //useQuery hook to make query request
    const { loading, data, error } = useQuery(GET_ME);
    //useMutation hook to make mutation request
    const [removeBook, { error: mutationError }] = useMutation(REMOVE_BOOK);
    //destructure userData from data object
    const userData = data?.me || {};

    console.log(userData);

    //accept bookId as param and delete book from database
    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null; //get token
        //certify token
        if (!token) {
            return false;
        }
        //make mutation request
        try {
            const { data } = await removeBook({ variables: { bookId } });
            //check if data exists
            if (!data) {
                throw new Error('error deleting fantasy');
            }
            //remove bookId from localStorage
            removeBookId(bookId, Auth.getUserId());
        } catch (err) {
            console.error(err);
        }
    };

    //return loading message - if true
    if (loading) {
        return <h4>loading...</h4>
    }
    
    //return loading message - if true
    if (error) {
        return <h4>lalala</h4>
    }

    //return loading message - if true
    if (mutationError) {
        return <h4>meow</h4>
    }

    return (
    <>
        <Container className="text-light bg-dark p-5">
            <Container>
                <h1>viewing saved fantasies!</h1>
            </Container>
        </Container>
        <Container>
            <h2 className='pt-5'>
                {userData.savedBooks.length
                    ? `viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'fantasy' : 'fantasies'}:`
                    : 'no saved fantasies!'}
            </h2>
            <Row>
                {userData.savedBooks.map((book) => {
                    return (
                        <Card border='dark' key={book.bookId}>
                            {book.image ? <Card.Img src={book.image} alt={`cover for ${book.title}`} variant='top' /> : null}
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>authors: {book.authors}</p>
                                <Card.Text>{book.description}</Card.Text>
                                <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                                    delete fantasy!
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    </>
    );
};
  
  export default SavedBooks;
