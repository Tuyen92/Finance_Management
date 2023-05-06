import { useContext, useEffect, useState } from "react"
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
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { endpoints } from "../configs/API";
import { authAPI } from "../configs/API";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Loading from "../layouts/Loading";


const Warning = () => {
    const[user, dispatch] = useContext(UseContext)
    const[typeFilter, setTypeFilter] = useState(null)
    const[warning, setWarning] = useState(null)
    const[s] = useSearchParams()
    const[param, setParam] = useState("")
    const nav = useNavigate()
    const {IdUser} = useParams()
    // console.log(user)

    useEffect(() => {
        const loadWarning = async () => {
            let e = `${endpoints['warning'](IdUser)}?`
            
            let month = s.get("month")
            if (month !== null)
              e = `${endpoints['warning'](IdUser)}?month=${param}`

            let quarter = s.get("quarter")
            if (quarter !== null)
                e = `${endpoints['warning'](IdUser)}?quarter=${param}`

            let group = s.get("group")
            if (group !== null)
                e = `${endpoints['warning'](IdUser)}?group=${param}`

            let res = await authAPI().get(e)
            console.log(res)
            setWarning(res.data)
        }
        loadWarning()
    }, [s, IdUser])

    const changeFilter = (evt) => {
        evt.preventDefault()
        setTypeFilter(evt.target.value)
    }

    const filtMonth = (evt) => {
        evt.preventDefault()
        nav(`${endpoints['warning'](IdUser)}?month=${param}`)
    }
    
    const filtQuarter = (evt) => {
        evt.preventDefault()
        nav(`${endpoints['warning'](IdUser)}?quarter=${param}`)
    }

    const filtGroup = (evt) => {
        evt.preventDefault()
        nav(`${endpoints['warning'](IdUser)}?group=${param}`)
    }

    let warningForm = (<></>)
    if (warning !== null)
    {
        warningForm = (
            <>
                <div style={{ backgroundColor: "#609b56" }}>
                    <h3 style={{ color: "#FFECC9", marginLeft: '2%' }}>Warning</h3>
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total income: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={warning.total_income} label="Total income"/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Total spending: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Total spending</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={warning.total_spending} label="Total spending"/>
                    </FormControl>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    {warning.status_spending === "1"?
                    <>
                        <Alert severity="success" style={{ marginRight: '2%'}}>
                            <AlertTitle>REALLY GOOD</AlertTitle>
                            <strong>Your spending is stable!</strong> Well done, just keep going!
                        </Alert>
                    </>:warning.status_spending === "2"?
                    <>
                        <Alert severity="warning" style={{ marginRight: '2%'}}>
                            <AlertTitle>WATCH OUT</AlertTitle>
                            <strong>Your spending is close to over the limit rule</strong> Be carefull, let spend more logicaly!
                        </Alert>
                    </>:
                    <>
                        <Alert severity="error" style={{ marginRight: '2%'}}>
                            <AlertTitle>VERY BAD</AlertTitle>
                            <strong>Your spending is over the limit rule</strong> It seem too much, let's save money right now!
                        </Alert>
                    </>}
                    
                    {warning.status_income === "1"?
                    <>
                        <Alert severity="success">
                            <AlertTitle>REALLY GOOD</AlertTitle>
                            <strong>Your income is high!</strong> Congratulation, that's a high income!
                        </Alert>
                    </>:warning.status_spending === "2"?
                    <>
                        <Alert severity="warning">
                            <AlertTitle>NOT ENOUGHT</AlertTitle>
                            <strong>Your income is good</strong> Good, working harder to get more!
                        </Alert>
                    </>:
                    <>
                        <Alert severity="error">
                            <AlertTitle>VERY BAD</AlertTitle>
                            <strong>Your income is low</strong> Too bad, let get money right now!
                        </Alert>
                    </>}
                </div>
                <br />
            </>
        )
    }

    let warningLogin = (
    <>
        <div align="center">
          <h3 style={{ color: '#F46841' }}>Please <Link style={{ textDecoration: 'none', color: '#F46841' }} to={`/login/`}>Login</Link></h3>
        </div>
    </>)
    if (user != null)
    {
        let eMonth = `${endpoints['warning'](IdUser)}?month=${param}`
        let eQuarter =`${endpoints['warning'](IdUser)}?quarter=${param}`
        let eGroup = `${endpoints['warning'](IdUser)}?group=${param}`
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
                        <Select labelId="demo-select-small" id="demo-select-small" value={param} onChange={e => {setParam(e.target.value)}}>
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
                        <Link to={eMonth} style={{ textDecoration: 'none' }}><Button variant="contained" style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button></Link>
                    </>:
                    typeFilter === 'quarter'?
                    <>
                        <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginRight: '1%'}}>
                        <InputLabel id="demo-select-small">Quarter</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" value={param} onChange={e => {setParam(e.target.value)}}>
                            <MenuItem value="1">First</MenuItem>
                            <MenuItem value="2">Second</MenuItem>
                            <MenuItem value="3">Third</MenuItem>
                            <MenuItem value="4">Fourth</MenuItem>
                        </Select>
                        </FormControl>
                        <Link to={eQuarter} style={{ textDecoration: 'none' }}><Button variant="contained" style={{  backgroundColor: "#609b56", marginRight: '1%' }}><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button></Link>
                    </>:
                    typeFilter === 'group'?
                    <>
                        <label style={{ color: '#609b56' }}><strong>Group ID: </strong></label>
                        <TextField id="outlined-basic" type="text" variant="outlined" size="small" style={{ marginRight: '1%' }} value={param} onChange={e => {setParam(e.target.value)}}/>
                        <Link to={eGroup} style={{ textDecoration: 'none' }}><Button variant="contained" style={{  backgroundColor: "#609b56", marginRight: '1%' }} ><i className="material-icons" style={{ color: '#FFECC9' }}>filter_alt</i></Button></Link>
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
                
                {warningForm}
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
