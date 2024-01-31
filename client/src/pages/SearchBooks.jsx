import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

//graphql import
import { useMutation } from '@apollo/client';
//import mutation
import { SAVE_BOOK } from '../utils/mutations';
//import helpers
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

//import google book search API
const searchGoogleBooks = async (query) => {
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

const SearchBooks = () => {
    //create state - hold returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    //create state - hold search field data
    const [searchInput, setSearchInput] = useState('');
    //create state - hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
    //mutation request
    const [saveBook] = useMutation(SAVE_BOOK);


    //useEffect hook - save `savedBookIds` list to localStorage on component unmount
    //https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    });

    //search books & set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //validate search input
        if (!searchInput) {
            return false;
        }
        //api call
        try {
            const response = await searchGoogleBooks(searchInput);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
        //convert response to json
        const { items } = await response.json();
        //map through response data
        const bookData = items.map((book) => ({
            bookId: book.id,
            authors: book.volumeInfo.authors || ['no author to display'],
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks?.thumbnail || '',
        }));
        //state update
        setSearchedBooks(bookData);
        setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    //save book to database
    const handleSaveBook = async (bookId) => {
        //find book in `searchedBooks` state by matching id
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
        //get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        //certify token
        if (!token) {
            return false;
        }
        //make mutation request
        try {
            //save book to database
            await saveBook({ variables: { ...bookToSave } });
            //set updated user object
            setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
        <div className="text-light bg-dark p-5">
            <Container>
                <h1>Forage for Fantasies</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='forage fantasies'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                        <Button type='submit' variant='success' size='lg'>
                            submit
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        </div>

        <Container>
            <h2 className='pt-5'>
                {searchedBooks.length
                    ? `viewing ${searchedBooks.length} results:`
                    : 'forage for a fantasy to begin'}
            </h2>
            <CardColumns>
                {searchedBooks.map((book) => {
                    return (
                        <Card key={book.bookId} border='dark'>
                            {book.image ? (
                            <Card.Img src={book.image} alt={`the cover for ${book.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>authors: {book.authors}</p>
                                <Card.Text>{book.description}</Card.Text>
                                {Auth.loggedIn() && (
                                <Button
                                    disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                                    className='btn-block btn-info'
                                    onClick={() => handleSaveBook(book.bookId)}>
                                    {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                                    ? 'this fantasy has already been saved!'
                                    : 'save this fantasy!'}
                                </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>
        </>
    );
};

export default SearchBooks;
