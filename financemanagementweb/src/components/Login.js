import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {

    return (
        <div className='form' style={{ textAlign: 'center', width: '30%', height: '300px', marginLeft: '35%', backgroundColor: '#FFECC9' }}>
            <h1 style={{ color: '#609b56'}}><strong>LOGIN</strong></h1>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username"/>
            </Box>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Password" />
            </Box>
            <Button variant="contained" style={{ color: '#609b56', backgroundColor: '#F1C338'}}>Login</Button>
        </div>
    )
}

export default Login