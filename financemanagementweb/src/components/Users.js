import { useState } from "react"
import { useEffect } from "react"
import API, { endpoints } from "../configs/API"

const Users = () => {
    const[user, setUser] = useState([])

    useEffect(() => {
        const loadUsers = async () => {
            let res = await API.get(endpoints['user'])
            setUser(res.data.results)
        }

        loadUsers()
    }, [])

    return (
        <>
            <ul>{user.map(u => <li key={u.id}>{u.name}</li>)}</ul>
        </>
    )
}

export default Users