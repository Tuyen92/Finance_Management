import API, { authAPI, endpoints } from '../configs/API';
import * as cookie from 'react-cookies'
import { UseContext } from '../configs/UseContext';
import { Navigate } from 'react-router-dom';
import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Login = () => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const headers = {
        headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data"}
    }
    const[user, dispatch] = useContext(UseContext)

    const login = (evt) => {
        evt.preventDefault()
        const process = async () => {
            try{
           
                let res = await API.post(endpoints['login'], {
                    "username": username,
                    "password": password,
                    "client_id": "mPAsfV5iqzfkRwBj9oLxirEia3IaRZlGDudIlIda",
                    "client_secret": "ZgFP6mYHpd9X5ivV0r5Uk4baQgrKPZJdPQ0HNc9FqCqsUIHHsEPHPVOcEYpugxSOQmgoKHwV4dx9fUDH9qOOOXnRMtK6CZUtxEdNkuUoEqxf8XAc3w5uYvoiuV920Am8",
                    "grant_type": "password"
                }, headers)
                console.log(res)
                cookie.save('access-token', res.data.access_token)

                let user = await authAPI().get(endpoints['current_user'])
                cookie.save('current_user', user.data)

                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            }
            catch (ex) {
                console.log(ex)
            }
        }
        if (username !== "" || password !== "")
            process()
    }

    if (user !== null)
        return <Navigate to="/" />

    return (
        <div className='form' style={{ textAlign: 'center', width: '30%', height: '300px', marginLeft: '35%', backgroundColor: '#FFECC9' }}>
            <h1 style={{ color: '#609b56'}}><strong>LOGIN</strong></h1>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            </Box>

            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" type='password' label="Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Box>
            <Button variant="contained" style={{ color: '#609b56', backgroundColor: '#F1C338'}} onClick={login} >Login</Button>
        </div>
    )
}

export default Login