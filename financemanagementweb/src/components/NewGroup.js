import { Container, FormGroup, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UseContext } from "../configs/UseContext";
import { useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const NewGroup = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[group, setGroup] = useState({
        "name": "",
        "leader_id": "",
        "project": "",
        "users": []
    })
    const[err, setErr] = useState(null)

    const create = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData
                form.append("name", group.name)
                form.append("leader_id", parseInt(group.leader_id))
                form.append("project", parseInt(group.project))
                form.append("users", group.users)
                console.log(form)
                let res = await authAPI().post(endpoints['new_group'], form)
                if (res.status === 201)
                    nav("/groups/")
                else
                    setErr(res.status)
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    useEffect(() => {}, [err])

    const setValue = e => {
        const { name, value } = e.target
        setGroup(current => ({...current, [name]:value}))
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
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW GROUP</h1>
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
                            <TextField id="content" type="text" label="Name of group..." style={{ width: '60%', marginRight: '2%' }} name="name" value={group.name} onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Leader ID: </h4>
                            <TextField id="id" type="text" label="Leader's ID of group..." name="leader_id" value={group.leader_id} onChange={setValue} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Members: </h4>
                            <TextField id="id" type="text" label="ID of member..." style={{ width: '100%', marginRight: '2%' }} name="users" value={group.users} onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                            <TextField id="id" type="text" label="Project's ID of group..." style={{ width: '100%' }} name="project" value={group.project} onChange={setValue} />
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

export default NewGroup