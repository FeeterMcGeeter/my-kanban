import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password,
            });
        }
    };

    return (
        <div className='form__container'>
            <h1 className='heading-primary'>Log In</h1>
            <form onSubmit={onSubmit} className='form'>
                <div className='form__group'>
                    <label htmlFor='email' className='form__label'>
                        Email Address
                    </label>
                    <input 
                        id='email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                        className='form__input'
                     />
                </div>
                <div className='form__group'>
                    <label htmlFor='password' className='form__label'>
                        Password
                    </label>
                    <input 
                        id='password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                        className='form__input'
                     />
                </div>
                <input 
                    type="submit"
                    value='Log In'
                    className='btn btn-main'
                />
            </form>
        </div>
    );
};

export default Login;