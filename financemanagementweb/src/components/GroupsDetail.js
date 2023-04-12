import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { useParams, Link } from "react-router-dom"
import { Container, Input } from "@mui/material"
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Numeral from 'numeral';
import { format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const GroupDetail = () => {
    const[group, setGroup] = useState([])
    const {groupId} = useParams()
    const[users, setUser] = useState([])

    useEffect(() => {
        const loadGroup = async () => {
            let res = await API.get(endpoints['group'](groupId))
            res.data.project.target = Numeral(res.data.project?.target).format(0,0)
            res.data.project.spending_amount = Numeral(res.data.project?.spending_amount).format(0,0)
            res.data.project.income_amount = Numeral(res.data.project?.income_amount).format(0,0)
            res.data.project.start_date = format(new Date(res.data.project?.start_date), 'dd/MM/yyyy HH:mm:ss')
            res.data.project.end_date = format(new Date(res.data.project?.end_date), 'dd/MM/yyyy HH:mm:ss')
            console.log(res.data)
            setGroup(res.data)
            setUser(res.data.users)
        }

        loadGroup()
    }, [groupId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>GROUP&nbsp;-&nbsp;{group.name}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Group information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>ID: </h4>
                    <Input id="id" type="text" value={group.id} style={{ width: '20%', marginRight: '1%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Name: </h4>
                    <Input id="name_group" type="text" value={group.name} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Number of members: </h4>
                    <Input id="number" type="number" value={group.number} style={{ width: '5%', marginRight: '1%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Status: </h4>
                    <span></span>
                    {group.is_active === true?
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                    }

                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Leader ID: </h4>
                    <Input id="leader" type="text" value={group.leader_id} style={{ width: '5%', marginRight: '1%' }} />
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Members information: </h3>
            </div>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Full name</strong></TableCell>
                            <TableCell align="right"><strong>Role</strong></TableCell>
                            <TableCell align="right"><strong>Leader</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {users.map(u => {
                            let url = `/user/${u.id}/`
                            return (
                            <TableRow key={u.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">{u.id}</TableCell>
                                <TableCell component="th" scope="row">{u.first_name} {u.last_name}</TableCell>
                                <TableCell align="right" typeof="number"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                            </TableRow>)
                            })} 
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Name: </h4>
                    <Input id="name_project" type="text" value={group.project?.name_project} style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Target: </h4>
                    <Input id="name_project" type="text" value={group.project?.target} style={{ width: '50%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                </div>

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Income: </h4>
                    <Input id="name_project" type="text" value={group.project?.income_amount} style={{ width: '50%', marginRight: '1%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Spending: </h4>
                    <Input id="name_project" type="text" value={group.project?.spending_amount} style={{ width: '50%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Start date: </h4>
                    <Input id="name_project" type="text" value={group.project?.start_date} style={{ marginRight: '1%' }} />
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>End date: </h4>
                    <Input id="name_project" type="text" value={group.project?.end_date} />
                </div>
                <br />
                <div align="center">
                   <Link style={{ textDecoration: 'none' }} to={`/projects/${group.project?.id}/`}><Button style={{ color: '#F1C338' }}><strong>Project detail</strong></Button></Link>
                </div>
            </Container>
            
            <div>
                <h3 style={{ color: "#FFECC9", marginLeft: "10px"  }} />
            </div>
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Delete</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Update</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>End group</strong></Button></Link>
            </div>
        </>
    )
}

export default GroupDetail
