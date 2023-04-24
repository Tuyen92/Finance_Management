import * as React from 'react'
import { useContext, useEffect } from "react"
import API, { authAPI, endpoints } from "../configs/API"
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

    useEffect(() => {
        const loadProjects = async () => {
          let e = `${endpoints['projects']}?`
            
          let name = n.get("name")
          if (name !== null)
            e += `&name_project=${name}`

          let res =  await API.get(e)
          setNext(res.data.next)
          setPrevious(res.data.previous)
          // console.log(res.data.results)
          setProject(res.data.results)
        }

        loadProjects()
    }, [n, page, pageSize])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
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
      if (filter.type == 'start_date')
        nav(`/projects/?type=start_date&date_from=${filter.date_from}&date_to=${filter.date_to}`)
      if (filter.type == 'end_date')
        nav(`/projects/?type=end_date&date_from=${filter.date_from}&date_to=${filter.date_to}`)
    }

    const filtMonth = (evt) => {
      evt.preventDefault()
      if (filter.type == 'start_date')
        nav(`/projects/?type=start_date&month=${filter.month}`)
      if (filter.type == 'end_date')
        nav(`/projects/?type=end_date&month=${filter.month}`)
    }

    const filtYear = (evt) => {
      evt.preventDefault()
      if (filter.type == 'start_date')
        nav(`/projects/?type=start_date&year=${filter.year}`)
      if (filter.type == 'end_date')
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

    let userCreateProject = (<></>)
    let projectLogin = (
      <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
      </>
    )
    if (user !== null)
    {
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
            <label style={{ color: '#609b56' }}><strong>From: </strong></label>
            <TextField id="outlined-basic" label="From amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="target_from" value={filter.target_from} onChange={setValue}/>
            <label style={{ color: '#609b56' }}><strong>To: </strong></label>
            <TextField id="outlined-basic" label="To amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="target_to" value={filter.target_to} onChange={setValue}/>
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
              <label style={{ color: '#609b56' }}><strong>Month: </strong></label>
            <TextField id="outlined-basic" onClick={filtMonth} type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.month} onChange={setValue}/>
            </>:
            filter.type === 'year'?
            <>
              <label style={{ color: '#609b56' }}><strong>Year: </strong></label>
            <TextField id="outlined-basic" onClick={filtYear} type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.year} onChange={setValue}/>
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
              <Button variant="contained" style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
            </>:
            filter.type === 'month'?
            <>
              <label style={{ color: '#609b56' }}><strong>Month: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.month} onChange={setValue}/>
            </>:
            filter.type === 'year'?
            <>
              <label style={{ color: '#609b56' }}><strong>Year: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.year} onChange={setValue}/>
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
                  <MenuItem value="1">Increase</MenuItem>
                  <MenuItem value="0">Decrease</MenuItem>
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

      if (user.is_staff === true || user.is_superuser === true)
        {
          userCreateProject = (
            <>
              <Link style={{ textDecoration: 'none' }} to={`/project/`}><Button style={{ color: '#F1C338' }}><strong>New project</strong></Button></Link>
            </>)
        }
    }

    return (
        <>
        <div>
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>PROJECT LIST</h1>
        </div>
       {projectLogin}
        </>
    )
}

export default Projects
