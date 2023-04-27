import { useContext, useEffect, useState } from "react"
import { UseContext } from "../configs/UseContext"
import { useParams } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import { Container, TextField } from "@mui/material"
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const UserDetail = () => {
    const[currentUser, setCurrentUser] = useContext(UseContext)
    const[user, setUser] = useState("")
    const {userId} = useParams()

    useEffect(() => {
        const loadUser = async () => {
            let res = await authAPI().get(endpoints['user'](userId))
            res.data.birthday = format(new Date(res.data.birthday), 'dd/MM/yyyy')
            // console.log(res.data)
            setUser(res.data)
        }
        loadUser()
    }, [userId])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>USER&nbsp;-&nbsp;{user.id}.&nbsp;{user.last_name}&nbsp;{user.first_name}</h1>
            <div style={{ backgroundColor: "#609b56" }}>
                <h3 style={{ color: "#FFECC9", marginLeft: "20px"  }}>User information: </h3>
            </div>
            <br />
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <TextField id="id" type="text" value={user.id} style={{ width: '5%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Full name: </h4>
                    <TextField id="id" type="text" value={user.last_name + " " + user.first_name} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Sex: </h4>
                    <TextField id="id" type="text" value={user.sex} style={{ marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Birthday: </h4>
                    <TextField id="id" type="text" value={user.birthday} style={{ marginRight: '2%' }} />
                    
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Role: </h4>
                    {user.is_superuser === true?
                    <TextField id="id" type="text" value="Superuser" style={{ marginRight: '2%' }} />:
                    user.is_staff === false?
                        <TextField id="id" type="text" value="User" style={{ marginRight: '2%' }} />:
                    <TextField id="id" type="text" value="Leader" style={{ marginRight: '2%' }} />}
                    
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Active: </h4>
                    <span></span>
                    {user.is_active === true?
                        <Checkbox checked={true} style={{ color: "#F1C338" }} />:
                        <Checkbox checked={false} style={{ color: "#F1C338" }} />
                    }
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Address: </h4>
                    <TextField id="id" type="text" value={user.address} style={{ width: '50%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                    <TextField id="id" type="text" value={user.phone} style={{ marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Email: </h4>
                    <TextField id="id" type="text" value={user.email} style={{ marginRight: '2%' }} />
                </div>
                <br />
                <div align='center'>
                    {currentUser.is_superuser === true?
                        user.is_active === true?
                        <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}>Inactivate</Button>:
                        <Button variant="contained" type="submit" style={{ backgroundColor: "#609b56", color: '#FFECC9' }}>Active</Button>:
                        <span />
                    }
                </div>
            </Container>
        </>
    )
}

export default UserDetail