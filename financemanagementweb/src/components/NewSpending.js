import { useContext, useState } from "react";
import { Container, FormGroup, Input } from "@mui/material";
import Button from '@mui/material/Button';
import { authAPI, endpoints } from "../configs/API"
import { useNavigate } from "react-router-dom/dist";
import { UseContext } from "../configs/UseContext";


const NewSpending = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[spending, setSpending] = useState({
        "content": "",
        "spending_amount": "",
        "describe": "",
        "user": "",
        "group": "",
        "project": ""
    })
    
    const create = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("content", spending.content)
                form.append("spending_amount", spending.spending_amount)
                form.append("describe", spending.describe)
                form.append("user", user.id)
                form.append("group", spending.group)
                form.append("project", spending.project)
                console.log(form)
                let res = await authAPI().post(endpoints['new_spending'], form)
                if (res.status === 201)
                    nav("/spendings/")
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setSpending(current => ({...current, [name]:value}))
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW SPENDING</h1>
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                            <Input id="content" type="text" style={{ width: '70%', marginRight: '2%' }} name="content" value={spending.content} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                            <Input id="id" type="text" style={{ width: '10%', marginRight: '2%' }} name="spending_amount" value={spending.spending_amount} onChange={setValue}/>
                        </div>

                        <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                        <Input id="id" type="text" multiline fullWidth rows={4} style={{ width: '100%' }} name="describe" value={spending.describe} onChange={setValue}/>

                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                            <Input id="id" type="text" style={{ width: '5%', marginRight: '2%' }} name="group" value={spending.group} onChange={setValue}/>
                        
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                            <Input id="content" type="text" style={{ width: '5%', marginRight: '2%' }} name="project" value={spending.project} onChange={setValue}/>
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

export default NewSpending