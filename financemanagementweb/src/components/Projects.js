import * as React from 'react'
import { useContext, useEffect } from "react"
import { authAPI, endpoints } from "../configs/API"
import { useState } from "react"
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Numeral from 'numeral';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import { UseContext } from "../configs/UseContext";
import Loading from '../layouts/Loading'
import Alert from '@mui/material/Alert';
import { ContentCopy } from '@mui/icons-material'


const Projects = () => {
    const[project, setProject] = useState([])
    const[kw, setKeyWord] = useState("")
    const[s, setSort] = useState("")
    const nav = useNavigate()
    const[n] = useSearchParams()
    const[user, dispatch] = useContext(UseContext)
    const[page, setPage] = useState(1)
    const[pageSize, setPageSize] = useState(2)
    const[next, setNext] = useState(null)
    const[previous, setPrevious] = useState(null)
    const[typeFilter, setTypeFilter] = useState(null)
    const[filter, setFilter] = useState({
      "target_from": "",
      "target_to": "",
      "type": "",
      "date_from": "",
      "date_to": "",
      "month": "",
      "year": "",
      "ended": ""
    })
    const[err, setErr] = useState(null)

    useEffect(() => {
        const loadProjects = async () => {
          let e = `${endpoints['projects']}?page_size=${pageSize}&page=${page}`
            
          let name = n.get("name")
          if (name !== null)
            e += `&name=${name}`

          let sort = n.get("sort")
          if (sort !== null)
            e += `&sort=${sort}`

          let target_from = n.get("target_from")
          if (target_from !== null)
            e += `&target_from=${target_from}`

          let target_to = n.get("target_to")
          if (target_to !== null)
            e += `&target_to=${target_to}`

          let date_to = n.get("date_to")
          if (date_to !== null)
            e += `&date_to=${date_to}`

          let date_from = n.get("date_from")
          if (date_from !== null)
            e += `&date_from=${date_from}`

          let type = typeFilter
          if (type == "start_date" || type == "end_date")
            e += `&type=${type}`
          
          let month = n.get("month")
          if (month !== null)
            e += `&month=${month}`

          let year = n.get("year")
          if (year !== null)
            e += `&year=${year}`

          let ended = n.get("ended")
          if (ended !== null)
            e += `&ended=${ended}`

          if (filter.target_from != "" && filter.target_to != "")
            if (filter.target_from >= filter.target_to == true)
              setErr("Wrong target!")

          if (filter.date_from != "" && filter.date_to != "")
            if (filter.date_from >= filter.date_to == true)
              setErr("Wrong date!")

          console.log(err)
          if (err == null)
          {
            let res =  await authAPI().get(e)
              if (res.status == 200)
              {
                console.log(res)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                setProject(res.data.results)
                if (res.count == 0)
                  setErr("No data")
              }
              else
                setErr(res.status)
            // console.log(res.data.results)
            // console.log(user)
          }
        }

        loadProjects()
    }, [n, page, pageSize, err])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/projects/?name=${kw}`)
    }

    const setValue = e => {
      const { name, value } = e.target
      setFilter(current => ({...current, [name]:value}))
    }

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)
    const changePageSize = (evt) => setPageSize(evt.target.value)

    const filtTarget = (evt) => {
      evt.preventDefault()
      nav(`/projects/?target_from=${filter.target_from}&target_to=${filter.target_to}`)
    }

    const filtDate = (evt) => {
      evt.preventDefault()
      if (typeFilter == 'start_date')
        nav(`/projects/?type=start_date&date_from=${filter.date_from}&date_to=${filter.date_to}`)
      if (typeFilter == 'end_date')
        nav(`/projects/?type=end_date&date_from=${filter.date_from}&date_to=${filter.date_to}`)
    }

    const filtMonth = (evt) => {
      evt.preventDefault()
      if (typeFilter == 'start_date')
        nav(`/projects/?type=start_date&month=${filter.month}`)
      if (typeFilter == 'end_date')
        nav(`/projects/?type=end_date&month=${filter.month}`)
    }

    const filtYear = (evt) => {
      evt.preventDefault()
      if (typeFilter == 'start_date')
        nav(`/projects/?type=start_date&year=${filter.year}`)
      if (typeFilter == 'end_date')
        nav(`/projects/?type=end_date&year=${filter.year}`)
    }

    const filtWorking = (evt) => {
      evt.preventDefault()
      nav(`/projects/?ended=${filter.ended}`)
    }

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

    if (project.length == 0 && err == null)
    {
      let userCreateProject = (<></>)
      if (user !== null)
      {
        if (user.is_staff === true || user.is_superuser === true)
        {
          userCreateProject = (
            <>
              <Link style={{ textDecoration: 'none' }} to={`/project/`}><Button style={{ color: '#F1C338' }}><strong>New project</strong></Button></Link>
            </>)
        }
      }

      return(
      <>
        <div>
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>PROJECT LIST</h1>
        </div>
        <Loading />
        <br />
        <div align="right">
          {userCreateProject}
        </div>
      </>)
    }
    
    let projectLogin = (
      <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
      </>
    )
    if (user !== null)
    {
      let userCreateProject = (<></>)
      if (user.is_staff === true || user.is_superuser === true)
      {
        userCreateProject = (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/project/`}><Button style={{ color: '#F1C338' }}><strong>New project</strong></Button></Link>
          </>)
      }
      projectLogin = (
        <>
          <div align="left">
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Filter</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={typeFilter} onChange={changeFilter}>
                <MenuItem value="target">Target</MenuItem>
                <MenuItem value="working">Working</MenuItem>
                <MenuItem value="start_date">Start date</MenuItem>
                <MenuItem value="end_date">End date</MenuItem>
              </Select>
            </FormControl>
            {typeFilter === 'target'?
          <>
            <TextField id="outlined-basic" label="From target" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="target_from" value={filter.target_from} onChange={setValue}/>
            <TextField id="outlined-basic" label="To target" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="target_to" value={filter.target_to} onChange={setValue}/>
            <Button variant="contained" onClick={filtTarget} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === 'working'?
          <>
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Working</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" name="ended" value={filter.ended} onChange={setValue}>
                <MenuItem value="0">Ended</MenuItem>
                <MenuItem value="1">Not Ended</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={filtWorking} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === 'start_date'?
          <>
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Time</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" name="type" value={filter.type} onChange={setValue}>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>
            {filter.type === 'date'?
            <>
              <label style={{ color: '#609b56' }}><strong>From: </strong></label>
              <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.date_from} onChange={setValue}/>
              <label style={{ color: '#609b56' }}><strong>To: </strong></label>
              <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_to" value={filter.date_to} onChange={setValue}/>
              <Button variant="contained" onClick={filtDate} style={{ backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            filter.type === 'month'?
            <>
              <TextField id="outlined-basic" type="text" label="Month..." variant="outlined" size="small" style={{ marginRight: '1%' }} name="month" value={filter.month} onChange={setValue}/>
              <Button variant="contained" onClick={filtMonth} style={{ backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            filter.type === 'year'?
            <>
              <TextField id="outlined-basic" type="text" label="Year..." variant="outlined" size="small" style={{ marginRight: '1%' }} name="year" value={filter.year} onChange={setValue}/>
              <Button variant="contained" onClick={filtYear} style={{ backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            <span />
            }
          </>:
          typeFilter === 'end_date'?
          <>
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Time</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" name="type" value={filter.type} onChange={setValue}>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>
            {filter.type === 'date'?
            <>
              <label style={{ color: '#609b56' }}><strong>From: </strong></label>
              <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.date_from} onChange={setValue}/>
              <label style={{ color: '#609b56' }}><strong>To: </strong></label>
              <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_to" value={filter.date_to} onChange={setValue}/>
              <Button variant="contained" onClick={filtDate} style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            filter.type === 'month'?
            <>
              <label style={{ color: '#609b56' }}><strong>Month: </strong></label>
              <TextField id="outlined-basic" type="text" label="Month..." variant="outlined" size="small" style={{ marginRight: '1%' }} name="month" value={filter.month} onChange={setValue}/>
              <Button variant="contained" onClick={filtMonth} style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            filter.type === 'year'?
            <>
              <label style={{ color: '#609b56' }}><strong>Year: </strong></label>
              <TextField id="outlined-basic" type="text" label="Year..." variant="outlined" size="small" style={{ marginRight: '1%' }} name="year" value={filter.year} onChange={setValue}/>
              <Button variant="contained" onClick={filtYear} style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            <span />
            }
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
                  <TableCell component="th" scope="row"><strong>Project&nbsp;name</strong></TableCell>
                  <TableCell align="right"><strong>Target</strong></TableCell>
                  <TableCell align="right"><strong>Income</strong></TableCell>
                  <TableCell align="right"><strong>Spending</strong></TableCell>
                  <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project.map(p => {
                  let url = `/projects/${p.id}/`
                  return (
                    <TableRow key={p.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">{p.id}</TableCell>
                      <TableCell component="th" scope="row">{p.name_project}</TableCell>
                      <TableCell align="right">{Numeral(p.target).format('0,0')}</TableCell>
                      <TableCell align="right">{Numeral(p.income_amount).format('0,0')}</TableCell>
                      <TableCell align="right">{Numeral(p.spending_amount).format('0,0')}</TableCell>
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
                <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={s} onChange={e => {
                  setSort(e.target.value)
                  e.preventDefault()
                  nav(`/projects/?sort=${e.target.value}`)}
                }>
                  <MenuItem value="1">Increase Target</MenuItem>
                  <MenuItem value="0">Decrease Target</MenuItem>
                </Select>
              </FormControl>
              {userCreateProject}
            </div>
          
          <div style={{ display: "flex", height: "30px" }}>
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
        </>)
    }

    return (
        <>
          <div>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>PROJECT LIST</h1>
          </div>
          {alert}
          {projectLogin}
        </>
    )
}

export default Projects
