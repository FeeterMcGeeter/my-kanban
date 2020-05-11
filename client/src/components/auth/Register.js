import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(authContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.value]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };

    return (
        <div className='form__container'>
            <h1 className='heading-primary'>Register</h1>
            <form onSubmit={onSubmit} className='form'>
                <div className='form__group'>
                    <label htmlFor='name' className='form__label'>
                        Name
                    </label>
                    <input 
                        id='name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                        className='form__input'
                     />
                </div>
                <div className='form__group'>
                    <label htmlFor='email' className='form__label'>
                        Email Address
                    </label>
                    <input 
                        id='email'
                        type='email'
                        name=''
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
                        minLength='6'
                        className='form__input'
                     />
                </div>
                <div className='form__group'>
                    <label htmlFor='password2' className='form__label'>
                        Confirm Password
                    </label>
                    <input 
                        id='password2'
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        required
                        minLength='6'
                        className='form__input'
                     />
                </div>
                <input 
                    type="submit"
                    value='Register'
                    className='btn btn-main'
                />
            </form>
        </div>
    );
};

export default Register;