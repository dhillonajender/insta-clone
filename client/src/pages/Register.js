import React, { useContext, useState } from 'react';
// import React from 'react';
import {Form, Button} from 'semantic-ui-react';
// import { Button, Divider, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


// import { AuthContext } from '../context/auth';
// import { useForm } from '../util/hooks';


const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Register(props){
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // const { onChange,onSubmit, values } = useForm(registerUser,{
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    // })
    const onChange = (event) =>{
        setValues({...values,[event.target.name]: event.target.value});
    }
    
    
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result);
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })
    const onSubmit = (event) =>{
        event.preventDefault();
        addUser();
    }
    // function registerUser(){
    //     addUser();
    // }
    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true: false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true: false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true: false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true: false}
                    onChange={onChange}
                />
                <Button type="submit" primary href="/login">Register</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
            
        </div>
    );
}
export default Register;