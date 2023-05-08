import { useContext, useEffect } from "react";
import { useState } from "react";
import { authAPI, endpoints } from "../configs/API";
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { UseContext } from "../configs/UseContext";
import Loading from "../layouts/Loading";
import Alert from '@mui/material/Alert';


const Meetings = () => {
  const[meeting, setMeeting] = useState([])
  const[s, setSort] = useState("")
  const[kw, setKeyWord] = useState("")
  const nav = useNavigate()
  const [c] = useSearchParams()
  const[user, dispatch] = useContext(UseContext)
  const[page, setPage] = useState(1)
  const[pageSize, setPageSize] = useState(2)
  const[next, setNext] = useState(null)
  const[previous, setPrevious] = useState(null)
  const[typeFilter, setTypeFilter] = useState(null)
  const[filter, setFilter] = useState({
    "date_from": "",
    "date_to": "",
    "active": "",
    "group": ""
  })
  const[err, setErr] = useState(null)

  useEffect(() => {
      const loadMeetings = async () => {
        let e = `${endpoints['meetings']}?page_size=${pageSize}&page=${page}`
          
        let group = c.get("group")
        if (group !== null)
          e += `&group=${group}`

        let sort = c.get("sort")
        if (sort !== null)
          e += `&sort=${sort}`
        
        let name = c.get("name")
        if (name !== null)
          e += `&name=${name}`

        let date_from = c.get("date_from")
        if (date_from != null)
          e += `&date_from=${date_from}`

        let date_to = c.get("date_to")
        if (date_to != null)
          e += `&date_to=${date_to}`

        let active = c.get("active")
        if (active != null)
          e += `&active=${active}`

        if (filter.date_from != "" && filter.date_to != "")
          if (filter.date_from >= filter.date_to == true)
            setErr("Wrong date!")

        if (err == null)
        {
          let res =  await authAPI().get(e)
          if (res.status == 200)
          {
            setNext(res.data.next)
            setPrevious(res.data.previous)
            // console.log(res.data.results)
            setMeeting(res.data.results)
            if (res.count == 0)
              setErr("No Data!")
          }
          else
            setErr(res.status)
        }
      }

      loadMeetings()
  }, [c, page, pageSize, err])
  
  const search = (evt) => {
    evt.preventDefault()
    nav(`/meeting_schedules/?name=${kw}`)
  }

  const changeFilter = (evt) => {
    evt.preventDefault()
    setTypeFilter(evt.target.value)
  }

  const setValue = e => {
    const { name, value } = e.target
    setFilter(current => ({...current, [name]:value}))
  }

  const filtGroup = (evt) => {
    evt.preventDefault()
    nav(`/meeting_schedules/?group=${filter.group}`)
  }

  const filtActive = (evt) => {
    evt.preventDefault()
    nav(`/meeting_schedules/?active=${filter.active}`)
  }

  const filtDate = (evt) => {
    evt.preventDefault()
    nav(`/meeting_schedules/?date_from=${filter.date_from}&date_to=${filter.date_to}`)
  }

  const nextPage = () => setPage(current => current + 1)
  const prevPage = () => setPage(current => current - 1)
  const changePageSize = (evt) => setPageSize(evt.target.value)

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

  if (meeting.length == 0 && user != null)
  {return(
  <>
    <div>
        <h1 style={{ textAlign: 'center', color: '#F1C338' }}>MEETING SCHEDULE LIST</h1>
      </div>
    <Loading />
    {alert}
  </>)}

  let meetingLogin = (
    <>
      <div align="center">
        <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
      </div>
    </>
  )
  if (user !== null)
  {
    let userCreateMeeting = (<></>)
    if (user.is_staff === true || user.is_superuser === true)
    {
      userCreateMeeting = (
        <>
          <Link style={{ textDecoration: 'none' }} to={`/meeting_schedule/`}><Button style={{ color: '#F1C338' }}><strong>New meetings</strong></Button></Link>
        </>
      )
    }
    meetingLogin = (
      <>
        <div align="leaf">
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={typeFilter} onChange={changeFilter}>
              <MenuItem value="group">Group</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
          {typeFilter === "group"?
          <>
            <TextField id="outlined-basic" type="text" label="Group ID..." variant="outlined" size="small" style={{ marginRight: '1%'}} name="group" value={filter.group} onChange={setValue}/>
            <Button variant="contained" onClick={filtGroup} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === "active"?
          <>
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Active</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" name="active" value={filter.active} onChange={setValue}>
                <MenuItem value="1">Activated</MenuItem>
                <MenuItem value="0">Not Activated</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={filtActive} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === "date"?
          <>
            <label style={{ color: '#609b56' }}><strong>From: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%'}} name="date_from" value={filter.date_from} onChange={setValue}/>
            <label style={{ color: '#609b56' }}><strong>To: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%'}} name="date_to" value={filter.date_to} onChange={setValue}/>
            <Button variant="contained" onClick={filtDate} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          <></>}
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
                <TableCell component="th" scope="row"><strong>Content</strong></TableCell>
                <TableCell align="right"><strong>Date&nbsp;time</strong></TableCell>
                <TableCell align="right"><strong>Vote</strong></TableCell>
                <TableCell align="right"><strong>Group</strong></TableCell>
                <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meeting.map(m => {
                let url = `/meetings/${m.id}/`
                return (
                <TableRow key={m.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell component="th" scope="row">{m.id}</TableCell>
                  <TableCell component="th" scope="row">{m.content}</TableCell>
                  <TableCell align="right">{format(new Date(m.date_time), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell align="right">{m.vote}</TableCell>
                  <TableCell align="right">{m.group?.id}</TableCell>
                  <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <div align="right">
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
            <InputLabel id="demo-select-small">Sort</InputLabel>
            <Select labelId="demo-select-small" id="demo-select-small" label="Filter" name={s} onChange={e => {
              setSort(e.target.value)
              e.preventDefault()
              nav(`/meeting_schedules/?sort=${e.target.value}`)}
            }>
              <MenuItem value="1">Increase</MenuItem>
              <MenuItem value="0">Decrease</MenuItem> 
            </Select>
          </FormControl>
          {userCreateMeeting}
        </div>
        
        <div style={{ display: "flex", height: "30px"  }}>
          <Select labelId="demo-select-small" size="small" id="demo-simple-select" style={{ marginRight: '1%' }} value={pageSize} onChange={changePageSize}>
            <MenuItem value="2" >2</MenuItem>
            <MenuItem value="3" >3</MenuItem>
            <MenuItem value="5" >5</MenuItem>
          </Select>
          <h5 style={{ marginRight: '1%', marginTop: '0.5%' }}>Page {page}</h5>
          {previous !== null?
            <Button onClick={prevPage} variant="outline-primary" style={{ backgroundColor: '#609b56', marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_left</i></Button>:
            <span/>
          }
          {next !== null?
          <Button onClick={nextPage} variant="outline-primary" style={{ backgroundColor: '#609b56' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_right</i></Button>:
          <span/>
          }
        </div>
      </>
    )
  }

  return (
      <>
        <div>
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>MEETING SCHEDULE LIST</h1>
        </div>
        {alert}
        {meetingLogin}
      </>
  )
}

export default Meetings
