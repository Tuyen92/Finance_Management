import { useEffect } from "react"
import API, { endpoints } from "../configs/API"
import { useState } from "react"

const Projects = () => {
    const[project, setProject] = useState([])

    useEffect(() => {
        const loadProjects = async () => {
            let res = await API.get(endpoints['projects'])
            console.log(res.data.results)
            setProject(res.data.results)
        }

        loadProjects()
    }, [])

    return (
        <>
            <ul>{project.map(p => <li key={p.id}>{p.name_project}</li>)}</ul>
        </>
    )
}

export default Projects
