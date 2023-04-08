import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
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

const LimitRules = () => {
    const[limitRule, setLimitRule] = useState([])

    useEffect(() => {
        const loadLimitRules = async () => {
            let res = await API.get(endpoints['limit_rules'])
            setLimitRule(res.data.results)
        }

        loadLimitRules()
    }, [])

    return (
        <>
          <div>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>LIMIT RULE LIST</h1>
          </div>
          <hr />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                  <TableCell component="th" scope="row"><strong>Type</strong></TableCell>
                  <TableCell align="right"><strong>Spending&nbsp;limit</strong></TableCell>
                  <TableCell align="right"><strong>Income&nbsp;limit</strong></TableCell>
                  <TableCell align="right"><strong>From&nbsp;date</strong></TableCell>
                  <TableCell align="right"><strong>To&nbsp;date</strong></TableCell>
                  <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {limitRule.map(l => {
                  let url = `/limit_rule/${l.id}`
                  return (
                    <TableRow key={l.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">{l.id}</TableCell>
                      <TableCell component="th" scope="row">{l.type}</TableCell>
                      <TableCell align="right">{l.spending_limit}</TableCell>
                      <TableCell align="right">{l.income_limit}</TableCell>
                      <TableCell align="right">{l.from_date}</TableCell>
                      <TableCell align="right">{l.to_date}</TableCell>
                      <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Inactive</strong></Button></Link></TableCell>
                    </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
          <hr/>
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

export default LimitRules