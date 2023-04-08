import * as React from 'react'
import { useEffect } from "react"
import API, { endpoints } from "../configs/API"
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


const Projects = () => {
    const[project, setProject] = useState([])

    useEffect(() => {
        const loadProjects = async () => {
            let res = await API.get(endpoints['projects'])
            setProject(res.data.results)
        }

        loadProjects()
    }, [])

    return (
        <>
        <div>
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>PROJECT LIST</h1>
        </div>
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
                    <TableCell align="right" typeof="number">{p.target}</TableCell>
                    <TableCell align="right">{p.income_amount}</TableCell>
                    <TableCell align="right">{p.spending_amount}</TableCell>
                    <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                  </TableRow>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <hr/>
          <div align="right">
            <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Sort</strong></Button></Link>
            <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>New</strong></Button></Link>
          </div>
          <div>
            <Pagination count={10} />
          </div>
        </>
    )
}

export default Projects
