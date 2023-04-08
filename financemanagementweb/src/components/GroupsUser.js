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

const GroupsUser = () => {
    const[group, setGroup] = useState([])
    
    useEffect(() => {
        const loadGroups = async () => {
            let res = await API.get(endpoints['groups'])
            console.log(res.data)
            setGroup(res.data.results)
        }
        
        loadGroups()
    }, [])

    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>GROUP LIST</h1>
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
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F46841' }}><strong>Sort</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F46841' }}><strong>New</strong></Button></Link>
            </div>
            <div>
                <Pagination count={10} />
            </div>
        </>
    )
}

export default GroupsUser