import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"

const LimitRules = () => {
    const[limitRule, setLimitRule] = useState([])

    useEffect(() => {
        const loadLimitRules = async () => {
            let res = await API.get(endpoints['limit_rules'])
            setLimitRule(res.data.results)
        }

        loadLimitRules()
    }, [])

    return (
        <>
            <ul>{limitRule.map(l => <li key={l.id}>{l.type}</li>)}</ul>
        </>
    )
}

export default LimitRules