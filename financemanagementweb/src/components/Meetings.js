import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import cookie from 'react-cookies';


const Meetings = () => {
    const[meeting, setMeeting] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const [c] = useSearchParams()

    useEffect(() => {
        const loadMeetings = async () => {
          let e = `${endpoints['meetings']}?`
            
          let content = c.get("content")
          if (content !== null)
            e += `&content=${content}`

          let res =  await API.get(e)
          console.log(res.data.results)
          setMeeting(res.data.results)
        }

        loadMeetings()
    }, [c])
    
    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    let meetingLogin = (
      <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
      </>
    )
    if (cookie !== null)
    {
      meetingLogin = (
        <>
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
                  <TableCell component="th" scope="row"><strong>Content</strong></TableCell>
                  <TableCell align="right"><strong>Date&nbsp;time</strong></TableCell>
                  <TableCell align="right"><strong>Vote</strong></TableCell>
                  <TableCell align="right"><strong>Group</strong></TableCell>
                  <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              {/* {meeting.map(m => return (<h1>{m.id}</h1>))} */}
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
          <hr/>
          <div align="right">
            <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Sort</strong></Button></Link>
            <Link style={{ textDecoration: 'none' }} to={`/meeting_schedule/`}><Button style={{ color: '#F1C338' }}><strong>New</strong></Button></Link>
          </div>
          <div>
            <Pagination count={10} />
          </div>
        </>
      )
    }

    return (
        <>
          <div>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>MEETING SCHEDULE LIST</h1>
          </div>
        </>
    )
}

export default Meetings
