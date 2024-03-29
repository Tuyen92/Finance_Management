import { useContext, useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { useParams, Link } from "react-router-dom"
import { Container, Input, TextField } from "@mui/material"
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Numeral from 'numeral';
import { format, set } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { UseContext } from "../configs/UseContext";
import Loading from "../layouts/Loading";
import Alert from '@mui/material/Alert';


const GroupDetail = () => {
    const[currentUser, setCurrentUser] = useContext(UseContext)
    const[group, setGroup] = useState([])
    const {groupId} = useParams()
    const[users, setUser] = useState([])
    const[updatedGroup, setUpdatedGroup] = useState({
        "name": "",
        "project_id": "",
    })
    const[memberId, setMemberId] = useState("") 
    const[isActive, setActive] = useState("")
    const[err, setErr] = useState(null)

    useEffect(() => {
        const loadGroup = async () => {
            let res = await authAPI().get(endpoints['group'](groupId))
            // console.log(res.data)
            if (res.status === 200)
            {
                res.data.project.target = Numeral(res.data.project?.target).format(0,0)
                res.data.project.spending_amount = Numeral(res.data.project?.spending_amount).format(0,0)
                res.data.project.income_amount = Numeral(res.data.project?.income_amount).format(0,0)
                res.data.project.start_date = format(new Date(res.data.project?.start_date), 'dd/MM/yyyy')
                res.data.project.end_date = format(new Date(res.data.project?.end_date), 'dd/MM/yyyy')
                setGroup(res.data)
                setUser(res.data.users)
            }
            else
                setErr(res.status)
        }

        loadGroup()
    }, [groupId, isActive, err])

    const updateGroup = async () => {
        let form = new FormData()
        form.append("name", updatedGroup.name)
        let update = `${endpoints['group'](groupId)}edit/`
        let resUpdate = await authAPI().put(update, form)
    }

    const addMember = async () => {
        let idMember = []
        idMember.push(memberId)
        // console.log(memberId)
        try {
            let form = new FormData()
            form.append("users", memberId)
            let add = `${endpoints['group'](groupId)}add_member/`
            let resAdd = await authAPI().put(add, form)
        } catch (ex) {
            console.log(ex)
        }
        
    }

    const setValue = e => {
        const { name, value } = e.target
        setUpdatedGroup(current => ({...current, [name]:value}))
    }

    const setValueMember = e => {
        const { name, value } = e.target
        setMemberId(current => ({...current, [name]:value}))
    }

    const active = async () => {
        let eActive = `${endpoints['group'](groupId)}active/`
        let resActive = await authAPI().put(eActive)
        setActive(1)
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

    if (group.length == 0 && err == null)
    {return(
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>GROUP</h1>
            <Loading />
            <br />
        </>
    )}

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>GROUP&nbsp;-&nbsp;{group.name}</h1>
            {alert}
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Group information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={group.id} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <TextField id="name_group" type="text" value={group.name} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Number of members: </h4>
                    <TextField id="number" type="number" value={group.number} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Leader ID: </h4>
                    <TextField id="leader" type="text" value={group.leader_id} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Active: </h4>
                    <span></span>
                    {group.is_active === true?
                    <>
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '2%' }} />
                        <Button size="small" variant="outline-primary" onClick={active} style={{ backgroundColor: '#609b56', color: '#FFECC9', height: '10%', marginTop: '1%' }}><strong>Deactive group</strong></Button>
                    </>:
                    <>
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '2%' }} />
                        <Button size="small" variant="outline-primary" onClick={active} style={{ backgroundColor: '#609b56', color: '#FFECC9', height: '10%', marginTop: '1%' }}><strong>Active group</strong></Button>
                    </>                        
                    }
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Members information: </h3>
            </div>
            <br />
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Full name</strong></TableCell>
                            <TableCell component="th" scope="row"><strong>Role</strong></TableCell>
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
                                {u.is_superuser === true?
                                    <TableCell component="th" scope="row" typeof="text" style={{ color: '#609b56' }}>Superuser</TableCell>:
                                    u.is_staff === false?
                                    <TableCell component="th" scope="row" typeof="text">User</TableCell>:
                                    <TableCell component="th" scope="row" typeof="text" style={{ color: '#F1C338' }}>Leader</TableCell>
                                }
                                <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                            </TableRow>)
                            })} 
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <div align='right'>
                    {currentUser.is_staff === true?
                    <>
                        <form onSubmit={addMember}>
                            <TextField style={{ marginRight: '2%'}} label="ID of member" name="users" value={memberId} onChange={(evt) => {setMemberId(evt.target.value)}}/>
                            <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9', marginTop: '1%' }}><strong>Add member</strong></Button>
                        </form>
                    </>:
                    <span />}
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Name: </h4>
                    <TextField id="name_project" type="text" value={group.project?.name_project} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Target: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Target</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={group.project?.target} label="Target" style={{ marginRight: '2%'}}/>
                    </FormControl>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Income: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={group.project?.income_amount} label="Income" style={{ marginRight: '2%'}}/>
                    </FormControl>
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Spending: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Spending</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={group.project?.spending_amount} label="Spending" />
                    </FormControl>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                    <TextField id="name_project" type="text" value={group.project?.start_date} style={{ marginRight: '2%' }} />
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                    <TextField id="name_project" type="text" value={group.project?.end_date} style={{ marginRight: '2%' }} />
                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${group.project?.id}/`}><Button variant="outline-primary" style={{ backgroundColor: '#609b56', color: '#FFECC9' }}><strong>Project detail</strong></Button></Link>
                </div>
                <br />
            </Container>
            {currentUser.is_staff?
            <>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Update group: </h3>
                </div>
                <br />
                <Container>
                    <form>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Name: </h4>
                            <TextField id="name_project" label="New name of group..." type="text" name="name" value={updatedGroup.name} style={{ width: '60%', marginRight: '2%' }} onChange={updateGroup} />

                            <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Project ID: </h4>
                            <TextField id="name_project" label="New project's Id..." type="text" name="project_id" value={updatedGroup.project_id} onChange={updateGroup} />
                        </div>
                        <br />
                        <div  align="center">
                            <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}><strong>Update</strong></Button>
                        </div>
                    </form>
                    <br />
                </Container>
            </>:<span />}
            <div style={{ backgroundColor: "#609b56" }}>
                <br />
            </div>
            <br />
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F46841', marginRight: '2%' }}><strong>Delete</strong></Button></Link>
                {currentUser.is_superuser === true?
                    group.is_active === true?
                    <Button style={{ color: '#F46841', marginRight: '2%' }}><strong>End group</strong></Button>:
                    <Button style={{ color: '#F46841', marginRight: '2%' }}><strong>Active group</strong></Button>:
                    <span />}
                <Link style={{ textDecoration: 'none' }} to={`/statistic/group/${groupId}`}><Button style={{ color: '#F46841', marginRight: '2%' }}><strong>Statistic</strong></Button></Link> 
            </div>
        </>
    )
}

export default GroupDetail
