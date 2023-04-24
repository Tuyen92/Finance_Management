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
    const[page, setPage] = useState(1)
    const[pageSize, setPageSize] = useState(2)
    const[total, setTotal] = useState(0)
    const[next, setNext] = useState(null)
    const[previous, setPrevious] = useState(null)
    const[typeFilter, setTypeFilter] = useState(null)
    const[filter, setFilter] = useState({
      "spending_limit_from": "",
      "spending_limit_to": "",
      "income_limit_from": "",
      "income_limit_to": "",
      "date_from": "",
      "to_date": ""
    })

    useEffect(() => {
        const loadLimitRules = async () => {
          let e = `${endpoints['limit_rules']}?`
            
          let type = t.get("type")
          if (type !== null)
            e += `&content=${type}`

          let spending_limit_from = t.get("spending_limit_from")
          if (spending_limit_from !== null)
            e += `&spending_limit_from=${filter.spending_limit_from}`

          let spending_limit_to = t.get("spending_limit_to")
          if (spending_limit_to !== null)
            e += `&spending_limit_to=${filter.spending_limit_to}`

          let income_limit_from = t.get("income_limit_from")
          if (income_limit_from !== null)
            e += `&income_limit_from=${filter.income_limit_from}`

          let income_limit_to = t.get("income_limit_to")
          if (income_limit_to !== null)
            e += `&income_limit_from=${filter.income_limit_to}`

          let date_from = t.get("date_from")
          if (date_from !== null)
            e += `&date_from=${filter.date_from}`

          let date_to = t.get("date_to")
          if (date_to !== null)
            e += `&date_to=${filter.date_to}`

          let res =  await API.get(e)
          setNext(res.data.next)
          setPrevious(res.data.previous)
          // console.log(res.data.results)
          setLimitRule(res.data.results)
        }

        loadLimitRules()
    }, [t, page, pageSize])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    const filtSpending = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?spending_limit_from=${filter.spending_limit_from}&spending_limit_to=${filter.spending_limit_to}`)
    }

    const filtIncome = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?income_limit_from=${filter.income_limit_from}&income_limit_to=${filter.income_limit_to}`)
    }

    const filtDate = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?from_date=${filter.from_date}&to_date=${filter.to_date}`)
    }

    const setValue = e => {
      const { name, value } = e.target
      setFilter(current => ({...current, [name]:value}))
    }

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)
    const changePageSize = (evt) => setPageSize(evt.target.value)

    const changeFilter = (evt) => {
      evt.preventDefault()
      setTypeFilter(evt.target.value)
    }

    let userCreateLimitRule = (<></>)
    if (user.is_superuser === true )
    {
      userCreateLimitRule = (
        <>
          <Link style={{ textDecoration: 'none' }} to={`/limit_rule/`}><Button style={{ color: '#F1C338' }}><strong>New Limit Rule</strong></Button></Link>
        </>)
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
              <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={typeFilter} onChange={changeFilter}>
                <MenuItem value="spending_limit">Spending limit</MenuItem>
                <MenuItem value="income_limit">Income limit</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
            {typeFilter === 'spending_limit'?
              <>
                <label style={{ color: '#609b56' }}><strong>From: </strong></label>
                <TextField id="outlined-basic" label="From amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="spending_limit_from" value={filter.spending_limit_from} onChange={setValue}/>
                <label style={{ color: '#609b56' }}><strong>To: </strong></label>
                <TextField id="outlined-basic" label="To amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="spending_limit_to" value={filter.spending_limit_to} onChange={setValue}/>
                <Button variant="contained" onClick={filtSpending} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
              </>:
              typeFilter === 'income_limit'?
              <>
                <label style={{ color: '#609b56' }}><strong>From: </strong></label>
                <TextField id="outlined-basic" label="From amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="income_limit_from" value={filter.income_limit_from} onChange={setValue}/>
                <label style={{ color: '#609b56' }}><strong>To: </strong></label>
                <TextField id="outlined-basic" label="To amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="income_limit_to" value={filter.income_limit_to} onChange={setValue}/>
                <Button variant="contained" onClick={filtIncome} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
              </>:
              typeFilter === 'date'?
              <>
                <label style={{ color: '#609b56' }}><strong>From: </strong></label>
                <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="from_date" value={filter.from_date} onChange={setValue}/>
                <label style={{ color: '#609b56' }}><strong>To: </strong></label>
                <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="to_date" value={filter.to_date} onChange={setValue}/>
                <Button variant="contained" onClick={filtDate} style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
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
            {userCreateLimitRule}
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
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>LIMIT RULE LIST</h1>
        </div>
        {limitRulLogin}
      </>
    )
}

export default LimitRules