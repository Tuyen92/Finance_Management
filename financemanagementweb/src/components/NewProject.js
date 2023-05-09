import Button from '@mui/material/Button';
import { Container, FormGroup, Input, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UseContext } from "../configs/UseContext";
import { useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";
import Alert from '@mui/material/Alert';
import { ElectricScooterSharp } from '@mui/icons-material';


const NewProject = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[project, setProject] = useState({
        "name_project": "",
        "target": "",
        "describe": "",
        "income_amount": "",
        "spending_amount": "",
        "start_date": "",
        "end_date": "",
    })
    const[err, setErr] = useState(null)

    useEffect(() => {}, [err])

    const create = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("name_project", project.name_project)
                form.append("target", project.target)
                form.append("describe", project.describe)
                form.append("income_amount", project.income_amount)
                form.append("spending_amount", project.spending_amount)
                if (project.start_date != "" && project.end_date != "")
                {
                    if (project.start_date >= project.end_date == true)
                    {
                        setErr("Wrong date!") 
                    }                
                    else
                    {
                        form.append("start_date", project.start_date)
                        form.append("end_date", project.end_date)
                        if (err == null)
                        {
                            let res = await authAPI().post(endpoints['new_project'], form)
                            if (res.status === 201)
                                nav("/projects/")
                            else
                                setErr(res.status)
                        }
                    }
                }
            } catch (ex) {
                console.log(ex)
                setErr(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setProject(current => ({...current, [name]:value}))
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

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW PROJECT</h1>
            {alert}
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                            <TextField id="content" type="text" style={{ width: '70%', marginRight: '2%' }} label="Name of project..." name="name_project" value={project.name_project} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                            <TextField id="id" type="number" rows={4} style={{ width: '20%' }} label="Target of project..." name="target" value={project.target} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} label="Describe about of project..." name="describe" value={project.describe} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                            <TextField id="id" type="date" rows={4} style={{ width: '100%', marginRight: '2%' }} name="start_date" value={project.start_date} onChange={setValue}/>

                            <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                            <TextField id="id" type="date" rows={4} style={{ width: '100%' }} name="end_date" value={project.end_date} onChange={setValue}/>
                        </div>
                        <br />
                        <div align='center'>
                            <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}><strong>Create</strong></Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
        </>
    )
}

export default NewProject
