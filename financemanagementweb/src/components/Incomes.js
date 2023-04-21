import { useContext, useEffect, useState } from "react"
import API, { authAPI, endpoints } from "../configs/API"
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

  useEffect(() => {
      const loadIncomes = async () => {
        let e = `${endpoints['incomes']}?`
          
        let content = c.get("content")
        if (content !== null)
          e += `&content=${content}`

        let res =  await authAPI().get(e)
        console.log(res.data.results)
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

  const nextPage = () => setPage(current => current + 1)
  const prevPage = () => setPage(current => current - 1)
  const changePageSize = (evt) => setPageSize(evt.target.value)

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
            <Select labelId="demo-select-small" id="demo-select-small" label="Filter">
              <MenuItem value="" />
              <MenuItem value="">Group</MenuItem>
              <MenuItem value="">User</MenuItem>
              <MenuItem value="">Date</MenuItem>
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
        <div style={{ display: "flex" }}>
          <Select labelId="demo-select-small" size="small" id="demo-simple-select" style={{ marginRight: '1%' }} value={pageSize} onChange={changePageSize}>
            <MenuItem value="2" >2</MenuItem>
            <MenuItem value="3" >3</MenuItem>
            <MenuItem value="5" >5</MenuItem>
          </Select>
          <h5 style={{ marginRight: '1%' }}>Page {page}</h5>
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
