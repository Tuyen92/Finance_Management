import { useEffect, useState } from "react"
import API, { authAPI, endpoints } from "../configs/API"
import { Container, Input } from "@mui/material"

const CurrentUser = () => {
    const[currentUser, setCurrentUser] = useState("")
    
    useEffect(() => {
        const loadCurrentUser = async () => {
            let res = await authAPI().get(endpoints['current_user'])
            console.log(res)
            setCurrentUser(res.data)
        }
        loadCurrentUser()
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#F1C338" }}>USER INFORMATION</h1>
            <Container>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>ID: </h4>
                    <Input id="id" type="text" value={currentUser.id} style={{ width: '20%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Name: </h4>
                    <Input id="name_group" type="text" value={currentUser.first_name + " " + currentUser.last_name}  style={{ width: '100%', marginRight: '2%' }} />
                
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Sex: </h4>
                    <Input id="id" type="text" value={currentUser.sex} style={{ width: '15%' }} />
                </div>

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Birthday: </h4>
                    <Input id="id" type="text" value={currentUser.birthday} style={{ width: '30%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Address: </h4>
                    <Input id="name_group" type="text" value={currentUser.address} style={{ width: '100%' }} />
                </div>

                <div style={{ display: 'flex' }}>
                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Email: </h4>
                    <Input id="id" type="text" value={currentUser.email} style={{ width: '30%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", marginRight: '2%' }}>Phone: </h4>
                    <Input id="name_group" type="text" value={currentUser.phone} style={{ width: '30%', marginRight: '2%' }} />

                    <h4 style={{ color: "#F1C338", width: '20%', marginRight: '2%' }}>Limit Rule: </h4>
                    <Input id="name_group" type="text" value={currentUser.limit_rule} style={{ width: '30%', marginRight: '2%' }} />
                </div>
            </Container>
        </>
    )
}

export default CurrentUser
