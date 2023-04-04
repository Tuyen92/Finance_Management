import { useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../configs/API"

const Spendings = () => {
    const[spending, setSpending] = useState([])

    useEffect(() => {
        const loadSpendings = async () => {
            let res =  await API.get(endpoints['spendings'])
            setSpending(res.data.results)
        }

        loadSpendings()
    }, [])

    return (
        <>
            <ul>{spending.map(s => <li key={s.id}>{s.content}</li>)}</ul>
        </>
    )
}

export default Spendings
