import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";


const GroupsUser = () => {
    const[group, setGroup] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const [n] = useSearchParams()
    
    useEffect(() => {
        const loadGroups = async () => {
            let e = `${endpoints['groups']}?`
            
            let name = n.get("name")
            if (name !== null)
                e += `&name=${name}`

            let res =  await API.get(e)
            console.log(res.data)
            setGroup(res.data.results)
        }
        
        loadGroups()
    }, [n])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/spendings/?content=${kw}`)
    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>GROUP LIST</h1>
            </div>
            <div align="right">
                <TextField id="outlined-basic" label="Search" variant="outlined" value={kw} onChange={e => setKeyWord(e.target.value)} style={{ marginRight: '1%' }}/>
                <Button onClick={search} variant="contained" style={{  backgroundColor: "#609b56", marginTop: "0.5%" }}><i className="material-icons" style={{ color: '#FFECC9' }}>search</i></Button>
            </div>
            <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Name</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Number&nbsp;of&nbsp;members</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Leader</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Project</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Active</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {group.map(g => {
                        let url = `/groups/${g.id}/`
                        return (
                            <TableRow key={g.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{g.id}</TableCell>
                                <TableCell component="th" scope="row">{g.name}</TableCell>
                                <TableCell component="th" scope="row">{g.number}</TableCell>
                                <TableCell component="th" scope="row">{g.leader_id}</TableCell>
                                <TableCell component="th" scope="row">{g.project.name_project}</TableCell>
                                {g.is_active === true?
                                    <TableCell component="th" scope="row" style={{ color: '#609b56'}}><strong>Active</strong></TableCell>:
                                    <TableCell component="th" scope="row" style={{ color: 'red'}}><strong>Inactive</strong></TableCell>
                                }
                                <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <div align="right" style={{ display: 'flex', marginLeft: '75%'}}>
                <h4 style={{ color: '#F1C338', marginRight: '5%', marginTop: '30px' }}>Sort:</h4>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                    <InputLabel id="demo-simple-select-standard-label">Spending amount</InputLabel>
                        <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Spending amount" style={{ marginRight: '5%' }}>
                            <MenuItem value=""></MenuItem>
                            <MenuItem value={10}>Increase</MenuItem>
                            <MenuItem value={20}>Decrease</MenuItem>
                        </Select>
                </FormControl>
                {/* <Link style={{ textDecoration: 'none' }}><Button><strong>Sort</strong></Button></Link> */}
                <Link style={{ textDecoration: 'none' }} to={`/group/`}><Button style={{ color: '#F1C338', marginTop: '20px' }}><strong>New group</strong></Button></Link>
            </div>
            <div>
                <Pagination count={10} />
            </div>
        </>
    )
}

export default GroupsUser