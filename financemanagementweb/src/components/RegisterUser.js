import React, { useState } from 'react';
import { TextField, Button, Container, FormGroup, Stack, FormLabel } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { authAPI, endpoints } from '../configs/API';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputItem from '../layouts/InputItem';
import { useRef } from 'react';


const RegisterUser = () => {
    const nav = useNavigate()
    const[user, setUser] = useState({
        "username": "",
        "password": "",
        "confirm_password": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "birthday": "",
        "sex": "",
        "address": "",
        "phone": "",
        "role": ""
    })
    const headers = {
        headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data"}
    }
    const avatar = useRef()
    
        
    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("username", user.username)
                form.append("first_name", user.first_name)
                form.append("last_name", user.last_name)
                form.append("email", user.email)
                form.append("birthday", user.birthday)
                form.append("sex", user.sex)
                form.append("address", user.address)
                form.append("phone", user.phone)

                // console.log(avatar)
                if (avatar.current.files.length > 0)
                    form.append("avatar", avatar.current.files[0])

                if (user.role === 3)
                {
                    form.append("is_superuser", 1)
                    form.append("is_staff", 1)
                }
                if (user.role === 2)
                {
                    form.append("is_staff", 1)
                }
                if (user.password === user.confirm_password)
                {
                    form.append("password", user.password)
                }
                let res = await authAPI().post(endpoints['register'], form, headers)

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
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <h3  style={{ textAlign: 'center', backgroundColor: '#609b56', color: "#FFECC9", marginLeft: "20px" }}>User's information: </h3>
                    <form onSubmit={register} action={<Link to="/" />}>
                        <Stack spacing={2} direction="row" style={{ marginBottom: '2%' }}>
                            <TextField type="text" variant='outlined' label="First Name" name="first_name" onChange={setValue} value={user.first_name} 
                                required style={{ width: '100%' }}/>
                            <TextField type="text" variant='outlined' label="Last Name" name="last_name" onChange={setValue} value={user.last_name} 
                                style={{ width: '100%' }} required />
                        </Stack>

                        <Stack spacing={2} direction="row" style={{ marginBottom: '0.3%' }}>
                            <FormLabel id="demo-radio-buttons-group-label" style={{ marginTop: '0.7%' }}>Gender: </FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="sex" onChange={setValue} value={user.sex}>
                                <Stack direction="row">
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </Stack>
                            </RadioGroup>

                            <TextField type="date" variant='outlined' name='birthday' onChange={setValue} value={user.birthday} 
                                style={{ width: '100%', marginBottom: '2%' }} required />

                            <TextField type="number" variant='outlined' label="Phone" name="phone" onChange={setValue} value={user.phone} 
                                style={{ width: '100%', marginBottom: '2%' }}  required />
                        </Stack>

                        <Stack spacing={2} direction="row" style={{ marginBottom: '0.3%' }}>
                            <TextField type="text" variant='outlined' name="address" label="Address" onChange={setValue} value={user.address} 
                                required style={{ width: '100%', marginBottom: '2%' }} />

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Role" name="role" onChange={setValue} value={user.role}>
                                    <MenuItem value="1">User</MenuItem>
                                    <MenuItem value="2">Leader</MenuItem>
                                    <MenuItem value="3">Superuser</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        
                        <Stack spacing={2} direction="row" style={{ marginBottom: '0.3%' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Avatar: </h4>
                            <InputItem type="file" ref={avatar} name="avatar" />
                            
                            <TextField type="email" variant='outlined' label="Email" name="email" onChange={setValue} value={user.email} 
                                style={{ width: '100%', marginBottom: '2%' }}  required />
                        </Stack>

                        <h3 style={{ textAlign: 'center', backgroundColor: '#609b56', color: "#FFECC9", marginLeft: "20px" }}>User's account: </h3>
                        <TextField type="text" variant='outlined' name="username" label="Username" onChange={setValue} value={user.username}
                            required style={{ width: '100%', marginBottom: '2%' }} />

                        <Stack spacing={2} direction="row" style={{ marginBottom: '0.3%' }}>
                            <TextField type="password" variant='outlined' name="password" label="Password" onChange={setValue} value={user.password} 
                                required style={{ width: '100%', marginBottom: '2%' }} />

                            <TextField type="password" variant='outlined' name="confirm_password" label="Re-enter Password" onChange={setValue} value={user.confirm_password} 
                                required style={{ width: '100%', marginBottom: '2%' }} />
                        </Stack>
                        <div align="center">
                            <Button variant="outline-primary" style={{ backgroundColor: '#609b56', color: '#FFECC9' }} type="submit">Register</Button>
                        </div>
                        <br />
                    </form>
                    {/* <small style={{ color: '#F46841' }}>Already have an account? <Link style={{ textDecoration: 'none', color: '#F46841' }} to="/login">Login Here</Link></small> */}
                </FormGroup>
            </Container>
            <br />
        </>
    )
}

export default RegisterUser;