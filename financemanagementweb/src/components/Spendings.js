import { useContext, useEffect } from "react"
import { useState } from "react"
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


const Spendings = () => {
    const[spending, setSpending] = useState([])
    const[kw, setKeyWord] = useState("")
    const[s, setSort] = useState("")
    const nav = useNavigate()
    const[c] = useSearchParams()
    const[user, dispatch] = useContext(UseContext)
    const[page, setPage] = useState(1)
    const[pageSize, setPageSize] = useState(2)
    const[total, setTotal] = useState(0)
    const[next, setNext] = useState(null)
    const[previous, setPrevious] = useState(null)
    const[typeFilter, setTypeFilter] = useState(null)
    const[filter, setFilter] = useState({
      "amount_from": "",
      "amount_to": "",
      "is_accept": "",
      "date_from": "",
      "date_to": ""
    })

    useEffect(() => {
        const loadSpendings = async () => {
          let e = `${endpoints['spendings']}?page_size=${pageSize}&page=${page}`
            
          let content = c.get("content")
          if (content !== null)
            e += `&content=${content}`

          let sort = c.get("sort")
          if (sort !== null)
            e += `&sort=${s}`

          let amount_from = c.get("amount_from")
          if (amount_from !== null)
            e += `&amount_from=${filter.amount_from}`

          let amount_to = c.get("amount_to")
          if (amount_to !== null)
            e += `&amount_to=${filter.amount_to}`

          let is_accept = c.get("is_accept")
          if (is_accept !== null)
            e += `&is_accept=${filter.is_accept}`

          let date_from = c.get("date_from")
          if (date_from != null)
            e += `&date_from=${filter.date_from}`
  
          let date_to = c.get("date_to")
          if (date_to != null)
            e += `&date_to=${filter.date_to}`

          // console.log(user)
          let res =  await authAPI().get(e)
          setTotal(res.data.count)
          setNext(res.data.next)
          setPrevious(res.data.previous)
          setSpending(res.data.results)
          // console.log(user)
          // console.log(res)
        }

        loadSpendings()
    }, [c, page, pageSize])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    const filtAmount = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?amount_from=${filter.amount_from}&amount_to=${filter.amount_to}`)
    }

    const filtAccept = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?accept=${filter.is_accept}`)
    }

    const filtDate = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?date_from=${filter.date_from}&date_to=${filter.date_to}`)
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

    let spendingLogin = (
      <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
      </>
    )
    if (user !== null)
    {
      spendingLogin = (
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
              <Select labelId="demo-select-small" id="demo-select-small" name="is_accept" value={filter.is_accept} onChange={setValue}>
                <MenuItem value="1">Accepted</MenuItem>
                <MenuItem value="0">Not Accepted</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={filtAccept} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
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

          <TextField id="outlined-basic" label="Search" variant="outlined" size="small" value={kw} onChange={e => setKeyWord(e.target.value)} style={{ marginRight: '1%'}}/>
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
                <TableCell align="right"><strong>Spending&nbsp;amount</strong></TableCell>
                <TableCell align="right"><strong>Implementation&nbsp;date</strong></TableCell>
                <TableCell align="right"><strong>User ID</strong></TableCell>
                <TableCell component="th" scope="row"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spending.map(s => {
                let url = `/spendings/${s.id}/`
                return (
                <TableRow key={s.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell component="th" scope="row">{s.id}</TableCell>
                  <TableCell component="th" scope="row">{s.content}</TableCell>
                  <TableCell align="right" typeof="number">{Numeral(s.spending_amount).format('0,0')}</TableCell>
                  <TableCell align="right">{format(new Date(s.implementation_date), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell align="right">{s.user?.id}</TableCell>
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
              nav(`/spendings/?sort=${e.target.value}`)}
            }>
              <MenuItem value="1">Increase</MenuItem>
              <MenuItem value="0">Decrease</MenuItem>
            </Select>
          </FormControl>
          <Link style={{ textDecoration: 'none' }} to={`/spending/`}><Button style={{ color: '#F1C338' }}><strong>New spending</strong></Button></Link>
        </div>

        <div style={{ display: "flex", height: "30px" }} >
          <Select labelId="demo-select-small" size="small" id="demo-simple-select" style={{ marginRight: '1%' }} value={pageSize} onChange={changePageSize}>
            <MenuItem value="2" >2</MenuItem>
            <MenuItem value="3" >3</MenuItem>
            <MenuItem value="5" >5</MenuItem>
          </Select>
          <h5 style={{ marginRight: '1%', marginTop: '0.5%' }}>Page {page}</h5>
          {previous !== null?
            <Button onClick={prevPage} size="small" variant="outline-primary" style={{ backgroundColor: '#609b56', marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_left</i></Button>:
            <span/>
          }
          {next !== null?
          <Button onClick={nextPage} size="small" variant="outline-primary" style={{ backgroundColor: '#609b56' }}><i className="material-icons" style={{ color: '#FFECC9' }}>chevron_right</i></Button>:
          <span/>
          }
        </div>
      </>)
    }
    
    return (
        <>
          <div>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>SPENDING LIST</h1>
          </div>
          {spendingLogin}
        </>
    )
}

export default Spendings
