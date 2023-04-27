import { useEffect, useState } from "react"
import API, { authAPI, endpoints } from "../configs/API"
import { useParams, Link } from "react-router-dom"
import { Container, Input, TextField } from "@mui/material"
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { id } from "date-fns/locale";

const MeetingDetail = () => {
    const[meeting, setMeeting] = useState("")
    const {meetingId} = useParams()
    const[voted, setVote] = useState([])
    const[changeVote, setChangeVote] = useState(0)
    const[showVoteButton, setShowVoteButton] = useState(0)

    useEffect(() => {
        const loadMeeting = async () => {
            let res = await authAPI().get(endpoints['meeting'](meetingId))
            res.data.date_time = format(new Date(res.data.date_time), 'dd/MM/yyyy HH:mm:ss')
            let resVote = await authAPI().get(endpoints['vote'])
            // console.log(res.data)
            console.log(resVote.data.results)
            setMeeting(res.data)
            setVote(resVote.data.results)

            if (voted.length === 0)
            {
                setShowVoteButton(1)
            }
            for (let i = 0; i < voted.length; i++) {
                if (voted[i].meeting_schedule?.id !== meeting.id)
                {
                    setShowVoteButton(1)
                    break;
                }
                else
                {
                    setShowVoteButton(0)
                }
            }
            console.log(showVoteButton)
        }

        loadMeeting()
    }, [meetingId, changeVote, showVoteButton])

    const vote = async (evt) => {
        evt.preventDefault()
        let eVote = `${endpoints['meeting'](meetingId)}/vote/`
        let resVote = await authAPI().put(eVote)
        setChangeVote(1)
        setShowVoteButton(0)
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>MEETING&nbsp;SCHEDULE&nbsp;{meeting.id}. {meeting.content}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Meeting schedule: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={meeting.id} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <TextField id="content" type="text" value={meeting.content} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Description: </h4>
                    <TextField id="id" type="text" value={meeting.description} fullWidth multiline rows={4} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Date&nbsp;time: </h4>
                    <TextField id="content" type="text" value={meeting.date_time} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Vote: </h4>
                    <TextField id="id" type="text" value={meeting.vote} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Status: </h4>
                    <span></span>
                    {meeting.is_active === true?
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                    }
                </div>
                <br />
                <div align="center">
                    {showVoteButton === 1?
                        <Button onClick={vote} style={{ backgroundColor: "#609b56", color: '#FFECC9' }}><strong>Vote</strong></Button>:
                        <span />
                    }
                </div>
            </Container>
            <br />
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F46841' }}><strong>Delete</strong></Button></Link>
                <Button style={{ color: '#F46841' }}><strong>End meeting</strong></Button>
            </div>
        </>
    )
}

export default MeetingDetail
