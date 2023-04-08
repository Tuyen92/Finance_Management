import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { useParams, Link } from "react-router-dom"
import { Container, Input } from "@mui/material"
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';

const GroupDetail = () => {
    const[group, setGroup] = useState([])
    const {groupId} = useParams()

    useEffect(() => {
        const loadGroup = async () => {
            let res = await API.get(endpoints['group'](groupId))
            console.log(res.data)
            setGroup(res.data)
        }

        loadGroup()
    }, [groupId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>GROUP&nbsp;-&nbsp;{group.name}</h1>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Group information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={group.id} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="name_group" type="text" value={group.name} style={{ width: '100%' }} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Number of members: </h4>
                    <Input id="number" type="number" value={group.number} style={{ width: '10%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Status: </h4>
                    <span></span>
                    {group.is_active === true?
                        <Checkbox checked={true} style={{ color: "#F1C338", marginRight: '2%' }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338", marginRight: '2%' }} />
                    }

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Leader ID: </h4>
                    <Input id="leader" type="text" value={group.leader_id} style={{ marginRight: '2%' }} />
                </div>
            </Container>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Members information: </h3>
            </div>
            <Container>
                <h1>members</h1>
            </Container>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>Project information: </h3>
            </div>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="name_project" type="text" value={group.project?.name_project} style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Target: </h4>
                    <Input id="name_project" type="text" value={group.project?.target} style={{ width: '50%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                </div>

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Income: </h4>
                    <Input id="name_project" type="text" value={group.project?.income_amount} style={{ width: '50%', marginRight: '2%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Spending: </h4>
                    <Input id="name_project" type="text" value={group.project?.spending_amount} style={{ width: '50%' }} startAdornment={<InputAdornment position="start">VND</InputAdornment>} />
                </div>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Start date: </h4>
                    <Input id="name_project" type="text" value={group.project?.start_date} style={{ marginRight: '2%' }} />
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>End date: </h4>
                    <Input id="name_project" type="text" value={group.project?.end_date} />
                </div>
                <br />
                <div align="center">
                   <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Project detail</strong></Button></Link> 
                </div>
            </Container>
            <div style={{ backgroundColor: "#F46841" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }} />
            </div>
            <div align="right">
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Delete</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>Update</strong></Button></Link>
                <Link style={{ textDecoration: 'none' }}><Button style={{ color: '#F1C338' }}><strong>End group</strong></Button></Link>
            </div>
        </>
    )
}

export default GroupDetail
