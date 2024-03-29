import { Container, FormGroup, Input, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UseContext } from "../configs/UseContext";
import { useNavigate } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const NewIncome = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[income, setIncome] = useState({
        "content": "",
        "income_amount": "",
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
                form.append("content", income.content)
                form.append("income_amount", income.income_amount)
                form.append("describe", income.describe)
                form.append("user", user.id)
                form.append("group_id", parseInt(income.group))
                form.append("project_id", parseInt(income.project))
                console.log(form)
                let res = await authAPI().post(endpoints['new_income'], form)
                if (res.status === 201)
                    nav("/incomes/")
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
        setIncome(current => ({...current, [name]:value}))
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
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW INCOME</h1>
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
                            <TextField id="content" type="text" style={{ width: '70%', marginRight: '2%' }} label="Content of income..." name="content" value={income.content} onChange={setValue} />

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                            <TextField id="id" type="number" label="Income amount..." name="income_amount" value={income.income_amount} onChange={setValue} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                            <TextField id="id" type="text" multiline fullWidth rows={4} label="Description of income..." name="describe" value={income.describe} onChange={setValue} />
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                            <TextField id="id" type="text" style={{ marginRight: '2%' }} label="Income belong to..." name="group" value={income.group} onChange={setValue} />
                        
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                            <TextField id="id" type="text" label="Income belong to..." name="project" value={income.project} onChange={setValue} />
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

export default NewIncome
