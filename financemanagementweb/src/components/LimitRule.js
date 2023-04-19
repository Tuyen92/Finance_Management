import { useContext, useEffect, useState } from "react";
import API, { authAPI, endpoints } from "../configs/API";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Numeral from 'numeral';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import { UseContext } from "../configs/UseContext";


const LimitRules = () => {
    const[limitRule, setLimitRule] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const[t] = useSearchParams()
    const[user, dispatch] = useContext(UseContext)

    useEffect(() => {
        const loadLimitRules = async () => {
          let e = `${endpoints['limit_rules']}?`
            
          let type = t.get("type")
          if (type !== null)
            e += `&content=${type}`

          let res =  await API.get(e)
          // console.log(res.data.results)
          setLimitRule(res.data.results)
        }

        loadLimitRules()
    }, [t])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    let limitRulLogin = (
      <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
      </>
    )
    if (user !== null)
    {
      limitRulLogin = (
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
            <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>New Limit Rule</strong></Button></Link>
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
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>LIMIT RULE LIST</h1>
        </div>
        {limitRulLogin}
      </>
    )
}

export default LimitRules