import { useContext, useState } from "react"
import { useEffect } from "react"
import API, { authAPI, endpoints } from "../configs/API"
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Numeral from 'numeral';
import { format } from 'date-fns';
import { UseContext } from "../configs/UseContext";


const Users = () => {
    const[users, setUsers] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const[user, dispatch] = useContext(UseContext)
    const[page, setPage] = useState(1)
    const[pageSize, setPageSize] = useState(2)
    const[total, setTotal] = useState(0)
    const[next, setNext] = useState(null)
    const[previous, setPrevious] = useState(null)

    useEffect(() => {
        const loadUsers = async () => {
            let res = await authAPI().get(endpoints['user'])
            setUsers(res.data.results)
            setNext(res.data.next)
            setPrevious(res.data.previous)
            // console.log(res.data.results)
        }

        loadUsers()
    }, [page, pageSize])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/user/?content=${kw}`)
    }

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)
    const changePageSize = (evt) => setPageSize(evt.target.value)

    let userLogin = (
        <>
            <div align="center">
                <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
            </div> 
        </>
    )
    if (user !== null)
    {
        userLogin = (
            <>
                <div align="left">
                    <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Filter</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" label="Filter">
                            <MenuItem value="" />
                            <MenuItem value="">Group</MenuItem>
                            <MenuItem value="">Role</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label="Search" variant="outlined" size="small" value={kw} onChange={e => setKeyWord(e.target.value)} style={{ marginRight: '1%' }}/>
                    <Button onClick={search} variant="contained" style={{  backgroundColor: "#609b56" }}><i className="material-icons" style={{ color: '#FFECC9' }}>search</i></Button>
                </div>
                <br />
                <hr />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Full name</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Username</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Email</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Role</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Active</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(u => {
                                let url = `/spendings/${u.id}/`
                                return (
                                <TableRow key={u.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">{u.id}</TableCell>
                                <TableCell component="th" scope="row">{u.first_name + " " + u.last_name}</TableCell>
                                <TableCell component="th" scope="row">{u.username}</TableCell>
                                <TableCell component="th" scope="row">{u.email}</TableCell>
                                {u.is_superuser === true?
                                    <TableCell component="th" scope="row" style={{ color: '#609b56' }}>Superuser</TableCell>:
                                    u.is_staff === true?
                                    <TableCell component="th" scope="row" style={{ color: '#F1C338' }}>Leader</TableCell>:
                                    <TableCell component="th" scope="row">User</TableCell>
                                }
                                {u.is_active === true?
                                    <TableCell component="th" scope="row" style={{ color: '#609b56' }}>Active</TableCell>:
                                    <TableCell component="th" scope="row">Inactive</TableCell>
                                }
                                <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <div align="right" >
                    <Link style={{ textDecoration: 'none' }} to={`/register/`}><Button style={{ color: '#F1C338' }}><strong>Register</strong></Button></Link>
                </div>
                
                <div style={{ display: "flex", height: "30px" }} >
                    <Select labelId="demo-select-small" size="small" id="demo-simple-select" style={{ marginRight: '1%' }} value={pageSize} onChange={changePageSize}>
                        <MenuItem value="2" >2</MenuItem>
                        <MenuItem value="3" >3</MenuItem>
                        <MenuItem value="5" >5</MenuItem>
                    </Select>
                    <h5 style={{ marginRight: '1%', marginTop: '0.5%' }}>Page {page}</h5>
                    {previous !== null?
                        <Button onClick={prevPage} size="small" variant="outline-primary" style={{ backgroundColor: '#609b56', marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_left</i></Button>:
                        <span/>
                    }
                    {next !== null?
                    <Button onClick={nextPage} size="small" variant="outline-primary" style={{ backgroundColor: '#609b56' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_right</i></Button>:
                    <span/>
                    }
                </div>
            </>
        )
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