import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"

const Meetings = () => {
    const[meeting, setMeeting] = useState([])

    useEffect(() => {
        const loadMeetings = async () => {
            let res = await API.get(endpoints['meetings'])
            setMeeting(res.data.results)
        }

        loadMeetings()
    }, [])

    return (
        <>
            <ul>{meeting.map(m => <li key={m.id}>{m.content}</li>)}</ul>
        </>
    )
}

export default Meetings
