import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { useParams, Link } from "react-router-dom"
import { Container, Input } from "@mui/material"
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const MeetingDetail = () => {
    const[meeting, setMeeting] = useState([])
    const {meetingId} = useParams()

    useEffect(() => {
        const loadMeeting = async () => {
            let res = await API.get(endpoints['meeting'](meetingId))
            res.data.date_time = format(new Date(res.data.date_time), 'dd/MM/yyyy HH:mm:ss')
            // console.log(res.data)
            setMeeting(res.data)
        }

        loadMeeting()
    }, [meetingId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>MEETING&nbsp;SCHEDULE&nbsp;{meeting.id}. {meeting.content}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Meeting schedule: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={meeting.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <Input id="content" type="text" value={meeting.content} style={{ width: '100%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Description: </h4>
                <Input id="id" type="text" value={meeting.description} style={{ width: '100%', marginRight: '2%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Date&nbsp;time: </h4>
                    <Input id="content" type="text" value={meeting.date_time} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Vote: </h4>
                    <Input id="id" type="text" value={meeting.vote} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Status: </h4>
                    <span></span>
                    {meeting.is_active === true?
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                    }
                </div>
            </Container>

            <div>
                <h3 style={{ color: "#FFECC9", marginLeft: "10px"  }} />
            </div>
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Delete</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>End meeting</strong></Button></Link>
            </div>
        </>
    )
}

export default MeetingDetail
