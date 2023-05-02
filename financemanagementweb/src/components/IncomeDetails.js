import { useContext, useEffect, useState } from "react"
import API, { authAPI, endpoints } from "../configs/API"
import { Container, Input, TextField } from "@mui/material"
import { useParams, Link } from "react-router-dom"
import Numeral from 'numeral';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { UseContext } from "../configs/UseContext";
import Loading from "../layouts/Loading";


const IncomeDetail = () => {
    const[user, dispatch] = useContext(UseContext)
    const[income, setIncome] = useState(null)
    const {incomeId} = useParams()
    const[isConfirm, setConfirm] = useState("")

    useEffect(() => {
        const loadIncome = async () => {
            let res = await authAPI().get(endpoints['income'](incomeId))
            res.data.income_amount = Numeral(res.data.income_amount).format('0,0')
            res.data.implementation_date = format(new Date(res.data.implementation_date), 'dd/MM/yyyy HH:mm:ss')
            // console.log(res.data)
            setIncome(res.data)
        }

        loadIncome()
    }, [incomeId, isConfirm])

    const confirm = async () => {
        let eConfirm = `${endpoints['income'](incomeId)}/confirm/`
        let resConfirm = await authAPI().put(eConfirm)
        setConfirm(1)
    }

    if (income == null)
    {return(
    <>
        <h1 style={{ textAlign: "center", color: "#F1C338" }}>INCOME</h1>
        <Loading />
    </>
    )}

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>INCOME&nbsp;-&nbsp;{income.id}. {income.content}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Income information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={income.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <TextField id="content" type="text" value={income.content} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                    <TextField id="describe" type="text" value={income.describe} multiline fullWidth rows={4} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                    <FormControl style={{ marginRight: '2%' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
                        <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            value={income.income_amount} label="Income"/>
                    </FormControl>

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Implementation date: </h4>
                    <TextField id="content" type="text" value={income.implementation_date} style={{ marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Confirm: </h4>
                    <span></span>
                    {income.is_confirm === true?
                    <>
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />
                    </>:
                    <>
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                        {user.is_supperuser === true || user.is_staff === true?
                        <Button variant="contained" onClick={confirm} style={{ backgroundColor: "#609b56", color: '#FFECC9', height: '10%', marginTop: '1%' }}>Confirm</Button>:
                        <span />}
                    </>
                    }
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>User information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={income.user?.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <TextField id="content" type="text" value={income.user?.first_name + " " + income.id_user?.last_name} style={{ width: '30%', marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                    <TextField id="content" type="text" value={income.user?.phone} style={{ width: '20%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/user/${income.user?.id}/`}><Button style={{ width: '100%', color: '#F46841' }}><strong>User detail</strong></Button></Link>
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Goup & project information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                    <TextField id="id" type="text" value={income.group_id} style={{ marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%', marginRight: '10%' }} to={`/groups/${income.id_user?.id}/`}><Button style={{ width: '100%', color: '#F46841' }}><strong>Group detail</strong></Button></Link>
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                    <TextField id="content" type="text" value={income.project_id} style={{ marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${income.id_user?.id}/`}><Button style={{ color: '#F46841' }}><strong>Project detail</strong></Button></Link>
                </div>
                <br />
            </Container>
        </>
    )
}

export default IncomeDetail