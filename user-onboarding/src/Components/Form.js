import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewUser = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect (() => {
        console.log('status has changed', status)
        
        status && setUsers(users => [...users, status]);
    }, [status]);

    return(
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name
                    <Field 
                    id='name'
                    type='text'
                    name='name'
                    placeholder='name'
                    />

                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>

                <label htmlFor="email">
                    Email
                    <Field 
                    id='email'
                    type='text'
                    name='email'
                    placeholder='email'
                    />

                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>

                <label htmlFor="password">
                    Password
                    <Field 
                    id='password'
                    type='password'
                    name='password'
                    placeholder='password'
                    />

                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>

                <label className='checkbox-container'>
                    I agree to the Terms of Service
                    <Field
                    type='checkbox'
                    name='tos'
                    checked= {values.tos}
                    />
                    <span className="checkmark"/>
                </label>
                <button className="submit">Submit</button>
            </Form>
            {users.map(user => {
                return(
                <ul key={user.id}>
                    <li>Name: {user.name} </li>
                    <li>Email: {user.email} </li>
                    <li>Password {user.password} </li>
                </ul>
                )
                })}
        </div>
    )
}

const FormikNewUser = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || '',
            email: props.email || '',
            password: props.password || '',
            tos: props.tos || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Must be a valid email address').required('Required'),
        password: Yup.string().required('Required'),
        tos: Yup.boolean().oneOf([true], "Gotta be done, man").required('Required'),
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting', values);
        axios
            .post('https://reqres.in/api/users', values)
            .then (response => {
                console.log('Success', response);

                setStatus(response.data);

                resetForm();
            })
            .catch(error => console.log(error.response));
    }
})(NewUser);



export default FormikNewUser;