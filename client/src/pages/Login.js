import React, { useContext, useState } from 'react';
// import React from 'react';
import {Form, Button} from 'semantic-ui-react';
// import { Button, Divider, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Login(props){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback,{
        username: '',
        password: '',
    })
    console.log("login outside");
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}){
            console.log("login");
            context.login(userData);
            console.log(userData);
            this.props.history.push("/");
            // navigate('/');
        },
        onError(err){
            window.location.redirect('/')
            console.log("login-error");
            // setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback(){
        loginUser();
    }
    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true: false}
                    onChange={onChange}
                />
                <Button type="submit" primary href="/">Login</Button>
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
export default Login;