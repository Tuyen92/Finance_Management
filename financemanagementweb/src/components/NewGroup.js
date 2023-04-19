import { Container, FormGroup, Input } from "@mui/material"
import { useContext, useState } from "react"
import { UseContext } from "../configs/UseContext"
import { useNavigate } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import Button from '@mui/material/Button';

const NewGroup = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[group, setGroup] = useState({
        "name": "",
        "leader_id": "",
        "project": "",
        "members": ""
    })

    const create = (evt) => {
        evt.PreventDefault()

        const process = async () => {
            try {
                let form = new FormData
                form.append("name", group.name)
                form.append("leader_id", group.leader_id)
                form.append("project", group.project)
                console.log(form)
                let res = await authAPI().post(endpoints['new_group'], form)
                if (res.status === 201)
                    nav("/groups/")
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setGroup(current => ({...current, [name]:value}))
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW GROUP</h1>
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                            <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} name="name" value={group.name} onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Leader ID: </h4>
                            <Input id="id" type="text" style={{ width: '10%', marginRight: '2%' }} name="leader_id" value={group.leader_id} onChange={setValue} />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Members: </h4>
                            <Input id="id" type="text" rows={4} style={{ width: '100%', marginRight: '2%' }} name="members" value={group.members} onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                            <Input id="id" type="text" rows={4} style={{ width: '100%' }} name="project" value={group.project} onChange={setValue} />
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

export default NewGroup