import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import { Container, Input, TextField } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import Numeral from 'numeral';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { UseContext } from "../configs/UseContext";


const ProjectDetail = () => {
    const[user, dispatch] = useContext(UseContext)
    const[project, setProject] = useState([])
    const {projectId} = useParams()
    const[ended, setEnded] = useState("")

    useEffect(() => {
        const loadProject = async () => {
            let e = `${endpoints['project'](projectId)}`
            let res = await authAPI().get(e)
            res.data.target = Numeral(res.data.target).format('0,0')
            res.data.spending_amount = Numeral(res.data.spending_amount).format('0,0')
            res.data.income_amount = Numeral(res.data.income_amount).format('0,0')
            res.data.start_date = format(new Date(res.data.start_date), 'dd/MM/yyyy HH:mm:ss')
            res.data.end_date = format(new Date(res.data.end_date), 'dd/MM/yyyy HH:mm:ss')

            if (ended !== null)
            {
                let eEnded = `${endpoints['project'](projectId)}ended/`
                let resEnded = await authAPI().put(eEnded)
            }
            // console.log(res.data)
            setProject(res.data)
        }

        loadProject()
    }, [projectId, ended])

    const endedProject = async () => {
        let eEnded = `${endpoints['project'](projectId)}/ended/`
        let resEnded = await authAPI().put(eEnded)
        setEnded(1)
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>PROJECT&nbsp;{project.id}. {project.name_project}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={project.id} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <TextField id="name_project" type="text" value={project.name_project} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                    <TextField id="describe" type="text" value={project.describe} multiline fullWidth rows={4} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Target</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={project.target} label="Target" style={{ marginRight: '2%'}}/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Working: </h4>
                    <span></span>
                    {project.is_ended === true?
                        <>
                            <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                        </>:
                        <>
                            <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />
                            {/* {user.is_supperuser === true || user.is_staff === true?
                            <Button variant="contained" onClick={accept} style={{ backgroundColor: "#609b56", color: '#FFECC9', height: '10%', marginTop: '1%' }}>Accept</Button>:
                            <span />} */}
                        </>
                    }
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            style={{ marginRight: '2%' }} value={project.income_amount} label="Income"/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Spending</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={project.spending_amount} label="Spending"/>
                    </FormControl>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                    <TextField id="start_date" type="text" value={project.start_date} style={{ marginRight: '20%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                    <TextField id="end_date" type="text" value={project.end_date} />
                </div>
            </Container>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} />
            </div>
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <div align="right">
            {user.is_supperuser === true || user.is_staff === true?
            <>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Delete</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Update</strong></Button></Link>
                <Button style={{ color: '#F1C338' }} onClick={endedProject}><strong>End Project</strong></Button>
            </>:
            <></>}
            </div>
        </>
    )
}

export default ProjectDetail
