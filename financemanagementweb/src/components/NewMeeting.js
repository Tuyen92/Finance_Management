import { Container, FormGroup, Input, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { UseContext } from "../configs/UseContext"
import { useNavigate } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import Button from '@mui/material/Button';

const NewMeeting = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[meeting, setMeeting] = useState({
        "content": "",
        "description": "",
        "date": "",
        "time": "",
        "group": ""
    })

    const create = (evt) => {
        evt.PreventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("content", meeting.content)
                form.append("datetime", meeting.datetime)
                form.append("description", meeting.description)
                form.append("group", meeting.group)

                let res = await authAPI().get(endpoints['new_meeting'], form)
                if (res.status === 201)
                    nav("/meetings/")
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

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW MEETING SCHEDULE</h1>
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                            <TextField id="content" type="text" style={{ width: '100%', marginRight: '2%' }} name="content" value={meeting.content} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} name="description" value={meeting.description} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Date: </h4>
                            <TextField id="id" type="date" rows={4} style={{ marginRight: '2%' }} name="date" value={meeting.date} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Time: </h4>
                            <TextField id="id" type="time" rows={4} style={{ marginRight: '2%' }} name="time" value={meeting.time} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                            <TextField id="id" type="text" rows={4} style={{ width: '20%' }} name="group" value={meeting.group} onChange={setValue}/>
                        </div>
                        <br />
                        <div align='center'>
                            <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}>Create</Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
        </>
    )
}

export default NewMeeting