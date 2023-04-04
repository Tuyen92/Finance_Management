import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"

const GroupsUser = () => {
    const[group, setGroup] = useState()
    
    useEffect(() => {
        const loadGroups = async () => {
            let res = await API.get(endpoints['groups'])
            setGroup(res.data.results)
        }
        
        loadGroups()
    }, [])

    return (
        <>
            <ul>{group.map(g => <li key={g.id}>{g.name}</li>)}</ul>
        </>
    )
}

export default GroupsUser