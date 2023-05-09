import API, { authAPI, endpoints } from '../configs/API';
import * as cookie from 'react-cookies'
import { UseContext } from '../configs/UseContext';
import { Navigate } from 'react-router-dom';
import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';


const Login = () => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const headers = {
        headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data"}
    }
    const[user, dispatch] = useContext(UseContext)
    const[err, setErr] = useState(null)

    // useEffect(() => {}, [err])

    const login = (evt) => {
        evt.preventDefault()
        const process = async () => {
            try{
           
                let res = await API.post(endpoints['login'], {
                    "username": username,
                    "password": password,
                    "client_id": "twJGe3n0qLSNGU7941y1r94MRAR3DbtXhMcDNjNS",
                    "client_secret": "3vgVymzm0lNQXK4ExIV5OCKl0Ymhsx6JIwGP8kU3kOITUUhBEWdkmjLVMteBOQaYjvklKoROoHyi10ggde59mHItSPlTF2t0kmhdC9ZDZM5fXzBM6gnHYU88tTLiGlpF",
                    "grant_type": "password"
                }, headers)
                console.log(res)
                cookie.save('access-token', res.data.access_token)

                let user = await authAPI().get(endpoints['current_user'])
                console.log(user)
                cookie.save('current_user', user.data)

                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            }
            catch (ex) {
                console.log(ex)
                setErr("Login unsuccessfully!")
            }
        }
        if (username !== "" || password !== "")
            process()
    }

    let alert = (<></>)
    if (err !== null)
    {
      alert = (
      <>
        <div align='center'>
          <Alert severity="error">Happend an error: {err} — check it out!</Alert>
        </div>
        <br />
      </>)
    }

    if (user !== null)
        return <Navigate to="/" />

    return (
        <>
            <div className='form' style={{ textAlign: 'center', width: '30%', height: '300px', marginLeft: '35%', backgroundColor: '#FFECC9' }}>
                <h1 style={{ color: '#609b56'}}><strong>LOGIN</strong></h1>            
                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Box>

                <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField id="outlined-basic" type='password' label="Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </Box>
                <Button variant="contained" style={{ color: '#609b56', backgroundColor: '#F1C338'}} onClick={login} ><strong>Login</strong></Button>
            </div>
            <br />
            <div align="center">
                {alert}
            </div>
        </>
    )
}

export default Login