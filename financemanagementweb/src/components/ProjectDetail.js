import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import { Container, Input } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import Numeral from 'numeral';
import { format } from 'date-fns';
import Button from '@mui/material/Button';


const ProjectDetail = () => {
    const[project, setProject] = useState([])
    const {projectId} = useParams()

    useEffect(() => {
        const loadProject = async () => {
            let res = await API.get(endpoints['project'](projectId))
            let target = Numeral(res.data.target).format('0,0');
            let spending = Numeral(res.data.spending_amount).format('0,0');
            let income = Numeral(res.data.income_amount).format('0,0');
            let start_date = format(new Date(res.data.start_date), 'dd/MM/yyyy HH:mm:ss');
            let end_date = format(new Date(res.data.end_date), 'dd/MM/yyyy HH:mm:ss');
            res.data.target = target
            res.data.spending_amount = spending
            res.data.income_amount = income
            res.data.start_date = start_date
            res.data.end_date = end_date
            // console.log(res.data)
            setProject(res.data)
        }

        loadProject()
    }, [projectId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>PROJECT&nbsp;{project.id}. {project.name_project}</h1>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={project.id} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="name_project" type="text" value={project.name_project} style={{ width: '100%' }} />
                </div>
                <br />
                <h4 style={{ color: "#F1C338" }}>Describe: </h4>
                <Input id="describe" type="text" value={project.describe} multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                <Input id="target" value={project.target}
                    startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                    <Input id="income" value={project.income_amount}
                        startAdornment={<InputAdornment position="start">VND</InputAdornment>} style={{ width: '50%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                    <Input id="spending" value={project.income_amount}
                        startAdornment={<InputAdornment position="start">VND</InputAdornment>} style={{ width: '50%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                    <Input id="start_date" type="text" value={project.start_date} style={{ marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                    <Input id="end_date" type="text" value={project.end_date} />
                </div>
            </Container>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} />
            </div>
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Delete</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Update</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>End Project</strong></Button></Link>
            </div>
        </>
    )
}

export default ProjectDetail
