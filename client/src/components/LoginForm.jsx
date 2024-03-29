// see SignupForm.js for comments
import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';


const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    //mutation hook
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    //use effect hook
    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    //input change event handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    //form submit event handler
    const handleFormSubmit = async (event) => {
        event.preventDefault();

    //validate form
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    //try catch block for login
    try {
        const response = await loginUser({
            variables: { ...userFormData },
        });
        Auth.login(response.data.login.token);
    } catch (err) {
        console.error(err);
    }

    //execute mutation
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          login credentials are wrong!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>email</Form.Label>
          <Form.Control
            type='text'
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
