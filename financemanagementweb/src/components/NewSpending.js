import { useContext, useEffect, useState } from "react";
import { Container, FormGroup, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { authAPI, endpoints } from "../configs/API"
import { useNavigate } from "react-router-dom/dist";
import { UseContext } from "../configs/UseContext";
import Alert from '@mui/material/Alert';


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
    const[err, setErr] = useState(null)
    
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
                // console.log(form)
                let res = await authAPI().post(endpoints['new_spending'], form)
                if (res.status === 201)
                    nav("/spendings/")
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
        setSpending(current => ({...current, [name]:value}))
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
            </>
        )
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW SPENDING</h1>
            {alert}
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                            <TextField id="content" type="text" style={{ width: '70%', marginRight: '2%' }} label="Content of spending..." name="content" value={spending.content} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                            <TextField id="id" type="number" label="Spending amount..." name="spending_amount" value={spending.spending_amount} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="id" type="text" multiline fullWidth rows={4} label="Description of spending..." name="describe" value={spending.describe} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                            <TextField id="id" type="text" style={{ marginRight: '2%' }} label="Spending belong to..." name="group" value={spending.group} onChange={setValue}/>
                        
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                            <TextField id="id" type="text" label="Spending belong to..." name="project" value={spending.project} onChange={setValue}/>
                        </div>
                        <br />
                        <div align='center'>
                            <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}><strong>Create</strong></Button>
                        </div>
                    </form>
                </FormGroup>
            </Container>
            <br />
        </>
    )
}

export default NewSpending
