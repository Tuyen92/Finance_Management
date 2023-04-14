import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"
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
import { format } from 'date-fns';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from "react-router-dom/dist";


const Spendings = () => {
    const[spending, setSpending] = useState([])
    const[kw, setKeyWord] = useState("")
    const nav = useNavigate()
    const [c] = useSearchParams()

    useEffect(() => {
        const loadSpendings = async () => {
          let e = `${endpoints['spendings']}?`
            
          let content = c.get("content")
          if (content !== null)
            e += `content=${content}`

          let res =  await API.get(e)
          setSpending(res.data.results)
        }

        loadSpendings()
    }, [c])

    const search = (evt) => {
      evt.preventDefault()
      nav(`/spendings/?content=${kw}`)
    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', color: '#F1C338' }}>SPENDING LIST</h1>
            </div>
            <div align="right">
              <TextField id="outlined-basic" label="Search" variant="outlined" value={kw} onChange={e => setKeyWord(e.target.value)} style={{ marginRight: '1%' }}/>
              <Button onClick={search} variant="contained" style={{  backgroundColor: "#609b56", marginTop: "0.5%" }}><i className="material-icons" style={{ color: '#FFECC9' }}>search</i></Button>
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
          <div align="right" style={{ display: 'flex', marginLeft: '70%'}}>
            <h4 style={{ color: '#F1C338', marginRight: '5%', marginTop: '30px' }}>Sort:</h4>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="demo-simple-select-label">Spending amount</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Spending amount" style={{ marginRight: '5%' }}>
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={10}>Increase</MenuItem>
                        <MenuItem value={20}>Decrease</MenuItem>
                    </Select>
            </FormControl>
            <Link style={{ textDecoration: 'none' }} to={`/spending/`}><Button style={{ color: '#F1C338', width: '100$', marginTop: '18%' }}><strong>New spending</strong></Button></Link>
          </div>
          <div>
            <Pagination count={10} />
          </div>
        </>
    )
}

export default Spendings
