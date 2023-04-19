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
import Pagination from '@mui/material/Pagination';
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
    const nav = useNavigate()
    const[n] = useSearchParams()
    const[user, dispatch] = useContext(UseContext)

    useEffect(() => {
        const loadProjects = async () => {
          let e = `${endpoints['projects']}?`
            
          let name = n.get("name")
          if (name !== null)
            e += `&name_project=${name}`

          let res =  await API.get(e)
          // console.log(res.data.results)
          setProject(res.data.results)
        }

        loadProjects()
    }, [n])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
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
      projectLogin = (
        <>
          <div align="left">
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Filter</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" label="Filter">
                <MenuItem value="" />
                <MenuItem value=""></MenuItem>
                <MenuItem value=""></MenuItem>
                <MenuItem value=""></MenuItem>
              </Select>
            </FormControl>
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
                <Select labelId="demo-select-small" id="demo-select-small" label="Filter">
                  <MenuItem value="" />
                  <MenuItem value="">Increase</MenuItem>
                  <MenuItem value="">Decrease</MenuItem>
                </Select>
              </FormControl>
              <Link style={{ textDecoration: 'none' }} to={`/project/`}><Button style={{ color: '#F1C338' }}><strong>New project</strong></Button></Link>
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
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>PROJECT LIST</h1>
        </div>
       {projectLogin}
        </>
    )
}

export default Projects
