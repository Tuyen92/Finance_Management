import { Container, FormGroup, Input, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UseContext } from "../configs/UseContext"
import { useNavigate } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';


const NewMeeting = () => {
    const[user, dispatch] = useContext(UseContext)
    const[schedule, setSchedule] = useState([])
    const nav = useNavigate()
    const[meeting, setMeeting] = useState({
        "content": "",
        "description": "",
        "group": ""
    })
    const[date, setDate] = useState([])
    const[time, setTime] = useState([])
    const d = []
    const t = []
    const[err, setErr] = useState(null)

    useEffect(() => {}, [schedule, err])

    const create = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = ""
                console.log(d)
                console.log(t)
                for (let i = 0; i < schedule.length; i++)
                {
                    let form = new FormData()
                    form.append("content", meeting.content)
                    form.append("date_time", d[i] + " " + t[i])
                    form.append("description", meeting.description)
                    form.append("group", meeting.group)

                    res = await authAPI().post(endpoints['new_meeting'], form)
                }
                
                if (res.status === 201)
                    nav("/meeting_schedules/")
                else
                    setErr(res.status)

            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value} = e.target
        setMeeting(current => ({...current, [name]:value}))
    }
    let numSchedule = []
    const setValueSchedule = (evt) => {
        evt.preventDefault()
        let num = []
        for (let i = 1; i <= evt.target.value; i++)
        {
            console.log(i)
            num.push(i)
            setSchedule(num)
        }
        // console.log("===")
        // console.log(schedule)
    }
    
    const setDateArray = (evt) => {
        d.push(evt.target.value)
    }

    const setTimeArray = (evt) => {
        t.push(evt.target.value)
    }

    {
        schedule.map(s => {
            numSchedule.push(
                <>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <h3 style={{ color: "#F1C338", marginRight: '3%' }}>{s}.</h3>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Date: </h4>
                        <TextField id="id" type="date" style={{ marginRight: '2%' }} onChange={setDateArray}/>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Time: </h4>
                        <TextField id="id" type="time" style={{ marginRight: '2%' }} onChange={setTimeArray}/>
                    </div>
                </>
            )
        })
    }

    let alert = (<></>)
    if (err !== null)
    {
        alert = (
        <>
        <div align='center'>
            <Alert severity="error">Happend an error: {err} — check it out!</Alert>
        </div>
        <br />
        </>)
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW MEETING SCHEDULE</h1>
            {alert}
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                            <TextField id="content" type="text" style={{ width: '100%', marginRight: '2%' }} label="Content of meeting..." name="content" value={meeting.content} onChange={setValue}/>
                        
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                                <TextField id="id" type="text" rows={4} style={{ width: '20%' }} name="group" value={meeting.group} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} label="Description of meeting" name="description" value={meeting.description} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", width: '15%' }}>Number of schedule: </h4>
                            <FormControl style={{ width: '30%'}}>
                                <InputLabel id="demo-simple-select-label">Number </InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number" name="schedule" onChange={setValueSchedule} value={schedule.length}>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {numSchedule}
                        <br />
                        <div align='center'>
                            <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}><strong>Create</strong></Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
        </>
    )
}

export default NewMeeting