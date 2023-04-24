import { useContext, useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
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
import { format } from 'date-fns';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";
import { UseContext } from "../configs/UseContext";


const Incomes = () => {
  const[income, setIncome] = useState([])
  const[kw, setKeyWord] = useState("")
  const[s, setSort] = useState("")
  const nav = useNavigate()
  const[c] = useSearchParams()
  const[user, dispatch] = useContext(UseContext)
  const[page, setPage] = useState(1)
  const[pageSize, setPageSize] = useState(2)
  const[next, setNext] = useState(null)
  const[previous, setPrevious] = useState(null)
  const[typeFilter, setTypeFilter] = useState(null)
  const[filter, setFilter] = useState({
    "amount_from": "",
    "amount_to": "",
    "is_confirm": "",
    "date_from": "",
    "date_to": ""
  })

  useEffect(() => {
      const loadIncomes = async () => {
        let e = `${endpoints['incomes']}?`
          
        let content = c.get("content")
        if (content !== null)
          e += `&content=${content}`

        let amount_from = c.get("amount_from")
        if (amount_from !== null)
          e += `&amount_from=${filter.amount_from}`

        let amount_to = c.get("amount_to")
        if (amount_to !== null)
          e += `&amount_to=${filter.amount_to}`

        let is_confirm = c.get("is_confirm")
        if (is_confirm !== null)
          e += `&confirm=${filter.is_confirm}`

        let date_from = c.get("date_from")
        if (date_from != null)
          e += `&date_from=${filter.date_from}`

        let date_to = c.get("date_to")
        if (date_to != null)
          e += `&date_to=${filter.date_to}`

        let res =  await authAPI().get(e)
        // console.log(res.data.results)
        setNext(res.data.next)
        setPrevious(res.data.previous)
        setIncome(res.data.results)
      }

      loadIncomes()
  }, [c, page, pageSize])

  const search = (evt) => {
    evt.preventDefault()
    nav(`/incomes/?content=${kw}`)
  }

  const filtAmount = (evt) => {
    evt.preventDefault()
    nav(`/incomes/?amount_from=${filter.amount_from}&amount_to=${filter.amount_to}`)
  }

  const filtConfirm = (evt) => {
    evt.preventDefault()
    nav(`/incomes/?confirm=${filter.is_confirm}`)
  }

  const filtDate = (evt) => {
    evt.preventDefault()
    nav(`/incomes/?date_from=${filter.date_from}&date_to=${filter.date_to}`)
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

  let incomeLogin = (
    <>
      <div align="center">
        <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
      </div>
    </>
  )
  if (user !== null)
  {
    incomeLogin = (
      <>
        <div align="left">
        <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={typeFilter} onChange={changeFilter}>
              <MenuItem value="spending_amount">Spending amount</MenuItem>
              <MenuItem value="is_accept">Accepted</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
          {typeFilter === 'spending_amount'?
          <>
              <TextField id="outlined-basic" label="From amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="amount_from" value={filter.amount_from} onChange={setValue}/>
              <TextField id="outlined-basic" label="To amount" type="number" variant="outlined" size="small" style={{ marginRight: '1%'}} name="amount_to" value={filter.amount_to} onChange={setValue}/>
              <Button variant="contained" onClick={filtAmount} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === 'is_accept'?
          <>
            <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
              <InputLabel id="demo-select-small">Accept</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small" name="is_confirm" value={filter.is_confirm} onChange={setValue}>
                <MenuItem value="1">Confirm</MenuItem>
                <MenuItem value="0">Not Confirm</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={filtConfirm} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
          </>:
          typeFilter === 'date'?
          <>
            <label style={{ color: '#609b56' }}><strong>From: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_from" value={filter.date_from} onChange={setValue}/>
            <label style={{ color: '#609b56' }}><strong>To: </strong></label>
            <TextField id="outlined-basic" type="date" variant="outlined" size="small" style={{ marginRight: '1%' }} name="date_to" value={filter.date_to} onChange={setValue}/>
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
                <TableCell component="th" scope="row"><strong>Content</strong></TableCell>
                <TableCell align="right"><strong>Income&nbsp;amount</strong></TableCell>
                <TableCell align="right"><strong>Implementation&nbsp;date</strong></TableCell>
                <TableCell align="right"><strong>User ID</strong></TableCell>
                <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {income.map(i => {
                let url = `/incomes/${i.id}/`
                return (
                <TableRow key={i.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell component="th" scope="row">{i.id}</TableCell>
                  <TableCell component="th" scope="row">{i.content}</TableCell>
                  <TableCell align="right">{Numeral(i.income_amount).format('0,0')}</TableCell>
                  <TableCell align="right">{format(new Date(i.implementation_date), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell align="right">{i.user?.id}</TableCell>
                  <TableCell component="th" scope="row"><Link style={{ textDecoration: 'none' }} to={url}><Button style={{ color: '#F46841' }}><strong>Detail</strong></Button></Link></TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <div align="right">
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
            <InputLabel id="demo-select-small">Sort</InputLabel>
            <Select labelId="demo-select-small" id="demo-select-small" label="Filter" value={s} onChange={e => {
              setSort(e.target.value)
              e.preventDefault()
              nav(`/incomes/?sort=${e.target.value}`)}
            }>
              <MenuItem value="1">Increase</MenuItem>
              <MenuItem value="0">Decrease</MenuItem>
            </Select>
          </FormControl>
          <Link style={{ textDecoration: 'none' }} to={`/income/`}><Button style={{ color: '#F1C338' }}><strong>New income</strong></Button></Link>
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
      </>
    )
  }

  return (
      <>
        <div>
          <h1 style={{ textAlign: 'center', color: '#F1C338' }}>INCOME LIST</h1>
        </div>
        {incomeLogin}
      </>
  )
}

export default Incomes
