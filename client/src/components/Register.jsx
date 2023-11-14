import React, {useState, useRef} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';

const required = (value) => {
    if(!value) {
        return (
            <div className='invalid-feedback d-block'>
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if(!isEmail(value)) {
        return (
            <div className='invalid-feedback d-block'>
                This is not a valid email
            </div>
        );
    }
}

const vusername = (value) => {
    if(value.length < 3 || value.length > 20) {
        return(
            <div className='invalid-feedback d-block'>
                This username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if(value.length < 3 || value.length > 40) {
        <div className='invalid-feedback d-block'>
            Password has to be between 3 and 40 characters.
        </div>
    }
}

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setSuccessful(false);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                }
            )
        }
    }

  return (
    <div>Register</div>
  )
}

export default Register