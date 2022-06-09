import React, { useState, useEffect } from 'react';
import { signupService } from '../../service/service';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

const initialState = {
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
}

export const SignUp = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(initialState);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData && userData.userToken) {
            navigate('/todolist')
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "userName" && value.length > 10) {
            return toast.error('Username should not exceeds 10 Digits!')
        }
        if (name === "phoneNumber" && value.length > 10) {
            return toast.error('Phone Number must be 10 Digits!')
        }
        if (name === "password" && value.length > 20) {
            return toast.error('Password must not exceeds 20 Digits!')
        }
        setUserDetails(
            {
                ...userDetails,
                [name]: name === "userName" ? value.toLowerCase() : value
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userName, email, phoneNumber, password } = userDetails
        if (!userName || !email || !phoneNumber || !password) return toast.error('All fields are required!')
        if (userName < 4) return toast.error('Username must be minimum 4 Digits!')
        if (!email.includes('@gmail.com')) return toast.error('Enter a valid Email!')
        if (phoneNumber.length !== 10) return toast.error('Phone Number must be 10 Digits!')
        if (!validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return toast.error('Password must be strong, minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1')
        }
        signupService(userDetails)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success('signup successfully')
                    setUserDetails(initialState)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }

    return (
        <div className='container'>
            <div className='card'>
                <form action='/signin'>
                    <h1>SignUp</h1>
                    <input
                        type="text"
                        placeholder='username'
                        name='userName'
                        onChange={handleChange}
                        value={userDetails.userName}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="email"
                        placeholder='email'
                        name='email'
                        onChange={handleChange}
                        value={userDetails.email}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="number"
                        placeholder='phonenumber'
                        name='phoneNumber'
                        onChange={handleChange}
                        value={userDetails.phoneNumber}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                        value={userDetails.password}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="signup"
                        onClick={handleSubmit}
                    />
                    <br />
                    <br />
                    <Link to="/signin">
                        <span>Already have an account? Signin</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}