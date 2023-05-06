import { useContext, useEffect, useState } from "react";
import { UseContext } from "../configs/UseContext";
import { useNavigate } from "react-router-dom";
import { Container, FormGroup, Input, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { authAPI, endpoints } from "../configs/API";
import Alert from '@mui/material/Alert';


const NewLimitRule = () => {
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[limitRule, setLimitRule] = useState({
        "spending_limit": "",
        "income_limit": "",
        "from_date": "",
        "to_date": "",
        "type": ""
    })
    const[err, setErr] = useState(null)

    useEffect(() => {}, [err])

    const create = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("spending_limit", limitRule.spending_limit)
                form.append("income_limit", limitRule.income_limit)
                form.append("type", limitRule.type )
                form.append("from_date", limitRule.from_date)
                form.append("to_date", limitRule.to_date)
                // console.log(form)
                let res = await authAPI().post(endpoints['new_limit_rule'], form)
                if (res.status === 201)
                {
                    setErr(null)
                    nav("/limit_rules/")
                }
                else
                    setErr(res.status)
            } catch (ex) {
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setLimitRule(current => ({...current, [name]:value}))
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
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>NEW LIMIT RULE</h1>
            {alert}
            <div style={{ backgroundColor: '#609b56'}}>
                <br />
            </div>
            <br />
            <Container>
                <FormGroup  style={{ width: '100%' }}>
                    <form onSubmit={create}>
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Type: </h4>
                            <TextField id="content" type="text" style={{ width: '100%', marginRight: '2%' }} name="type" value={limitRule.type} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                            <TextField id="content" type="number" style={{ width: '50%', marginRight: '2%' }} name="spending_limit" value={limitRule.spending_limit} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                            <TextField id="id" type="number" style={{ width: '50%', marginRight: '2%' }} name="income_limit" value={limitRule.income_limit} onChange={setValue}/>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>From date: </h4>
                            <TextField id="content" type="date" style={{ marginRight: '2%' }} name="spending_limit" value={limitRule.spending_limit} onChange={setValue}/>

                            <h4 style={{ color: "#F1C338", marginRight: '2%' }}>To date: </h4>
                            <TextField id="id" type="date" style={{ marginRight: '2%' }} name="income_limit" value={limitRule.income_limit} onChange={setValue}/>
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

export default NewLimitRule