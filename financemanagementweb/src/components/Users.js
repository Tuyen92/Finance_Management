import { useState } from "react"
import { useEffect } from "react"
import API, { endpoints } from "../configs/API"
import cookie from 'react-cookies';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate, useSearchParams } from "react-router-dom/dist";


const Users = () => {
    const[users, setUser] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        const loadUsers = async () => {
            let res = await API.get(endpoints['user'])
            setUser(res.data.results)
        }

        loadUsers()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/user/?content=${kw}`)
    }

    let userLogin = (
        <>
            <div align="center">
                <h3 style={{ color: '#F1C338' }}>Please<Link style={{ textDecoration: 'none' }} to={`/login/`}>Login</Link></h3>
            </div> 
        </>
    )
    if (cookie !== null)
    {
        userLogin = (
            <>
                <div align="right">
                    <TextField id="outlined-basic" label="Search" variant="outlined" value={kw} onChange={e => setKeyWord(e.target.value)} style={{ marginRight: '1%' }}/>
                    <Button onClick={search} variant="contained" style={{  backgroundColor: "#609b56", marginTop: "0.5%" }}><i className="material-icons" style={{ color: '#FFECC9' }}>search</i></Button>
                </div>
                <br />
                <hr />
                <div align="right" style={{ display: 'flex', marginLeft: '70%'}}>
                <h4 style={{ color: '#F1C338', marginRight: '5%', marginTop: '30px' }}>Sort:</h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                        <InputLabel id="demo-simple-select-label">Spending amount</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Spending amount" style={{ marginRight: '5%' }}>
                            <MenuItem value=""></MenuItem>
                            <MenuItem >Increase</MenuItem>
                            <MenuItem >Decrease</MenuItem>
                        </Select>
                    </FormControl>
                    <Link style={{ textDecoration: 'none' }} to={`/spending/`}><Button style={{ color: '#F1C338', width: '100$', marginTop: '18%' }}><strong>New spending</strong></Button></Link>
                </div>
                <div>
                    <Pagination count={10} />
                </div>
            </>
        )
        console.log(cookie);
    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>USER LIST</h1>
            </div>
            {userLogin}
        </>
    )
}

export default Users