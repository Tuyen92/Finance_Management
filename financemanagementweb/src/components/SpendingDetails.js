import { useContext, useEffect, useState } from "react"
import API, { authAPI, endpoints } from "../configs/API"
import { Container, Input } from "@mui/material"
import { useParams, Link, useNavigate } from "react-router-dom"
import Numeral from 'numeral';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { UseContext } from "../configs/UseContext";

const SpendingDetail = () => {
    const[spending, setSpending] = useState([])
    const {spendingId} = useParams()
    const[user, dispatch] = useContext(UseContext)
    const nav = useNavigate()
    const[idAccept, setAccept] = useState("")

    useEffect(() => {
        const loadSpending = async () => {
            // let e = `${endpoints['spendings'](spendingId)}`
            // let res = await authAPI().get(e)

            let res = await authAPI().get(endpoints['spending'](spendingId))
            res.data.spending_amount = Numeral(res.data.spending_amount).format('0,0')
            res.data.implementation_date = format(new Date(res.data.implementation_date), 'dd/MM/yyyy HH:mm:ss')
            // console.log(res.data)
            setSpending(res.data)

            if (idAccept !== null)
            {
                let eAccept = `${endpoints['spending'](spendingId)}/accept/`
                let resAccept = await authAPI().put(eAccept)
            }
        }

        loadSpending()
    }, [spendingId])

    const accept1 = async () => {
        setAccept(spending.id)
    }

    const accept = async () => {
        let eAccept = `${endpoints['spending'](spendingId)}/accept/`
        let resAccept = await authAPI().put(eAccept)
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>SPENDING&nbsp;-&nbsp;{spending.id}. {spending.content}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Spending information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={spending.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Content: </h4>
                    <Input id="content" type="text" value={spending.content} style={{ width: '100%' }} />
                </div>

                <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Describe: </h4>
                <Input id="id" type="text" value={spending.describe} multiline fullWidth rows={4} style={{ width: '100%' }} />

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                    <Input id="id" type="text" value={spending.spending_amount} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Implementation date: </h4>
                    <Input id="content" type="text" value={spending.implementation_date} style={{ width: '30%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '1%' }}>Accept: </h4>
                    <span></span>
                    {spending.is_accept === true?
                        <>
                            <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '1%' }} />
                        </>:
                        <>
                            <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '1%' }} />
                            {user.is_supperuser === true || user.is_staff === true?
                            <Button variant="contained" onClick={accept} style={{ backgroundColor: "#609b56", color: '#FFECC9', height: '10%', marginTop: '1%' }}>Accept</Button>:
                            <span />}
                        </>
                    }
                </div>
                <br />
                <div align='center'>
                    
                </div>
            </Container>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>User information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={spending.user?.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="content" type="text" value={spending.user?.first_name + " " + spending.id_user?.last_name} style={{ width: '30%', marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                    <Input id="content" type="text" value={spending.user?.phone} style={{ width: '20%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${spending.user?.id}/`}><Button style={{ width: '100%', color: '#F1C338' }}><strong>User detail</strong></Button></Link>
                </div>
            </Container>
            <br />
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Goup & project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Group: </h4>
                    <Input id="id" type="text" value={spending.group_id} style={{ width: '5%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%', marginRight: '20%' }} to={`/groups/${spending.id_user?.id}/`}><Button style={{ width: '100%', color: '#F1C338' }}><strong>Group detail</strong></Button></Link>
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Project: </h4>
                    <Input id="content" type="text" value={spending.project_id} style={{ width: '5%', marginRight: '2%' }} />

                    <Link style={{ textDecoration: 'none', marginTop: '1%' }} to={`/projects/${spending.id_user?.id}/`}><Button style={{ width: '100%', color: '#F1C338', marginRight: '2%' }}><strong>Project detail</strong></Button></Link>
                </div>
                <br />
            </Container>
        </>
    )
}

export default SpendingDetail
