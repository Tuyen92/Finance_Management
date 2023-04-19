import Button from '@mui/material/Button';
import { Container, FormGroup, Input } from "@mui/material";
import { useContext, useState } from "react";
import { UseContext } from "../configs/UseContext";
import { useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";

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

    const create = (evt) => {
        evt.PreventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("name_project", project.name_project)
                form.append("target", project.target)
                form.append("describe", project.describe)
                form.append("income_amount", project.income_amount)
                form.append("spending_amount", project.spending_amount)
                form.append("start_date", project.start_date)
                form.append("end_date", project.end_date)

                let res = await authAPI().post(endpoints['new_project'], form)
                if (res.status === 201)
                    nav("/projects/")
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setProject(current => ({...current, [name]:value}))
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW PROJECT</h1>
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                            <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} name="name_project" value={project.name_project} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                            <Input id="id" type="text" rows={4} style={{ width: '20%' }} name="target" value={project.target} onChange={setValue}/>
                        </div>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                        <Input id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} name="describe" value={project.describe} onChange={setValue}/>

                        <div style={{ display: 'flex' }}>
                            <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                            <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} name="start_date" value={project.start_date} onChange={setValue}/>

                            <h4 style={{ width: '20%', color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                            <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} name="end_date" value={project.end_date} onChange={setValue}/>
                        </div>
                        
                        <br />
                        <div align='center'>
                            <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}>Create</Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
        </>
    )
}

export default NewProject
