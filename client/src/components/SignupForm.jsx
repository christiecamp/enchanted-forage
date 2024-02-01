import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
    //initial form state
    const [userFormData, setUserFormData] = useState({ 
        username: '', 
        email: '', 
        password: '',   
    });
  
    //form validation state
    const [validated] = useState(false);
    //alert state
    const [showAlert, setShowAlert] = useState(false);

  //input change event handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //mutation hook
  const [addUser] = useMutation(ADD_USER);

  //form submit event handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //validate form
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //execute mutation
    try {
        const { data } = await addUser({ variables: { ...userFormData } });
        Auth.login(data.addUser.token);
      } catch (err) {
        console.error(err);
      }


    //reset form
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  }

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>username</Form.Label>
          <Form.Control
            type='text'
            placeholder='username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>username required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>email</Form.Label>
          <Form.Control
            type='email'
            placeholder='email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>email required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>password</Form.Label>
          <Form.Control
            type='password'
            placeholder='password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>password required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
