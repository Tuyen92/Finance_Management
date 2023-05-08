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
import Loading from "../layouts/Loading";
import Alert from '@mui/material/Alert';


const ProjectDetail = () => {
    const[user, dispatch] = useContext(UseContext)
    const[project, setProject] = useState("")
    const[updatedProject, setUpdateProject] = useState({
        "name_project": "",
        "describe": "",
        "target": "",
        "start_date": "",
        "end_date": ""
    })
    const {projectId} = useParams()
    const[ended, setEnded] = useState("")
    const[err, setErr] = useState(null)

    useEffect(() => {
        const loadProject = async () => {
            let e = `${endpoints['project'](projectId)}`
            let res = await authAPI().get(e)
            res.data.target = Numeral(res.data.target).format('0,0')
            res.data.spending_amount = Numeral(res.data.spending_amount).format('0,0')
            res.data.income_amount = Numeral(res.data.income_amount).format('0,0')
            res.data.start_date = format(new Date(res.data.start_date), 'dd/MM/yyyy')
            res.data.end_date = format(new Date(res.data.end_date), 'dd/MM/yyyy')
            // console.log(res.data)
            if (res.status == 200)
                setProject(res.data)
            else
                setErr(res.status)
        }

        loadProject()
    }, [projectId, ended, err])

    const endedProject = async () => {
        let eEnded = `${endpoints['project'](projectId)}ended/`
        let resEnded = await authAPI().put(eEnded)
        setEnded(1)
    }

    const updateProject = async () => {
        let form = new FormData()
        form.append("name_project", updatedProject.name_project)
        form.append("describe", updatedProject.describe)
        form.append("target", updatedProject.target)
        form.append("start_date", updatedProject.start_date)
        form.append("end_date", updatedProject.end_date)
        let update = `${endpoints['project'](projectId)}edit/`
        let resUpdate = await authAPI().put(update, form)
    }

    const setValue = e => {
        const { name, value } = e.target
        setUpdateProject(current => ({...current, [name]:value}))
    }

    let alert = (<></>)
    if (err !== null)
    {
        alert = (
            <>
                <div align='center'>
                    <Alert severity="error">Happend an error: {err} — check it out!</Alert>
                </div>
                <br />
            </>)
    }

    if (project == null)
    {return(
    <>
        <h1 style={{ textAlign: "center", color: "#F1C338" }}>PROJECT</h1>
        <Loading />
        <br />
        {alert}
    </>)}

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>PROJECT&nbsp;{project.id}. {project.name_project}</h1>
            {alert}
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project's information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={project.id} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <TextField id="name_project" type="text" name="name_project" value={project.name_project} style={{ width: '100%' }} />
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
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />:
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />
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
            {user.is_supperuser === true || user.is_staff === true?
            <>
                <div style={{ backgroundColor: '#609b56'}}>
                    <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} >Update project</h3> 
                </div>
                <br />
                <Container>
                    <form onSubmit={updateProject}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                            <TextField id="name_project" label="New name of project..." type="text" name="name_project" value={updatedProject.name_project} style={{ width: '100%' }} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="describe" type="text" label="New description of project..." name="describe" value={updatedProject.describe} multiline fullWidth rows={4} style={{ width: '100%' }} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                            <TextField id="start_date" type="date" name="start_date" value={updatedProject.start_date} style={{ marginRight: '20%' }} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                            <TextField id="end_date" type="date" name="end_date" value={updatedProject.end_date} onChange={setValue}/>
                        </div>
                        <br />
                        <div  align="center">
                            <Button variant="outline-primary" type='submit' style={{ backgroundColor: '#609b56', color: '#FFECC9' }}><strong>Update</strong></Button>
                        </div>
                    </form>
                </Container>
            </>:
            <span />}
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} />
            </div>
            <div align="right">
                {user.is_supperuser === true || user.is_staff === true?
                <>
                    <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F46841', marginRight: '2%' }}><strong>Delete</strong></Button></Link>
                    {project.is_ended === true?
                    <Button style={{ color: '#F46841', marginRight: '2%' }} onClick={endedProject}><strong>Active Project</strong></Button>:
                    <Button style={{ color: '#F46841', marginRight: '2%' }} onClick={endedProject}><strong>End Project</strong></Button>}
                </>:
                <span />}
                <Link style={{ textDecoration: 'none' }} to={`/statistic/project/${projectId}`}><Button style={{ color: '#F46841', marginRight: '2%' }}><strong>Statistic</strong></Button></Link>
            </div>
        </>
    )
}

export default ProjectDetail
