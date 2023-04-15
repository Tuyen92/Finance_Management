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
import Numeral from 'numeral';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";

const LimitRules = () => {
    const[limitRule, setLimitRule] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const [t] = useSearchParams()

    useEffect(() => {
        const loadLimitRules = async () => {
          let e = `${endpoints['limit_rules']}?`
            
          let type = t.get("type")
          if (type !== null)
            e += `&content=${type}`

          let res =  await API.get(e)
          console.log(res.data.results)
          setLimitRule(res.data.results)
        }

        loadLimitRules()
    }, [t])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    return (
        <>
          <div>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>LIMIT RULE LIST</h1>
          </div>
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
                      <TableCell align="right">{Numeral(l.spending_limit).format('0,0')}</TableCell>
                      <TableCell align="right">{Numeral(l.income_limit).format('0,0')}</TableCell>
                      <TableCell align="right">{format(new Date(l.from_date), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                      <TableCell align="right">{format(new Date(l.to_date), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                      <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Inactive</strong></Button></Link></TableCell>
                    </TableRow>
                )})}
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

export default LimitRules