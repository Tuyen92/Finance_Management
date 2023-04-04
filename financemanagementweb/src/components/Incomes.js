import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"

const Incomes = () => {
    const[income, setIncome] = useState([])

    useEffect(() => {
        const loadIncomes = async () => {
            let res = await API.get(endpoints['incomes'])
            setIncome(res.data.results)
        }

        loadIncomes()
    }, [])

    return (
        <>
            <ul>{income.map(i => <li key={i.id}>{i.content}</li>)}</ul>
        </>
    )
}

export default Incomes
