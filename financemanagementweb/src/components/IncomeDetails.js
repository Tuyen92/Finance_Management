import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Container, Input } from "@mui/material"
import { useParams, Link } from "react-router-dom"
import Numeral from 'numeral';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


const IncomeDetail = () => {
    const[income, setIncome] = useState([])
    const {incomeId} = useParams()

    useEffect(() => {
        const loadIncome = async () => {
            let res = await API.get(endpoints['income'](incomeId))
            res.data.income_amount = Numeral(res.data.income_amount).format('0,0')
            res.data.implementation_date = format(new Date(res.data.implementation_date), 'dd/MM/yyyy HH:mm:ss')
            // console.log(res.data)
            setIncome(res.data)
        }

        loadIncome()
    }, [incomeId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>INCOME&nbsp;-&nbsp;{income.id}. {income.content}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Income information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={income.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <Input id="content" type="text" value={income.content} style={{ width: '100%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                <Input id="describe" type="text" value={income.describe} multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                    <Input id="income_amount" type="text" value={income.income_amount} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Implementation date: </h4>
                    <Input id="content" type="text" value={income.implementation_date} style={{ width: '30%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Accept: </h4>
                    <span></span>
                    {income.is_accept === true?
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                    }
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>User information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={income.user?.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="content" type="text" value={income.user?.first_name + " " + income.id_user?.last_name} style={{ width: '30%', marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                    <Input id="content" type="text" value={income.user?.phone} style={{ width: '20%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${income.user?.id}/`}><Button style={{ width: '100%', color: '#F1C338' }}><strong>User detail</strong></Button></Link>
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Goup & project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                    <Input id="id" type="text" value={income.group_id} style={{ width: '5%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%', marginRight: '20%' }} to={`/groups/${income.id_user?.id}/`}><Button style={{ width: '100%', color: '#F1C338' }}><strong>Group detail</strong></Button></Link>
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                    <Input id="content" type="text" value={income.project_id} style={{ width: '5%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${income.id_user?.id}/`}><Button style={{ width: '100%', color: '#F1C338', marginRight: '2%' }}><strong>Project detail</strong></Button></Link>
                </div>
                <br />
            </Container>
        </>
    )
}

export default IncomeDetail