import { useEffect, useState } from "react"
import { useContext } from "react"
import { UseContext } from "../configs/UseContext"
import Loading from "../layouts/Loading"
import { useParams } from "react-router-dom"
import { Container, TextField } from "@mui/material"
import { authAPI, endpoints } from "../configs/API"
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Numeral from 'numeral';
import { format, set } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';


const Statistic = () => {
    const[user, dispatch] = useContext(UseContext)
    const[group, setGroup] = useState(null)
    const[users, setUsers] = useState([])
    const[project, setProject] = useState(null)
    const[groupStatistic, setGroupStatistic] = useState([])
    const[projectStatistic, setProjectStatistic] = useState([])
    const {type, id} = useParams()
    const[err, setErr] = useState(null)

    useEffect(() => {
        const loading = async () => {
            if (type == 'project')
            {
                let e = `${endpoints['project'](id)}`
                let res = await authAPI().get(e)
                res.data.target = Numeral(res.data.target).format('0,0')
                res.data.spending_amount = Numeral(res.data.spending_amount).format('0,0')
                res.data.income_amount = Numeral(res.data.income_amount).format('0,0')
                res.data.start_date = format(new Date(res.data.start_date), 'dd/MM/yyyy')
                res.data.end_date = format(new Date(res.data.end_date), 'dd/MM/yyyy')
                setProject(res.data)

                let eGroup = `${endpoints['groups']}?`
                eGroup += `project=${id}`
                let resGroup = await authAPI().get(eGroup)
                console.log(resGroup)
                setGroup(resGroup.data.results)
                setUsers(resGroup.data.results[0].users)

                let eStatistic = e + "report/"
                let resStatistic = await authAPI().get(eStatistic)
                let eGetStatistic = `${endpoints['project_statistic']}?id=${id}`
                let resGetStatistic = await authAPI().get(eGetStatistic)
                if (resStatistic.data == "")
                {
                    if (resGetStatistic.data.count > 0)
                        setProjectStatistic(resGetStatistic.data.results)
                }
                else
                    setErr(resStatistic.data)
            }

            if (type == 'group')
            {
                let e = `${endpoints['group'](id)}`
                let res = await authAPI().get(e)
                setGroup(res.data)

                let eStatistic = e + "statistic/"
                let resStatistic = await authAPI().get(eStatistic)
                let eGetStatistic = `${endpoints['group_statistic']}?id=${id}`
                let resGetStatistic = await authAPI().get(eGetStatistic)
                if (resStatistic.data == "")
                {
                    if (resGetStatistic.data.count > 0)
                        setGroupStatistic(resGetStatistic.data.results)
                }
                else
                    setErr(resStatistic.data)
            }
        }
        loading()
    }, [id, err])

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

    let statisticData = (<></>)
    if (type == 'group')
    {
        if (group == null)
        {return(<Loading />)}
        statisticData = (
            <>
                <h1 style={{ textAlign: "center", color: "#F1C338" }}>STATISTIC GROUP</h1>
                {alert}
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Group's information: </h3>
                </div>
                <br />
                <Container>
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                        <TextField id="id" type="text" value={group.id} style={{ width: '10%', marginRight: '2%' }} />

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                        <TextField id="name_group" type="text" value={group.name} style={{ width: '100%' }} />
                    </div>
                </Container>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px" }}>Group's statistic: </h3>
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
                                <TableCell component="th" scope="row"><strong>Total spending</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Total income</strong></TableCell>
                                <TableCell component="th" scope="row"><strong> % Spending</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>% Income</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {groupStatistic.map(gs => {
                                // let url = `/user/${u.id}/`
                                return (
                                <TableRow key={gs.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell component="th" scope="row">{gs.user.id}</TableCell>
                                    <TableCell component="th" scope="row">{gs.user.first_name} {gs.user.last_name}</TableCell>
                                    {gs.user.is_superuser === true?
                                        <TableCell component="th" scope="row" typeof="text" style={{ color: '#609b56' }}>Superuser</TableCell>:
                                        gs.user.is_staff === false?
                                        <TableCell component="th" scope="row" typeof="text">User</TableCell>:
                                        <TableCell component="th" scope="row" typeof="text" style={{ color: '#F1C338' }}>Leader</TableCell>
                                    }
                                    <TableCell component="th" scope="row">{Numeral(gs.total_spending).format('0,0')}</TableCell>
                                    <TableCell component="th" scope="row">{Numeral(gs.total_income).format('0,0')}</TableCell>
                                    <TableCell component="th" scope="row">{gs.percent_spending} %</TableCell>
                                    <TableCell component="th" scope="row">{gs.percent_income} %</TableCell>
                                </TableRow>)
                                })} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <br />
            </>
        )
    }

    if (type == 'project')
    {
        if (project == null)
        {return(<Loading />)}
        statisticData = (
            <>
                <h1 style={{ textAlign: "center", color: "#F1C338" }}>STATISTIC PROJECT</h1>
                {alert}
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project's information: </h3>
                </div>
                <br />
                <Container>
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                        <TextField id="id" type="text" value={project.id} style={{ width: '20%', marginRight: '2%' }} />

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                        <TextField id="name_project" type="text" name="name_project" value={project.name_project} style={{ width: '100%' }} />
                    </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Target</InputLabel>
                            <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                value={project.target} label="Target" style={{ marginRight: '2%'}}/>
                        </FormControl>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                        <TextField id="start_date" type="text" value={project.start_date} style={{ marginRight: '2%' }} />

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                        <TextField id="end_date" type="text" value={project.end_date} />
                    </div>
                </Container>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project's statistic: </h3>
                </div>
                <br />
                <Container>
                    <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total income: </h4>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
                            <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                style={{ marginRight: '2%' }} value={project.income_amount} label="Income"/>
                        </FormControl>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total spending: </h4>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Spending</InputLabel>
                            <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                value={project.spending_amount} label="Spending"/>
                        </FormControl>
                    </div>
                </Container>
                <br />
                <Container>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Full name</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Role</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Total spending</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>Total income</strong></TableCell>
                                <TableCell component="th" scope="row"><strong> % Spending</strong></TableCell>
                                <TableCell component="th" scope="row"><strong>% Income</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {projectStatistic.map(ps => {
                                let dataTable = ([<></>])
                                return (
                                <TableRow key={ps.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    {users.map(u => {u.id === ps.user?
                                    dataTable.push(<>
                                        <TableCell component="th" scope="row">{u.id}</TableCell>
                                        <TableCell component="th" scope="row">{u.first_name} {u.last_name}</TableCell>
                                        {u.is_superuser === true?
                                            <TableCell component="th" scope="row" typeof="text" style={{ color: '#609b56' }}>Superuser</TableCell>:
                                            u.is_staff === false?
                                            <TableCell component="th" scope="row" typeof="text">User</TableCell>:
                                            <TableCell component="th" scope="row" typeof="text" style={{ color: '#F1C338' }}>Leader</TableCell>
                                        }
                                        <TableCell component="th" scope="row">{Numeral(ps.total_spending).format('0,0')}</TableCell>
                                        <TableCell component="th" scope="row">{Numeral(ps.total_income).format('0,0')}</TableCell>
                                        <TableCell component="th" scope="row">{ps.percent_spending} %</TableCell>
                                        <TableCell component="th" scope="row">{ps.percent_income} %</TableCell>
                                    </>):
                                    dataTable.push(<></>)})}
                                    {dataTable}
                                </TableRow>)
                                })} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <br />
            </>
        )
    }

    return (<>{statisticData}</>)
}

export default Statistic
