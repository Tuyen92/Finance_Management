import { useContext, useState } from "react";
import { useEffect } from "react";
import { authAPI, endpoints } from "../configs/API";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import { UseContext } from "../configs/UseContext";
import Loading from "../layouts/Loading";
import Alert from '@mui/material/Alert';


const Users = () => {
    const[users, setUsers] = useState([])
    const[kw, setKeyWord] = useState("")
    const[f] = useSearchParams()
    const nav = useNavigate()
    const[user, dispatch] = useContext(UseContext)
    const[page, setPage] = useState(1)
    const[pageSize, setPageSize] = useState(2)
    const[next, setNext] = useState(null)
    const[previous, setPrevious] = useState(null)
    const[typeFilter, setTypeFilter] = useState(null)
    const[filter, setFilter] = useState({
      "group": "",
      "role": ""
    })
    const[err, setErr] = useState(null)

    useEffect(() => {
        const loadUsers = async () => {
            let e = `${endpoints['users']}?page_size=${pageSize}&page=${page}`

            let role = f.get("role")
            if (role !== null)
                e += `&role=${role}`

            let group = f.get("group")
            if (group !== null)
                e += `&group=${group}`

            let res = await authAPI().get(e)
            if (res.status == 200)
            {
                setUsers(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                // console.log(res.data.results)
                setErr(null)
            }
            else
                setErr(res.status)
        }

        loadUsers()
    }, [f, page, pageSize, err])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/user/?name=${kw}`)
    }

    const filtGroup = (evt) => {
        evt.preventDefault()
        nav(`/user/?group=${filter.group}`)
      }
  
      const filtRole = (evt) => {
        evt.preventDefault()
        nav(`/user/?role=${filter.role}`)
      }

    const setValue = e => {
        const { name, value } = e.target
        setFilter(current => ({...current, [name]:value}))
      }

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)
    const changePageSize = (evt) => setPageSize(evt.target.value)

    const changeFilter = (evt) => {
        evt.preventDefault()
        setTypeFilter(evt.target.value)
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

    if (users.length == 0)
    {
        return(<>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>USER LIST</h1>
            </div>
            <Loading />
            <br />
            {alert}
        </>)
    }

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
                        <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={typeFilter} onChange={changeFilter}>
                            <MenuItem value="group">Group</MenuItem>
                            <MenuItem value="role">Role</MenuItem>
                        </Select>
                    </FormControl>
                    {typeFilter === 'group'?
                    <>
                        <TextField id="outlined-basic" label="To amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="spending_limit_to" value={filter.group} onChange={setValue}/>
                        <Button variant="contained" onClick={filtGroup} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
                    </>:
                    typeFilter === 'role'?
                    <>
                        <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Role</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" name="role" value={filter.role} onChange={setValue}>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="leader">Leader</MenuItem>
                            <MenuItem value="superuser">Superuser</MenuItem>
                        </Select>
                        </FormControl>
                        <Button variant="contained" onClick={filtRole} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
                    </>:
                    <span />}
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
                                let url = `/user/${u.id}/`
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
            {alert}
            {userLogin}
        </>
    )
}

export default Users
