import React, { useState } from 'react';
import { TextField, Button, Container, FormGroup, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import API, { authAPI, endpoints } from '../configs/API';
import axios from 'axios';


const RegisterUser = () => {
    const nav = useNavigate()
    const[user, setUser] = useState({
        "username": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "birthday": "",
        "sex": "",
        "address": "",
        "phone": "",
        "avatar": ""
    })

    // LONG
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [birthday, setDateOfBirth] = useState('')

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     axios.post("http://127.0.0.1:8000/register/",{
    //         "username": username,
    //         "password": password,
    //         "firstName": firstName,
    //         "lastName": lastName,
    //         "email": email,
    //         "birthday": birthday,
    //         "address": "aaaaa",
    //         "phone": "0123456",
    //         "is_active": true
    //     })
    // }

        // let res = API.post(endpoints['register'], {
        //     "username": username,
        //     "password": password,
        //     "firstName": firstName,
        //     "lastName": lastName,
        //     "email": email,
        //     "birthday": birthday,
        //     "address": "aaaaa",
        //     "phone": "0123456",
        //     "is_active": true
        // })
    

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("username", user.username)
                form.append("password", user.password)
                form.append("firstName", user.firstName)
                form.append("lastName", user.lastName)
                form.append("email", user.email)
                form.append("birthday", user.birthday)
                form.append("sex", user.sex)
                form.append("address", user.address)
                form.append("phone", user.phone)
                form.append("avatar", user.avatar)

                let res = await authAPI().post(endpoints['user'], form)
                if (res.status === 201)
                    nav("/user/")
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setUser(current => ({...current, [name]:value}))
    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>REGISTER USER</h1>
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={register} action={<Link to="/" />}>
                        <Stack spacing={2} direction="row" style={{ marginBottom: '2%' }}>
                            <TextField type="text" variant='outlined' label="First Name" name="firstName" onChange={setValue} value={user.firstName} 
                                required style={{ width: '100%' }}/>
                            <TextField type="text" variant='outlined' label="Last Name" name="lastName" onChange={setValue} value={user.lastName} 
                                style={{ width: '100%' }} required />
                        </Stack>

                        <TextField type="email" variant='outlined' label="Email" name="email" onChange={setValue} value={user.email} 
                            style={{ width: '100%', marginBottom: '2%' }}  required />
                        <TextField type="text" variant='outlined' name="username" label="Username" onChange={setValue} value={user.username}
                            required style={{ width: '100%', marginBottom: '2%' }} />

                        <TextField type="password" variant='outlined' name="password" label="Password" onChange={setValue} value={user.password} 
                            required style={{ width: '100%', marginBottom: '2%' }} />
                        <TextField type="date" variant='outlined' name='birthday' onChange={setValue} value={user.birthday} 
                            style={{ width: '100%', marginBottom: '2%' }} required />
                        <br />
                        <div align="center">
                            <Button variant="outline-primary" style={{ backgroundColor: '#609b56', color: '#FFECC9' }} type="submit">Register</Button>
                        </div>
                    </form>
                    <small style={{ color: '#F46841' }}>Already have an account? <Link style={{ textDecoration: 'none', color: '#F46841' }} to="/login">Login Here</Link></small>
                </FormGroup>
            </Container>
            <br />
        </>
    )
}

export default RegisterUser;