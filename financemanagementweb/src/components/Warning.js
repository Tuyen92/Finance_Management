import { useContext, useState } from "react"
import { UseContext } from "../configs/UseContext"
import { Container } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from 'react-router-dom'


const Warning = () => {
    const[user, dispatch] = useContext(UseContext)
    const[typeFilter, setTypeFilter] = useState(null)
    console.log(user)
    const changeFilter = (evt) => {
        evt.preventDefault()
        setTypeFilter(evt.target.value)
    }

    const filtMonth = (evt) => {
        evt.preventDefault()
    }
    
    const filtQuarter = (evt) => {
        evt.preventDefault()
    }

    const filtGroup = (evt) => {
        evt.preventDefault()
    }

    let warningLogin = (
    <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
    </>)
    if (user != null)
    {
        warningLogin = (
            <>
                <div align="left">
                    <FormControl sx={{ minWidth: 130 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Following</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" label="Following" value={typeFilter} onChange={changeFilter}>
                            <MenuItem value="month">Month</MenuItem>
                            <MenuItem value="quarter">Quarter</MenuItem>
                            <MenuItem value="group">Group</MenuItem>
                        </Select>
                    </FormControl>
                    {typeFilter === 'month'?
                    <>
                        <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Month</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small">
                            <MenuItem value="1">January</MenuItem>
                            <MenuItem value="2">February</MenuItem>
                            <MenuItem value="3">March</MenuItem>
                            <MenuItem value="4">April</MenuItem>
                            <MenuItem value="5">May</MenuItem>
                            <MenuItem value="6">June</MenuItem>
                            <MenuItem value="7">July</MenuItem>
                            <MenuItem value="8">August</MenuItem>
                            <MenuItem value="9">September</MenuItem>
                            <MenuItem value="10">October</MenuItem>
                            <MenuItem value="11">November</MenuItem>
                            <MenuItem value="12">December</MenuItem>
                        </Select>
                        </FormControl>
                        <Button variant="contained" onClick={filtMonth} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
                    </>:
                    typeFilter === 'quarter'?
                    <>
                        <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Quarter</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small">
                            <MenuItem value="1">First</MenuItem>
                            <MenuItem value="2">Second</MenuItem>
                            <MenuItem value="3">Third</MenuItem>
                            <MenuItem value="4">Fourth</MenuItem>
                        </Select>
                        </FormControl>
                        <Button variant="contained" onClick={filtQuarter} style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
                    </>:
                    typeFilter === 'group'?
                    <>
                        <label style={{ color: '#609b56' }}><strong>Group ID: </strong></label>
                        <TextField id="outlined-basic" type="text" variant="outlined" size="small" style={{ marginRight: '1%' }} />
                        <Button variant="contained" onClick={filtGroup} style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button>
                    </>:
                    <span />}
                </div>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: '2%' }}>Personal statistic</h3>
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="outlined-basic" type="text" value={user.id} style={{ width: '10%', marginRight: '2%'}} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Fullname: </h4>
                    <TextField id="outlined-basic" type="text" value={user.last_name + " " + user.first_name} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total income: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            label="Total income"/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total spending: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total spending</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            label="Total spending"/>
                    </FormControl>
                </div>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: '2%' }}>User's project</h3>
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project ID: </h4>
                    <TextField id="outlined-basic" type="text" value={user.id} style={{ width: '10%', marginRight: '2%'}} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project name: </h4>
                    <TextField id="outlined-basic" type="text" value={user.last_name + " " + user.first_name}/>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total income in project: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total project's income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            label="Total project's income"/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total spending in project: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total project's spending</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            label="Total project's spending"/>
                    </FormControl>
                </div>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: '2%' }}>Warning</h3>
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Alert </h4>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', color: '#F1C338' }}>WARNING</h1>
            {warningLogin}
        </>
    )
}

export default Warning
